export default function FormHeader() {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <img 
          src="https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/13046edbe678a8cf3d7a1351cc19a5d7.png" 
          alt="Company Logo" 
          className="h-32 w-auto object-contain"
        />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        SaaS Development & Consulting
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Complete the secure sign-up form below to begin your journey with our enterprise-grade consulting services
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
        <i className="ri-shield-check-line text-teal-600 text-lg"></i>
        <span>Secure & Encrypted Submission</span>
      </div>
    </div>
  );
}
