import { useEffect } from 'react';

interface AgreementModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function AgreementModal({ title, content, onClose }: AgreementModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            <i className="ri-close-line text-2xl text-slate-600"></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div 
            className="text-slate-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        <div className="p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
