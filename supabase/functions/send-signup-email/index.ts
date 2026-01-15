// Supabase Edge Function for sending form submission emails
// Deploy with: supabase functions deploy send-form-email

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'BoostMySites <noreply@boostmysites.com>'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface FormSubmission {
  id: string
  full_name: string
  phone_number: string
  email: string
  transaction_amount: number
  transaction_id: string
  aadhaar_file_path: string
  signature_file_path: string
  agree_terms: boolean
  created_at: string
}

serve(async (req) => {
  try {
    const { record } = await req.json() as { record: FormSubmission }
    
    if (!record) {
      return new Response(
        JSON.stringify({ error: 'No record provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Download signature file from Supabase storage
    const { data: signatureData, error: signatureError } = await supabase.storage
      .from('signatures')
      .download(record.signature_file_path)

    if (signatureError) {
      console.error('Error downloading signature:', signatureError)
      throw new Error('Failed to retrieve signature')
    }

    // Convert signature to base64
    const signatureArrayBuffer = await signatureData.arrayBuffer()
    const signatureBase64 = btoa(
      new Uint8Array(signatureArrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )
    const signatureMimeType = signatureData.type || 'image/png'

    // Create email HTML template
    const emailHtml = createEmailTemplate(record, signatureBase64, signatureMimeType)
    const chairmanEmailHtml = createChairmanEmailTemplate(record, signatureBase64, signatureMimeType)

    // Send email to user
    const userEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: record.email,
        subject: 'Form Submission Confirmation - Your Signed Application',
        html: emailHtml,
      }),
    })

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text()
      console.error('Failed to send user email:', error)
      throw new Error('Failed to send user email')
    }

    // Send email to chairman
    const chairmanEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: 'boostmysitescom@gmail.com',
        subject: `New Form Submission - ${record.full_name} (${record.transaction_id})`,
        html: chairmanEmailHtml,
      }),
    })

    if (!chairmanEmailResponse.ok) {
      const error = await chairmanEmailResponse.text()
      console.error('Failed to send chairman email:', error)
      throw new Error('Failed to send chairman email')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully',
        submissionId: record.id 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send emails', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

function createEmailTemplate(record: FormSubmission, signatureBase64: string, signatureMimeType: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup Confirmation - BoostMySites</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #5B7FA6 0%, #2D4263 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="https://www.boostmysites.com/logo.png" alt="BoostMySites" style="width: 100px; height: auto; margin-bottom: 10px;" />
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">SaaS Development & Consulting Services</p>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Form Submission Confirmation</h2>
          
          <p style="color: #475569; margin-bottom: 20px;">
            Dear ${record.full_name},
          </p>
          
          <p style="color: #475569; margin-bottom: 20px;">
            Thank you for submitting your application form for our SaaS Development & Consulting Services. This email confirms that we have received your signed application.
          </p>
          
          <div style="background: #f8fafc; border-left: 4px solid #14b8a6; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #0f172a; margin-top: 0; font-size: 18px; margin-bottom: 15px;">Your Submission Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 40%;">Full Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.phone_number}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Transaction Amount:</td>
                <td style="padding: 8px 0; color: #0f172a;">₹${record.transaction_amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Transaction ID:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.transaction_id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submission ID:</td>
                <td style="padding: 8px 0; color: #0f172a; font-family: monospace; font-size: 12px;">${record.id}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 25px 0; border-radius: 4px;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>📋 Terms & Conditions:</strong> By submitting this form, you have agreed to our Terms and Conditions, Master Services Agreement, and Non-Disclosure Agreement. Please keep this email for your records.
            </p>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <p style="color: #64748b; margin: 0 0 15px 0; font-size: 14px; font-weight: 600;">Your Digital Signature:</p>
            <img src="data:${signatureMimeType};base64,${signatureBase64}" alt="Digital Signature" style="max-width: 300px; max-height: 150px; border: 2px solid #e2e8f0; border-radius: 8px; padding: 10px; background: white;" />
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
              Our team will review your application and contact you shortly. If you have any questions, please don't hesitate to reach out to us.
            </p>
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong style="color: #0f172a;">BoostMySites Team</strong>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">This is an automated email. Please do not reply to this message.</p>
          <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} BoostMySites. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
}

function createChairmanEmailTemplate(record: FormSubmission, signatureBase64: string, signatureMimeType: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Signup Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #5B7FA6 0%, #2D4263 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="https://i.ibb.co/YPK5gLQ/boostmysites-logo.png" alt="BoostMySites" style="width: 100px; height: auto; margin-bottom: 10px;" />
          <h1 style="color: white; margin: 10px 0 0 0; font-size: 24px;">New Form Submission</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Submission Details</h2>
          
          <div style="background: #f8fafc; border-left: 4px solid #14b8a6; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 40%;">Full Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.phone_number}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Transaction Amount:</td>
                <td style="padding: 8px 0; color: #0f172a;">₹${record.transaction_amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Transaction ID:</td>
                <td style="padding: 8px 0; color: #0f172a;">${record.transaction_id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submission ID:</td>
                <td style="padding: 8px 0; color: #0f172a; font-family: monospace; font-size: 12px;">${record.id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submitted At:</td>
                <td style="padding: 8px 0; color: #0f172a;">${new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <p style="color: #64748b; margin: 0 0 15px 0; font-size: 14px; font-weight: 600;">Digital Signature:</p>
            <img src="data:${signatureMimeType};base64,${signatureBase64}" alt="Digital Signature" style="max-width: 300px; max-height: 150px; border: 2px solid #e2e8f0; border-radius: 8px; padding: 10px; background: white;" />
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            Please review this submission in the Supabase dashboard.
          </p>
        </div>
      </body>
    </html>
  `
}
