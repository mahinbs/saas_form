import { useState, useRef } from 'react';
import FormHeader from './FormHeader';
import UserDetailsSection from './UserDetailsSection';
import AgreementsSection from './AgreementsSection';
import SignatureSection from './SignatureSection';
import SecurityIndicators from './SecurityIndicators';
import { supabase } from '@/lib/supabase';

interface SignUpFormProps {
  onSuccess: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    transactionAmount: '',
    transactionId: '',
    aadhaarFile: null as File | null,
    signatureFile: null as File | null,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        return value.trim().length < 2 ? 'Full name must be at least 2 characters' : '';
      case 'phoneNumber':
        return !/^\+?[\d\s-]{10,}$/.test(value) ? 'Please enter a valid phone number' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'transactionAmount':
        return !value || parseFloat(value) <= 0 ? 'Please enter a valid amount' : '';
      case 'transactionId':
        return value.trim().length < 5 ? 'Transaction ID must be at least 5 characters' : '';
      case 'aadhaarFile':
        return !value ? 'Please upload your Aadhaar document' : '';
      case 'signatureFile':
        return !value ? 'Please upload your signature' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = (): boolean => {
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'transactionAmount', 'transactionId'];
    const hasAllFields = requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value && validateField(field, value) === '';
    });

    return (
      hasAllFields &&
      formData.aadhaarFile !== null &&
      formData.signatureFile !== null &&
      formData.agreeTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'agreeTerms') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique file names
      const timestamp = Date.now();
      const aadhaarFileName = `${timestamp}_${formData.aadhaarFile!.name}`;
      const signatureFileName = `${timestamp}_${formData.signatureFile!.name}`;

      // Upload Aadhaar document to Supabase storage
      const { data: aadhaarData, error: aadhaarError } = await supabase.storage
        .from('aadhaar-documents')
        .upload(aadhaarFileName, formData.aadhaarFile!, {
          cacheControl: '3600',
          upsert: false
        });

      if (aadhaarError) {
        throw new Error(`Failed to upload Aadhaar document: ${aadhaarError.message}`);
      }

      // Upload signature to Supabase storage
      const { data: signatureData, error: signatureError } = await supabase.storage
        .from('signatures')
        .upload(signatureFileName, formData.signatureFile!, {
          cacheControl: '3600',
          upsert: false
        });

      if (signatureError) {
        // If signature upload fails, try to clean up the aadhaar file
        if (aadhaarData?.path) {
          await supabase.storage.from('aadhaar-documents').remove([aadhaarData.path]);
        }
        throw new Error(`Failed to upload signature: ${signatureError.message}`);
      }

      // Save form data to database
      // Note: Emails will be sent automatically via Supabase database trigger
      const { error: dbError } = await supabase
        .from('form_submissions')
        .insert({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          transaction_amount: parseFloat(formData.transactionAmount),
          transaction_id: formData.transactionId,
          aadhaar_file_path: aadhaarData.path,
          signature_file_path: signatureData.path,
          agree_terms: formData.agreeTerms,
        });

      if (dbError) {
        // If database insert fails, clean up uploaded files
        if (aadhaarData?.path) {
          await supabase.storage.from('aadhaar-documents').remove([aadhaarData.path]);
        }
        if (signatureData?.path) {
          await supabase.storage.from('signatures').remove([signatureData.path]);
        }
        throw new Error(`Failed to save submission: ${dbError.message}`);
      }

      // Success - reset form
      onSuccess();
      if (formRef.current) {
        formRef.current.reset();
      }
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        transactionAmount: '',
        transactionId: '',
        aadhaarFile: null,
        signatureFile: null,
        agreeTerms: false,
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FormHeader />
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          data-readdy-form
          id="saas-signup-form"
        >
          <div className="p-8 sm:p-12">
            <UserDetailsSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />

            <div className="mt-12 pt-12 border-t border-slate-200">
              <AgreementsSection
                formData={formData}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-12 pt-12 border-t border-slate-200">
              <SignatureSection
                signatureFile={formData.signatureFile}
                error={errors.signatureFile}
                onChange={(file) => handleInputChange('signatureFile', file)}
                onBlur={() => handleBlur('signatureFile')}
              />
            </div>

            <div className="mt-12">
              <SecurityIndicators />
            </div>

            {submitError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex gap-3">
                  <i className="ri-error-warning-line text-red-600 text-xl flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="text-sm font-semibold text-red-900 mb-1">Submission Error</p>
                    <p className="text-xs text-red-800">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 whitespace-nowrap ${
                  isFormValid() && !isSubmitting
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <i className="ri-loader-4-line animate-spin text-xl"></i>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-send-plane-fill text-lg"></i>
                    Sign and submit
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
