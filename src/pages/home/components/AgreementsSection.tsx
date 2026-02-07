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
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #0f172a;">TERMS AND CONDITIONS / MASTER SERVICES AGREEMENT</h2>
      <p style="margin-bottom: 1rem;"><strong>(SaaS Product Development & Consulting Services)</strong></p>
      <p style="margin-bottom: 1.5rem;">This Master Services Agreement ("Agreement") is entered into by and between Boostmysites, a SaaS services provider ("Company", "we", "us", "our"), and the individual or legal entity accessing, purchasing, or using the services ("Client", "you", "your").</p>
      <p style="margin-bottom: 1.5rem;">By signing this Agreement, making payment, or using the Company's services, the Client agrees to be legally bound by the terms set forth herein.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">1. Scope of Services</h3>
      <p style="margin-bottom: 0.75rem;"><strong>1.1 Services Provided</strong></p>
      <p style="margin-bottom: 0.75rem;">The Company provides SaaS focused services including, but not limited to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Market validation and feasibility analysis</li>
        <li>Competitive and industry analysis</li>
        <li>Product strategy and roadmap creation</li>
        <li>SaaS product design and development</li>
        <li>Branding, positioning, and messaging</li>
        <li>Go to market and launch strategies</li>
        <li>User acquisition and growth strategies</li>
        <li>Retention, engagement, and optimization strategies</li>
        <li>Post launch consulting and advisory support for up to one (1) year</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>1.2 Delivery Format</strong></p>
      <p style="margin-bottom: 0.75rem;">Services may be delivered through documentation, software deliverables, consulting calls, development sprints, dashboards, reports, or other formats at the Company's discretion.</p>
      <p style="margin-bottom: 0.75rem;"><strong>1.3 Advisory Nature of Services</strong></p>
      <p style="margin-bottom: 0.75rem;">The Client expressly acknowledges and agrees that while the Company provides strategic guidance, analysis, development services, and advisory support, ultimate implementation, execution, and operational decision making rests solely with the Client.</p>
      <p style="margin-bottom: 0.75rem;">The Company:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Does not act as the Client's management, operator, employee, partner, sponsor, or fiduciary</li>
        <li>Does not provide full time or dedicated employees to run or operate the Client's business</li>
        <li>Does not control the Client's internal teams, processes, budgets, or execution discipline</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">Any strategies, recommendations, roadmaps, or deliverables provided by the Company must be implemented by the Client or the Client's own team. The Company may, at its discretion, assist with training, guidance, or advisory support for the Client's personnel. Such assistance does not constitute operational responsibility or execution ownership.</p>
      <p style="margin-bottom: 1.5rem;">The Client understands that business results, including revenue growth, user acquisition, retention, scalability, or market traction, depend on multiple factors outside the Company's control, including:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>Quality and speed of implementation by the Client</li>
        <li>Internal team competence and execution</li>
        <li>Allocation of sufficient resources and budget</li>
        <li>Market conditions, competition, and user behavior</li>
      </ul>
      <p style="margin-bottom: 1.5rem;">Accordingly, no metrics, outcomes, or performance indicators are guaranteed. Any projections, estimates, or examples shared by the Company are provided for informational purposes only and do not constitute assurances of success.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">2. Engagement Structure and Milestones</h3>
      <p style="margin-bottom: 0.75rem;"><strong>2.1 Milestone Based Engagement</strong></p>
      <p style="margin-bottom: 0.75rem;">All projects are executed on a milestone based model.</p>
      <p style="margin-bottom: 0.75rem;"><strong>2.2 Payment Requirement</strong></p>
      <p style="margin-bottom: 0.75rem;">Each milestone:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Has defined deliverables</li>
        <li>Requires full advance payment prior to commencement</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>2.3 Adjustments</strong></p>
      <p style="margin-bottom: 1.5rem;">The Company reserves the right to revise timelines, methods, tools, or resources as reasonably required to deliver the services.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">3. Payments and Fees (Strict)</h3>
      <p style="margin-bottom: 0.75rem;"><strong>3.1 Payment Terms</strong></p>
      <p style="margin-bottom: 0.75rem;">All payments are:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Non refundable</li>
        <li>Non cancellable</li>
        <li>Non transferable</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>3.2 Earned Fees</strong></p>
      <p style="margin-bottom: 0.75rem;">Once payment is made, it is deemed fully earned, regardless of:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Client dissatisfaction</li>
        <li>Change of business direction</li>
        <li>Market conditions</li>
        <li>Internal Client issues</li>
        <li>Partial or full non usage of services</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>3.3 No Refund Policy</strong></p>
      <p style="margin-bottom: 0.75rem;">No refunds, chargebacks, reversals, or credits will be issued under any circumstances.</p>
      <p style="margin-bottom: 1.5rem;"><strong>3.4 Waiver of Disputes</strong></p>
      <p style="margin-bottom: 1.5rem;">The Client expressly waives all rights to dispute payments with banks, payment processors, or third parties.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">4. Payment Default and Work Suspension</h3>
      <p style="margin-bottom: 0.75rem;"><strong>4.1 Suspension Trigger</strong></p>
      <p style="margin-bottom: 0.75rem;">If the Client misses, delays, partially pays, or disputes any milestone payment, all work shall immediately stop without notice.</p>
      <p style="margin-bottom: 0.75rem;"><strong>4.2 No Liability</strong></p>
      <p style="margin-bottom: 0.75rem;">The Company is not obligated to resume work and is not liable for delays, losses, or damages caused by suspension.</p>
      <p style="margin-bottom: 1.5rem;"><strong>4.3 Timeline Extension</strong></p>
      <p style="margin-bottom: 1.5rem;">Any delay caused by non payment automatically extends project timelines.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">5. No Cancellation or Early Termination</h3>
      <p style="margin-bottom: 0.75rem;"><strong>5.1 No Cancellation</strong></p>
      <p style="margin-bottom: 0.75rem;">The Client may not cancel the project once initiated.</p>
      <p style="margin-bottom: 0.75rem;"><strong>5.2 Restrictions</strong></p>
      <p style="margin-bottom: 1.5rem;">The Client may not terminate mid project, pause indefinitely, or abandon and later resume the project without Company approval, which may include additional fees.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">6. No Transfer or Assignment</h3>
      <p style="margin-bottom: 0.75rem;"><strong>6.1 Restriction</strong></p>
      <p style="margin-bottom: 0.75rem;">The Client may not assign, sell, sublicense, or transfer the project, deliverables, rights, or access to any third party without written consent.</p>
      <p style="margin-bottom: 1.5rem;"><strong>6.2 Effect of Breach</strong></p>
      <p style="margin-bottom: 1.5rem;">Any unauthorized transfer renders this Agreement void with no refund.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">7. Intellectual Property Rights</h3>
      <p style="margin-bottom: 0.75rem;"><strong>7.1 Ownership</strong></p>
      <p style="margin-bottom: 0.75rem;">All intellectual property remains the Company's property until all dues are fully paid and the project is formally completed.</p>
      <p style="margin-bottom: 0.75rem;"><strong>7.2 License Grant</strong></p>
      <p style="margin-bottom: 0.75rem;">Upon full payment, the Client receives a limited, non exclusive, non transferable license to use final deliverables solely for internal business purposes.</p>
      <p style="margin-bottom: 0.75rem;"><strong>7.3 Company Retained IP</strong></p>
      <p style="margin-bottom: 0.75rem;">The Company retains all frameworks, templates, code libraries, methodologies, know how, and non client specific components.</p>
      <p style="margin-bottom: 1.5rem;"><strong>7.4 Reuse</strong></p>
      <p style="margin-bottom: 1.5rem;">The Company may reuse generic concepts, learnings, and non confidential elements for other clients.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">8. Client Responsibilities</h3>
      <p style="margin-bottom: 0.75rem;"><strong>8.1 Obligations</strong></p>
      <p style="margin-bottom: 0.75rem;">The Client shall provide accurate information, respond within reasonable timelines, and assign a single point of contact.</p>
      <p style="margin-bottom: 1.5rem;"><strong>8.2 Delays</strong></p>
      <p style="margin-bottom: 1.5rem;">The Company is not responsible for delays caused by missing inputs, slow feedback, or internal Client approvals.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">9. Post Launch Consultancy</h3>
      <p style="margin-bottom: 0.75rem;"><strong>9.1 Duration</strong></p>
      <p style="margin-bottom: 0.75rem;">Post launch consultancy is provided for up to one (1) year, subject to active subscription or agreed engagement terms and reasonable usage limits.</p>
      <p style="margin-bottom: 1.5rem;"><strong>9.2 Exclusions</strong></p>
      <p style="margin-bottom: 1.5rem;">Consultancy does not include guaranteed performance, unlimited revisions, or free additional development.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">10. No Guarantee of Results</h3>
      <p style="margin-bottom: 1.5rem;">The Client acknowledges that business outcomes depend on market forces and execution, and no strategy guarantees success. The Company makes no warranties regarding revenue, users, growth, funding, valuation, or market dominance.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">11. Confidentiality</h3>
      <p style="margin-bottom: 1.5rem;">Both parties agree to maintain confidentiality of business data, strategies, trade secrets, and financial information. Confidentiality obligations survive termination.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">12. Indemnification</h3>
      <p style="margin-bottom: 0.75rem;"><strong>12.1 Client Indemnity</strong></p>
      <p style="margin-bottom: 0.75rem;">The Client agrees to indemnify and hold harmless the Company from claims arising from the Client's business operations, use or misuse of deliverables, regulatory violations, or third party claims.</p>
      <p style="margin-bottom: 1.5rem;"><strong>12.2 Company Indemnity</strong></p>
      <p style="margin-bottom: 1.5rem;">The Company shall indemnify the Client only against claims that delivered work directly infringes third party intellectual property, subject to prompt notice, Company control of defense, and liability limits.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">13. Limitation of Liability</h3>
      <p style="margin-bottom: 1.5rem;">To the maximum extent permitted by law, the Company's total liability shall never exceed the total fees paid by the Client. The Company shall not be liable for loss of profits, data, users, goodwill, or indirect or consequential damages.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">14. Force Majeure</h3>
      <p style="margin-bottom: 1.5rem;">The Company is not liable for delays or failure caused by natural disasters, government actions, infrastructure failures, labor issues, or events beyond reasonable control.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">15. Termination by Company</h3>
      <p style="margin-bottom: 1.5rem;">The Company may terminate this Agreement if the Client breaches terms, acts abusively, engages in illegal activity, or harms the Company's reputation. No refunds apply upon termination.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">16. Governing Law and Jurisdiction</h3>
      <p style="margin-bottom: 0.75rem;"><strong>16.1</strong> This Agreement shall be governed by and construed in accordance with the laws of India.</p>
      <p style="margin-bottom: 1.5rem;"><strong>16.2</strong> Courts located in Bangalore, Karnataka shall have exclusive jurisdiction.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">17. Entire Agreement</h3>
      <p style="margin-bottom: 1.5rem;">This Agreement constitutes the entire understanding between the parties. Any verbal promises or communications not expressly included are not binding.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">18. Amendments</h3>
      <p style="margin-bottom: 1.5rem;">The Company reserves the right to update these terms at any time. Continued use constitutes acceptance.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">19. Acceptance</h3>
      <p style="margin-bottom: 1.5rem;">By proceeding with payment or using the services, the Client confirms that they have read, understood, and voluntarily accepted all terms and waive any claim contrary to these terms.</p>
      
      <hr style="margin: 3rem 0; border: none; border-top: 2px solid #e2e8f0;" />
      
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1.5rem; color: #0f172a;">NON DISCLOSURE AND CONFIDENTIALITY AGREEMENT (NDA)</h2>
      <p style="margin-bottom: 1.5rem;">This Non Disclosure and Confidentiality Agreement ("NDA") forms an integral and binding part of the Master Services Agreement entered into between Boostmysites ("Company", "we", "us", "our") and the individual or legal entity engaging the Company's services ("Client", "you", "your").</p>
      <p style="margin-bottom: 1.5rem;">By accessing, receiving, sharing, or using any Confidential Information, both parties agree to the terms set forth below.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">1. Definition of Confidential Information</h3>
      <p style="margin-bottom: 0.75rem;"><strong>1.1</strong> "Confidential Information" includes, without limitation:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Business plans, strategies, roadmaps, and operational documents</li>
        <li>Market research, feasibility studies, analytics, and reports</li>
        <li>Product designs, wireframes, source code, software, and documentation</li>
        <li>Pricing, financial data, projections, and commercial terms</li>
        <li>Client data, user data, internal communications, and records</li>
        <li>Proprietary tools, systems, frameworks, methodologies, and processes</li>
        <li>Any non public information disclosed verbally, in writing, electronically, or visually</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>1.2</strong> Confidential Information includes information disclosed both before and after execution of the Master Services Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">2. Mutual Confidentiality Obligations</h3>
      <p style="margin-bottom: 0.75rem;"><strong>2.1</strong> Each party agrees to:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Maintain strict confidentiality of all Confidential Information</li>
        <li>Use Confidential Information solely for purposes of the agreed engagement</li>
        <li>Restrict access to Confidential Information to authorized personnel only</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>2.2</strong> Neither party shall disclose Confidential Information to any third party without prior written consent, except where disclosure is required by applicable law.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">3. Prohibited Use and Disclosure</h3>
      <p style="margin-bottom: 0.75rem;"><strong>3.1</strong> The Client shall not:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Publish, distribute, or share Company Confidential Information</li>
        <li>Reverse engineer, replicate, or derive competing products or services from Company materials</li>
        <li>Use Company Confidential Information for competitive, commercial, or third party purposes</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>3.2</strong> The Company shall similarly refrain from disclosing Client Confidential Information, subject to permitted disclosures under this Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">4. Public Statements, Reviews, and Reputation Protection</h3>
      <p style="margin-bottom: 0.75rem;"><strong>4.1</strong> Any public statements, reviews, testimonials, social media posts, forum discussions, or communications referencing the Company must be:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Factually accurate</li>
        <li>Non defamatory</li>
        <li>Made in good faith</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>4.2</strong> The Client shall not:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Publish false, misleading, or exaggerated statements</li>
        <li>Disclose confidential project details under the guise of reviews or feedback</li>
        <li>Damage the Company's reputation through public or private communications</li>
      </ul>
      <p style="margin-bottom: 0.75rem;"><strong>4.3</strong> In the event of false allegations, malicious reviews, or misrepresentation of services, the Company reserves the right to pursue immediate legal action, including injunctive relief, monetary damages, removal of such content, and recovery of legal costs.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">5. Non Disparagement</h3>
      <p style="margin-bottom: 0.75rem;"><strong>5.1</strong> The Client agrees not to disparage, defame, or criticize the Company, its founders, employees, contractors, or affiliates in any manner that may harm the Company's reputation or goodwill.</p>
      <p style="margin-bottom: 1.5rem;"><strong>5.2</strong> This obligation applies during the term of the engagement and survives termination or expiration of the Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">6. Permitted Disclosures</h3>
      <p style="margin-bottom: 0.75rem;"><strong>6.1</strong> Confidential Information does not include information that:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Is publicly available without breach of this Agreement</li>
        <li>Is lawfully obtained from a third party without restriction</li>
        <li>Is required to be disclosed pursuant to law, regulation, or court order</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>6.2</strong> Where disclosure is legally required, the disclosing party shall provide prompt notice to the other party where legally permissible.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">7. Duration of Confidentiality Obligations</h3>
      <p style="margin-bottom: 0.75rem;"><strong>7.1</strong> Confidentiality obligations shall:</p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
        <li>Apply throughout the term of the engagement</li>
        <li>Survive termination for five (5) years</li>
      </ul>
      <p style="margin-bottom: 1.5rem;"><strong>7.2</strong> Trade secrets and proprietary intellectual property shall remain confidential indefinitely to the extent permitted by law.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">8. Remedies and Injunctive Relief</h3>
      <p style="margin-bottom: 0.75rem;"><strong>8.1</strong> The Client acknowledges that any breach of this NDA would cause irreparable harm to the Company for which monetary damages may be insufficient.</p>
      <p style="margin-bottom: 1.5rem;"><strong>8.2</strong> The Company shall be entitled to immediate injunctive relief, equitable remedies, and monetary compensation without the requirement to prove actual damages.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">9. No License or Ownership Transfer</h3>
      <p style="margin-bottom: 1.5rem;"><strong>9.1</strong> Disclosure of Confidential Information does not grant the Client any ownership, license, or intellectual property rights, except as expressly stated in the Master Services Agreement.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">10. Governing Law and Jurisdiction</h3>
      <p style="margin-bottom: 1.5rem;">This NDA shall be governed by and construed in accordance with the laws of India. Courts located in Bangalore, Karnataka shall have exclusive jurisdiction.</p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2e8f0;" />
      
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; color: #0f172a;">11. Survival</h3>
      <p style="margin-bottom: 2rem;">All confidentiality, non disparagement, remedy, and enforcement obligations under this NDA shall survive termination or expiration of the Master Services Agreement.</p>
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
