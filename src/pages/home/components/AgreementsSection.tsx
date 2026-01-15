import { useState } from 'react';
import AgreementModal from './AgreementModal';

interface AgreementsSectionProps {
  formData: {
    agreeTerms: boolean;
  };
  onChange: (name: string, value: boolean) => void;
}

export default function AgreementsSection({ formData, onChange }: AgreementsSectionProps) {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const termsContent = `
    <div style="line-height: 1.8;">
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #0f172a;">1. TERMS AND CONDITIONS / MASTER SERVICES AGREEMENT</h2>
      <p style="margin-bottom: 1rem;"><strong>(SaaS Product Development & Consulting Services)</strong></p>
      <p style="margin-bottom: 1.5rem;">This Agreement ("Agreement") is entered into by and between [Your Company Name], a SaaS services provider ("Company", "We", "Us", "Our") and the individual or entity accessing or purchasing the services ("Client", "You", "Your").</p>
      <p style="margin-bottom: 1.5rem;">By signing up, making payment, or using our services, You agree to be legally bound by this Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">1. Scope of Services</h3>
      <p style="margin-bottom: 0.75rem;"><strong>1.1</strong> The Company provides SaaS-focused services including but not limited to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Market validation and feasibility analysis</li>
        <li>Competitive and industry analysis</li>
        <li>Product strategy and roadmap creation</li>
        <li>SaaS product design and development</li>
        <li>Branding, positioning, and messaging</li>
        <li>Go-to-market and launch strategies</li>
        <li>User acquisition and growth strategies</li>
        <li>Retention, engagement, and optimization strategies</li>
        <li>Post-launch consulting and advisory support for up to one (1) year</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>1.2</strong> Services may be delivered through documentation, software deliverables, consulting calls, development sprints, dashboards, reports, or other formats at the Company's discretion.</p>
      <p style="margin-bottom: 0.75rem;"><strong>1.3</strong> The Client expressly acknowledges and agrees that while the Company provides strategic guidance, analysis, development services, and advisory support, the ultimate implementation, execution, and operational decision-making rests solely with the Client.</p>
      <p style="margin-bottom: 0.75rem;">The Company:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Does not act as the Client's management, operator, employee, partner, sponsor, or fiduciary</li>
        <li>Does not provide full-time or dedicated employees to run or operate the Client's business</li>
        <li>Does not control the Client's internal teams, processes, budgets, or execution discipline</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">Any strategies, recommendations, roadmaps, or deliverables provided by the Company must be implemented by the Client or the Client's own team. The Company may, at its discretion, assist with training, guidance, or advisory support for the Client's personnel, however such assistance does not constitute operational responsibility or execution ownership.</p>
      <p style="margin-bottom: 1.5rem;">The Client understands that business results—including but not limited to revenue growth, user acquisition, retention, scalability, or market traction—are dependent on multiple factors outside the Company's control, including:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Quality and speed of implementation by the Client</li>
        <li>Internal team competence and execution</li>
        <li>Allocation of sufficient resources and budget</li>
        <li>Market conditions, competition, and user behavior</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">Accordingly, no metrics, outcomes, or performance indicators are guaranteed. Any projections, estimates, or examples shared by the Company are for informational purposes only and should not be construed as assurances of success.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">2. Engagement Structure & Milestones</h3>
      <p style="margin-bottom: 0.75rem;"><strong>2.1</strong> All projects are executed on a milestone-based model.</p>
      <p style="margin-bottom: 0.75rem;"><strong>2.2</strong> Each milestone:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Has defined deliverables</li>
        <li>Requires full advance payment before commencement</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>2.3</strong> The Company reserves the right to revise timelines, methods, tools, or resources as reasonably required to deliver the services.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">3. Payments & Fees (STRICT)</h3>
      <p style="margin-bottom: 0.75rem;"><strong>3.1</strong> All payments are:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Non-refundable</li>
        <li>Non-cancellable</li>
        <li>Non-transferable</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>3.2</strong> Once a payment is made, it is deemed fully earned, regardless of:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Client dissatisfaction</li>
        <li>Change of business direction</li>
        <li>Market conditions</li>
        <li>Internal Client issues</li>
        <li>Partial or full non-usage of services</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>3.3</strong> No refunds, chargebacks, reversals, or credits will be issued under any circumstances.</p>
      <p style="margin-bottom: 1.5rem;"><strong>3.4</strong> The Client expressly waives all rights to dispute payments with banks, payment processors, or third parties.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">4. Payment Default & Work Suspension</h3>
      <p style="margin-bottom: 0.75rem;"><strong>4.1</strong> If the Client:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Misses</li>
        <li>Delays</li>
        <li>Partially pays</li>
        <li>Disputes</li>
      </ul>
      <p style="margin-bottom: 1rem;">any milestone payment,</p>
      <p style="margin-bottom: 0.75rem;">All work shall immediately stop, without notice.</p>
      <p style="margin-bottom: 0.75rem;"><strong>4.2</strong> The Company:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Is not obligated to resume work</li>
        <li>Is not liable for delays, losses, or damages caused by suspension</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>4.3</strong> Any delay caused by non-payment automatically extends project timelines.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">5. No Cancellation / No Early Termination</h3>
      <p style="margin-bottom: 0.75rem;"><strong>5.1</strong> The Client cannot cancel the project once initiated.</p>
      <p style="margin-bottom: 0.75rem;"><strong>5.2</strong> The Client may not:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Terminate mid-project</li>
        <li>Pause indefinitely</li>
        <li>Abandon and later resume</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">without Company approval (which may include additional fees).</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">6. No Transfer or Assignment</h3>
      <p style="margin-bottom: 0.75rem;"><strong>6.1</strong> The Client may not assign, sell, sublicense, or transfer:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>The project</li>
        <li>Deliverables</li>
        <li>Rights</li>
        <li>Access</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">to any third party without written consent.</p>
      <p style="margin-bottom: 1.5rem;"><strong>6.2</strong> Any unauthorized transfer renders this Agreement void, with no refund.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">7. Intellectual Property Rights</h3>
      <p style="margin-bottom: 0.75rem;"><strong>7.1</strong> All intellectual property remains the Company's property until:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>All dues are fully paid</li>
        <li>The project is formally completed</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>7.2</strong> Upon full payment, the Client receives a limited, non-exclusive, non-transferable license to use final deliverables only for their internal business purposes.</p>
      <p style="margin-bottom: 0.75rem;"><strong>7.3</strong> The Company retains:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Frameworks</li>
        <li>Templates</li>
        <li>Code libraries</li>
        <li>Methodologies</li>
        <li>Know-how</li>
        <li>Non-client-specific components</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>7.4</strong> The Company may reuse generic concepts, learnings, and non-confidential elements for other clients.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">8. Client Responsibilities</h3>
      <p style="margin-bottom: 0.75rem;"><strong>8.1</strong> The Client shall:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Provide accurate information</li>
        <li>Respond within reasonable timelines</li>
        <li>Assign a single point of contact</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>8.2</strong> The Company is not responsible for delays caused by:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Missing inputs</li>
        <li>Slow feedback</li>
        <li>Internal Client approvals</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">9. Consultancy Period (Post-Launch)</h3>
      <p style="margin-bottom: 0.75rem;"><strong>9.1</strong> Post-launch consultancy is provided for up to one (1) year, subject to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Active subscription or agreed engagement terms</li>
        <li>Reasonable usage limits</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>9.2</strong> Consultancy does not include:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Guaranteed performance</li>
        <li>Unlimited revisions</li>
        <li>Free additional development</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">10. No Guarantee of Results</h3>
      <p style="margin-bottom: 0.75rem;"><strong>10.1</strong> The Client acknowledges that:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Business outcomes depend on market forces</li>
        <li>No strategy guarantees success</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>10.2</strong> The Company makes no warranties regarding:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Revenue</li>
        <li>Users</li>
        <li>Growth</li>
        <li>Funding</li>
        <li>Valuation</li>
        <li>Market dominance</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">11. Confidentiality</h3>
      <p style="margin-bottom: 0.75rem;"><strong>11.1</strong> Both parties agree to maintain confidentiality of:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Business data</li>
        <li>Strategies</li>
        <li>Trade secrets</li>
        <li>Financial information</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>11.2</strong> Confidentiality obligations survive termination of this Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">12. Indemnification (Balanced but Protective)</h3>
      <p style="margin-bottom: 0.75rem;"><strong>12.1</strong> The Client agrees to indemnify and hold harmless the Company from:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Claims arising from Client's business operations</li>
        <li>Use or misuse of deliverables</li>
        <li>Regulatory or legal violations</li>
        <li>Third-party claims related to Client's SaaS</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>12.2</strong> The Company shall indemnify the Client only against claims that the delivered work directly infringes third-party intellectual property, subject to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Prompt notification</li>
        <li>Company control of defense</li>
        <li>Liability limits stated below</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">13. Limitation of Liability (VERY IMPORTANT)</h3>
      <p style="margin-bottom: 0.75rem;"><strong>13.1</strong> To the maximum extent permitted by law:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>The Company's total liability shall never exceed the total fees paid by the Client.</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>13.2</strong> The Company shall not be liable for:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Loss of profits</li>
        <li>Loss of data</li>
        <li>Loss of users</li>
        <li>Loss of goodwill</li>
        <li>Indirect or consequential damages</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">14. Force Majeure</h3>
      <p style="margin-bottom: 1.5rem;">The Company is not liable for delays or failure caused by:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Natural disasters</li>
        <li>Government actions</li>
        <li>Internet or infrastructure failures</li>
        <li>Labor issues</li>
        <li>Events beyond reasonable control</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">15. Termination by Company</h3>
      <p style="margin-bottom: 0.75rem;"><strong>15.1</strong> The Company may terminate this Agreement if the Client:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Breaches terms</li>
        <li>Acts abusively</li>
        <li>Engages in illegal activity</li>
        <li>Harms Company reputation</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>15.2</strong> No refunds apply upon termination.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">16. Governing Law & Jurisdiction</h3>
      <p style="margin-bottom: 0.75rem;"><strong>16.1</strong> This Agreement shall be governed by the laws of [Your Country / State].</p>
      <p style="margin-bottom: 1.5rem;"><strong>16.2</strong> Courts located in [Your City / State] shall have exclusive jurisdiction.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">17. Entire Agreement</h3>
      <p style="margin-bottom: 0.75rem;"><strong>17.1</strong> This Agreement constitutes the entire understanding between the parties.</p>
      <p style="margin-bottom: 1.5rem;"><strong>17.2</strong> Any verbal promises or emails not expressly included are not binding.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">18. Amendments</h3>
      <p style="margin-bottom: 1.5rem;">The Company reserves the right to update these Terms at any time. Continued use constitutes acceptance.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">19. Acceptance</h3>
      <p style="margin-bottom: 1.5rem;">By proceeding with payment or using the services, the Client confirms:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 2rem;">
        <li>They have read and understood this Agreement</li>
        <li>They voluntarily accept all terms</li>
        <li>They waive any claim contrary to these terms</li>
      </ul>
      
      <hr style="margin: 3rem 0; border: none; border-top: 2px solid #e2e8f0;" />
      
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1.5rem; color: #0f172a;">2. NON-DISCLOSURE & CONFIDENTIALITY AGREEMENT (NDA)</h2>
      <p style="margin-bottom: 1.5rem;">This Non-Disclosure & Confidentiality Agreement ("NDA") forms an integral part of the Master Services Agreement between [Your Company Name] ("Company") and the Client.</p>
      <p style="margin-bottom: 1.5rem;">By accessing, receiving, or disclosing any Confidential Information, both parties agree as follows:</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">1. Definition of Confidential Information</h3>
      <p style="margin-bottom: 0.75rem;"><strong>1.1</strong> "Confidential Information" includes, but is not limited to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Business plans, strategies, roadmaps</li>
        <li>Market research, feasibility reports, analytics</li>
        <li>Product designs, wireframes, code, documentation</li>
        <li>Pricing, financial data, projections</li>
        <li>Client data, user data, internal communications</li>
        <li>Proprietary tools, frameworks, methodologies</li>
        <li>Any non-public information disclosed verbally, in writing, or electronically</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>1.2</strong> Confidential Information includes information disclosed before or after execution of this Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">2. Mutual Confidentiality Obligations</h3>
      <p style="margin-bottom: 0.75rem;"><strong>2.1</strong> Each party agrees to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Maintain strict confidentiality</li>
        <li>Use Confidential Information solely for purposes of this engagement</li>
        <li>Restrict access to authorized personnel only</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>2.2</strong> Neither party shall disclose Confidential Information to any third party without prior written consent, except as required by law.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">3. Prohibited Use & Disclosure</h3>
      <p style="margin-bottom: 0.75rem;"><strong>3.1</strong> The Client shall not:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Publish, share, or distribute Company Confidential Information</li>
        <li>Reverse engineer or replicate proprietary methodologies</li>
        <li>Use Company materials for competitive or third-party purposes</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>3.2</strong> The Company shall similarly refrain from disclosing Client Confidential Information, subject to Section 6 (Permitted Disclosures).</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">4. Public Statements, Reviews & Reputation Protection (CRITICAL)</h3>
      <p style="margin-bottom: 0.75rem;"><strong>4.1</strong> The Client agrees that any public statements, reviews, testimonials, social media posts, forum discussions, or communications referencing the Company must be:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Factually accurate</li>
        <li>Non-defamatory</li>
        <li>Made in good faith</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>4.2</strong> The Client shall not:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Publish false, misleading, or harmful statements</li>
        <li>Disclose confidential project details under the guise of reviews</li>
        <li>Damage the Company's reputation through public or private communications</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>4.3</strong> In the event of:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>False allegations</li>
        <li>Malicious reviews</li>
        <li>Misrepresentation of services</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">The Company reserves the right to pursue immediate legal action, including:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Injunctive relief</li>
        <li>Monetary damages</li>
        <li>Removal of such content</li>
        <li>Recovery of legal costs</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">5. Non-Disparagement</h3>
      <p style="margin-bottom: 0.75rem;"><strong>5.1</strong> The Client agrees not to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Disparage, defame, or criticize the Company, its founders, employees, or affiliates</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">in any manner that may harm the Company's reputation or goodwill.</p>
      <p style="margin-bottom: 1.5rem;"><strong>5.2</strong> This obligation applies during and after termination of this Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">6. Permitted Disclosures</h3>
      <p style="margin-bottom: 0.75rem;"><strong>6.1</strong> Confidential Information does not include information that:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Is publicly available without breach</li>
        <li>Is lawfully received from a third party</li>
        <li>Is required to be disclosed by law or court order</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>6.2</strong> Where disclosure is legally required, the disclosing party shall provide prompt notice where legally permissible.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">7. Duration of Confidentiality Obligations</h3>
      <p style="margin-bottom: 0.75rem;"><strong>7.1</strong> Confidentiality obligations shall:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Apply during the term of the engagement</li>
        <li>Survive termination for a period of five (5) years, or indefinitely for trade secrets</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">8. Remedies & Injunctive Relief</h3>
      <p style="margin-bottom: 0.75rem;"><strong>8.1</strong> The Client acknowledges that breach of this NDA would cause irreparable harm.</p>
      <p style="margin-bottom: 0.75rem;"><strong>8.2</strong> The Company shall be entitled to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Immediate injunctive relief</li>
        <li>Equitable remedies</li>
        <li>Monetary compensation</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">Without the need to prove actual damages.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">9. No License or Ownership Transfer</h3>
      <p style="margin-bottom: 0.75rem;"><strong>9.1</strong> Disclosure of Confidential Information does not grant:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Ownership rights</li>
        <li>License rights</li>
        <li>Intellectual property rights</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">Except as expressly stated in the main Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">10. Governing Law</h3>
      <p style="margin-bottom: 1.5rem;">This NDA shall be governed by and construed in accordance with the laws of [Your Jurisdiction], with exclusive jurisdiction in [Your Courts].</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">11. Survival</h3>
      <p style="margin-bottom: 2rem;">All confidentiality, non-disparagement, and remedy clauses shall survive termination or expiration of the Agreement.</p>
      
      <hr style="margin: 3rem 0; border: none; border-top: 2px solid #e2e8f0;" />
      
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1.5rem; color: #0f172a;">3. LIQUIDATED DAMAGES & PENALTY CLAUSES</h2>
      <p style="margin-bottom: 1.5rem;">The Client expressly acknowledges that certain breaches of this Agreement would cause substantial harm to the Company, the extent of which may be difficult to precisely quantify. Accordingly, the parties agree to the following liquidated damages, which represent a genuine pre-estimate of loss and are not penalties.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">Clause A – Minor to Moderate Breach (₹10,00,000 – Ten Lakhs INR)</h3>
      <p style="margin-bottom: 0.75rem;">In the event the Client breaches any non-critical obligations under this Agreement, including but not limited to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Delays or failures in providing required inputs</li>
        <li>Unauthorized sharing of non-sensitive project information</li>
        <li>Violation of communication protocols</li>
        <li>Misuse of deliverables beyond agreed scope</li>
        <li>Breach of non-transfer, non-assignment, or usage restrictions</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">The Client shall be liable to pay the Company liquidated damages of ₹10,00,000 (Ten Lakhs INR) per occurrence, without prejudice to the Company's right to seek additional remedies where applicable.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">Clause B – Confidentiality, Reputation & NDA Breach (₹50,00,000 – Fifty Lakhs INR)</h3>
      <p style="margin-bottom: 0.75rem;">In the event the Client:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Breaches any confidentiality or NDA obligations</li>
        <li>Discloses Confidential Information to unauthorized third parties</li>
        <li>Publishes misleading, defamatory, or malicious reviews, testimonials, or public statements</li>
        <li>Shares internal documents, strategies, pricing, or proprietary materials</li>
        <li>Causes reputational harm to the Company directly or indirectly</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">The Client shall be liable to pay liquidated damages of ₹50,00,000 (Fifty Lakhs INR) per breach, in addition to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Immediate injunctive relief</li>
        <li>Removal of such content</li>
        <li>Recovery of legal and enforcement costs</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">The Client acknowledges that reputational harm and loss of goodwill constitute irreparable damage.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">Clause C – Critical Breach / IP Misuse / Fraudulent Conduct (₹1,00,00,000 – One Crore INR)</h3>
      <p style="margin-bottom: 0.75rem;">In the event of any material or critical breach, including but not limited to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Theft, replication, resale, or reverse engineering of Company IP, code, frameworks, or methodologies</li>
        <li>Unauthorized commercial exploitation of Company deliverables</li>
        <li>Willful payment default combined with continued use of services</li>
        <li>Fraud, misrepresentation, or intentional harm to the Company</li>
        <li>Any act causing severe financial, legal, or brand damage</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">The Client shall be liable to pay liquidated damages of ₹1,00,00,000 (One Crore INR) per incident, without limitation to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>The Company's right to terminate the Agreement immediately</li>
        <li>Seek criminal or civil remedies</li>
        <li>Claim additional damages exceeding the liquidated amount where permitted by law</li>
      </ul>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">Cumulative Remedies & Enforcement Clause (Recommended)</h3>
      <p style="margin-bottom: 0.75rem;">Payment of any liquidated damages under this Agreement shall not be deemed as the Company's sole or exclusive remedy.</p>
      <p style="margin-bottom: 0.75rem;">The Company shall, in addition to liquidated damages, be entitled to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Seek injunctive relief to prevent or restrain any actual or threatened breach</li>
        <li>Pursue equitable remedies, including specific performance</li>
        <li>Recover all legal costs, attorney fees, court fees, and enforcement expenses</li>
        <li>Claim additional damages where actual losses exceed the liquidated damages amount, to the extent permitted by law</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">The Client expressly agrees that:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Liquidated damages represent a genuine pre-estimate of loss</li>
        <li>Monetary compensation alone may be insufficient to remedy certain breaches</li>
        <li>The Company shall not be required to prove actual damages for enforcement</li>
      </ul>
      <p style="margin-bottom: 2rem;">This clause shall survive termination or expiration of this Agreement.</p>
    </div>
  `;

  const openModal = () => {
    setModalContent({ 
      title: 'Terms and Conditions', 
      content: termsContent 
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">2</span>
            Legal Agreements
          </h2>
          <p className="text-slate-600 ml-13">Please review and accept the agreement to proceed</p>
        </div>

        <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 transition-all">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={(e) => onChange('agreeTerms', e.target.checked)}
            className="mt-1 w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-2 focus:ring-teal-200 cursor-pointer"
          />
          <div className="flex-1">
            <label htmlFor="agreeTerms" className="text-sm font-medium text-slate-700 cursor-pointer">
              I agree to the <strong>Terms and Conditions</strong>
            </label>
            <button
              type="button"
              onClick={openModal}
              className="mt-1 text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 whitespace-nowrap"
            >
              <i className="ri-file-text-line"></i>
              View Document
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex gap-3">
            <i className="ri-information-line text-amber-600 text-xl flex-shrink-0 mt-0.5"></i>
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Important Notice</p>
              <p className="text-xs text-amber-800">
                By checking this box, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions outlined in the agreement. Please review the document carefully before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {modalContent && (
        <AgreementModal
          title={modalContent.title}
          content={modalContent.content}
          onClose={closeModal}
        />
      )}
    </>
  );
}
