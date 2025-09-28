import React, { useState } from 'react';
import { X, Camera, Upload, Eye, EyeOff } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNumber: '',
    college: '',
    photo: null as File | null
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'signin') {
        await login(formData.email, formData.password, role);
        onClose();
        navigate(`/${role}`);
      } else if (mode === 'signup') {
        if (role !== 'student') {
          setShowOnboarding(true);
          return;
        }
        await register({ ...formData, role });
        onClose();
        navigate(`/${role}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleOnboardingComplete = async () => {
    await register({ ...formData, role });
    setShowOnboarding(false);
    onClose();
    navigate(`/${role}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!showOnboarding ? (
            <>
              <div className="text-center mb-8">
                <Camera className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Get Started' : 'Reset Password'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {mode === 'signin' ? 'Sign in to your SmartAttend account' : 
                   mode === 'signup' ? 'Create your SmartAttend account' : 
                   'Enter your email to reset password'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['student', 'staff', 'admin'] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                              role === r
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {role === 'student' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Roll Number
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.rollNumber}
                            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="CE-2025-042"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            College
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Government College of Engineering"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Photo (Optional)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                              className="hidden"
                              id="photo-upload"
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer text-teal-600 hover:text-teal-700">
                              Click to upload photo
                            </label>
                            <p className="text-xs text-gray-500 mt-1">For biometric registration</p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {mode !== 'forgot' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="your.email@college.edu"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'forgot' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="your.email@college.edu"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Please wait...' : 
                   mode === 'signin' ? 'Sign In' : 
                   mode === 'signup' ? 'Create Account' : 
                   'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 text-center space-y-2">
                {mode === 'signin' && (
                  <>
                    <button
                      onClick={() => setMode('forgot')}
                      className="text-teal-600 hover:text-teal-700 text-sm"
                    >
                      Forgot password?
                    </button>
                    <p className="text-gray-600 text-sm">
                      Don't have an account?{' '}
                      <button
                        onClick={() => setMode('signup')}
                        className="text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Sign up
                      </button>
                    </p>
                  </>
                )}
                
                {mode === 'signup' && (
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                )}
                
                {mode === 'forgot' && (
                  <button
                    onClick={() => setMode('signin')}
                    className="text-teal-600 hover:text-teal-700 text-sm"
                  >
                    Back to sign in
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Camera Setup Required</h3>
              <p className="text-gray-600 mb-6">
                As a {role}, you'll need to configure camera mappings for your classrooms.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Map Wi-Fi cameras to classroom locations</li>
                  <li>• Test camera connectivity and positioning</li>
                  <li>• Configure attendance grace periods</li>
                </ul>
              </div>
              <button
                onClick={handleOnboardingComplete}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;