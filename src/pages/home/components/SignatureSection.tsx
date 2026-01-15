import { useState } from 'react';

interface SignatureSectionProps {
  signatureFile: File | null;
  error: string;
  onChange: (file: File | null) => void;
  onBlur: () => void;
}

export default function SignatureSection({ signatureFile, error, onChange, onBlur }: SignatureSectionProps) {
  const [preview, setPreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('Signature file size must be less than 2MB');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG and PNG files are allowed for signature');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      onChange(file);
    }
  };

  const clearSignature = () => {
    onChange(null);
    setPreview('');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">3</span>
          Signature Upload
        </h2>
        <p className="text-slate-600 ml-13">Upload your signature for authorization</p>
      </div>

      <div>
        <label htmlFor="signatureFile" className="block text-sm font-semibold text-slate-700 mb-2">
          Digital Signature <span className="text-red-500">*</span>
        </label>
        
        {!preview ? (
          <div className="relative">
            <input
              type="file"
              id="signatureFile"
              name="signatureFile"
              onChange={handleFileChange}
              onBlur={onBlur}
              accept=".jpg,.jpeg,.png"
              className="hidden"
            />
            <label
              htmlFor="signatureFile"
              className={`flex items-center justify-center w-full px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                error
                  ? 'border-red-300 bg-red-50 hover:bg-red-100'
                  : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-teal-400'
              }`}
            >
              <div className="text-center">
                <i className="ri-quill-pen-line text-4xl text-slate-400 mb-3"></i>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  Click to upload your signature
                </p>
                <p className="text-xs text-slate-500">JPG or PNG (Max 2MB)</p>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative">
            <div className="p-6 border-2 border-teal-400 bg-teal-50 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-teal-900 flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600"></i>
                  Signature Uploaded
                </span>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 whitespace-nowrap"
                >
                  <i className="ri-delete-bin-line"></i>
                  Remove
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <img
                  src={preview}
                  alt="Signature preview"
                  className="max-h-32 mx-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <i className="ri-error-warning-line"></i>
            {error}
          </p>
        )}
        
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-600 flex items-start gap-2">
            <i className="ri-information-line text-teal-600 text-sm flex-shrink-0 mt-0.5"></i>
            <span>
              Your signature confirms your agreement to all terms and authorizes the transaction. Please ensure your signature is clear and matches your official documents.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
