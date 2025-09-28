import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const AuthPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  if (!isModalOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Camera className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SmartAttend</h1>
          <p className="text-gray-600 mb-8">Please sign in to continue</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
          <div className="mt-4">
            <Link to="/" className="text-teal-600 hover:text-teal-700 text-sm">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-50">
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AuthPage;