import { useState } from 'react';

interface UserDetailsSectionProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    transactionAmount: string;
    transactionId: string;
    aadhaarFile: File | null;
  };
  errors: Record<string, string>;
  onChange: (name: string, value: any) => void;
  onBlur: (name: string) => void;
}

export default function UserDetailsSection({ formData, errors, onChange, onBlur }: UserDetailsSectionProps) {
  const [aadhaarFileName, setAadhaarFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed');
        return;
      }
      onChange('aadhaarFile', file);
      setAadhaarFileName(file.name);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">1</span>
          User Details
        </h2>
        <p className="text-slate-600 ml-13">Please provide your personal and transaction information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-user-line text-slate-400 text-lg"></i>
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={() => onBlur('fullName')}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-teal-200 focus:border-teal-400'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-phone-line text-slate-400 text-lg"></i>
            </div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              onBlur={() => onBlur('phoneNumber')}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.phoneNumber
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-teal-200 focus:border-teal-400'
              }`}
              placeholder="+91 98765 43210"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-mail-line text-slate-400 text-lg"></i>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={() => onBlur('email')}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-teal-200 focus:border-teal-400'
              }`}
              placeholder="your.email@company.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="transactionAmount" className="block text-sm font-semibold text-slate-700 mb-2">
            Transaction Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-500 font-semibold text-sm">₹</span>
            </div>
            <input
              type="number"
              id="transactionAmount"
              name="transactionAmount"
              value={formData.transactionAmount}
              onChange={(e) => onChange('transactionAmount', e.target.value)}
              onBlur={() => onBlur('transactionAmount')}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.transactionAmount
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-teal-200 focus:border-teal-400'
              }`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          {errors.transactionAmount && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {errors.transactionAmount}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="transactionId" className="block text-sm font-semibold text-slate-700 mb-2">
            Transaction ID / Reference <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-hashtag text-slate-400 text-lg"></i>
            </div>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={formData.transactionId}
              onChange={(e) => onChange('transactionId', e.target.value)}
              onBlur={() => onBlur('transactionId')}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.transactionId
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-teal-200 focus:border-teal-400'
              }`}
              placeholder="TXN123456789"
            />
          </div>
          {errors.transactionId && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {errors.transactionId}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="aadhaarFile" className="block text-sm font-semibold text-slate-700 mb-2">
            Upload Aadhaar Document <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              id="aadhaarFile"
              name="aadhaarFile"
              onChange={handleFileChange}
              onBlur={() => onBlur('aadhaarFile')}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <label
              htmlFor="aadhaarFile"
              className={`flex items-center justify-center w-full px-6 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                errors.aadhaarFile
                  ? 'border-red-300 bg-red-50 hover:bg-red-100'
                  : formData.aadhaarFile
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="text-center">
                <i className={`text-3xl mb-2 ${formData.aadhaarFile ? 'ri-file-check-line text-teal-600' : 'ri-upload-cloud-line text-slate-400'}`}></i>
                <p className="text-sm font-medium text-slate-700">
                  {aadhaarFileName || 'Click to upload Aadhaar document'}
                </p>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </label>
          </div>
          {errors.aadhaarFile && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {errors.aadhaarFile}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <i className="ri-lock-line text-teal-600"></i>
            Your document is encrypted and securely stored
          </p>
        </div>
      </div>
    </div>
  );
}
