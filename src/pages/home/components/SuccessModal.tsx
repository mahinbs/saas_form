import { useEffect, useState } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Reset countdown when modal opens
      setCountdown(5);
      
      let currentCount = 5;
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        currentCount -= 1;
        setCountdown(currentCount);
        
        if (currentCount <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
      
      // Redirect after 5 seconds
      const redirectTimer = setTimeout(() => {
        window.location.href = 'https://www.boostmysites.com/';
      }, 5000);
      
      return () => {
        document.body.style.overflow = 'unset';
        clearInterval(countdownInterval);
        clearTimeout(redirectTimer);
      };
    } else {
      document.body.style.overflow = 'unset';
      setCountdown(5);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scaleIn">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center animate-bounce">
          <i className="ri-checkbox-circle-line text-4xl text-white"></i>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Sign up success
        </h2>
        
        <p className="text-slate-600 mb-2">
          Redirecting you in <span className="font-bold text-teal-600 text-xl">{countdown}</span> seconds...
        </p>
        <p className="text-sm text-slate-500">
          You will be redirected to our main website
        </p>
      </div>
    </div>
  );
}
