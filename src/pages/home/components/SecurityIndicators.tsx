export default function SecurityIndicators() {
  const securityFeatures = [
    {
      icon: 'ri-shield-check-line',
      title: 'SSL Encrypted',
      description: '256-bit encryption',
    },
    {
      icon: 'ri-lock-line',
      title: 'Secure Storage',
      description: 'Protected data centers',
    },
    {
      icon: 'ri-eye-off-line',
      title: 'Privacy Protected',
      description: 'GDPR compliant',
    },
    {
      icon: 'ri-verified-badge-line',
      title: 'Verified Process',
      description: 'Industry standards',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl p-6 border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-shield-star-line text-2xl text-teal-600"></i>
        <h3 className="text-lg font-bold text-slate-900">Security & Trust</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white border border-teal-200 flex items-center justify-center">
              <i className={`${feature.icon} text-xl text-teal-600`}></i>
            </div>
            <p className="text-xs font-semibold text-slate-900 mb-0.5">{feature.title}</p>
            <p className="text-xs text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-5 border-t border-slate-200">
        <p className="text-xs text-center text-slate-600">
          Your information is encrypted and securely transmitted. We never share your data with third parties.
        </p>
      </div>
    </div>
  );
}
