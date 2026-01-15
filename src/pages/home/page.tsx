import { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import SuccessModal from './components/SuccessModal';

export default function HomePage() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <SignUpForm onSuccess={() => setShowSuccess(true)} />
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
