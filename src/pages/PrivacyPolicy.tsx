import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowLeft, Shield, Eye, Database, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-teal-600 hover:text-teal-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to SmartAttend
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-teal-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">SmartAttend Privacy Policy</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2025</p>
          </div>

          {/* Key Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-teal-600 mr-2" />
                <h3 className="font-semibold text-teal-900">Secure by Design</h3>
              </div>
              <p className="text-teal-800 text-sm">
                Biometric templates stored as hashed feature-keys, not actual images
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Eye className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">Opt-out Available</h3>
              </div>
              <p className="text-blue-800 text-sm">
                Alternative QR code check-in for students who prefer not to use facial recognition
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Data We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">For Students:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, roll number, and college affiliation</li>
                    <li>Facial biometric template (stored as encrypted mathematical representation)</li>
                    <li>Attendance records including timestamps and classroom locations</li>
                    <li>Profile photo (optional, used for verification purposes)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">For Staff and Administrators:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and institutional role</li>
                    <li>Class assignments and schedule information</li>
                    <li>Usage logs for system administration</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Automated attendance tracking during scheduled classes</li>
                <li>Generation of attendance reports for academic purposes</li>
                <li>Prevention of attendance fraud through biometric verification</li>
                <li>System analytics to improve attendance monitoring accuracy</li>
                <li>Communication regarding attendance status and alerts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Biometric Data Security</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Lock className="w-6 h-6 text-gray-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Advanced Encryption</h3>
                    <p className="text-gray-700 mb-4">
                      We never store actual facial images. Instead, we create mathematical templates 
                      (feature-keys) that are encrypted and cannot be reverse-engineered to recreate 
                      your face.
                    </p>
                    <div className="bg-white border border-gray-200 rounded p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Technical Implementation:</strong> Facial features are converted into 
                        a unique numerical signature using industry-standard algorithms, then encrypted 
                        with AES-256 encryption before storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Consent Control</h3>
                  <p className="text-gray-700 text-sm">
                    You can opt-out of facial recognition at any time through your privacy settings. 
                    An alternative QR code check-in system is always available.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Data Access</h3>
                  <p className="text-gray-700 text-sm">
                    You can request a copy of all your attendance data and see exactly what 
                    information we have stored about you.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Data Deletion</h3>
                  <p className="text-gray-700 text-sm">
                    You can request deletion of your account and all associated data, including 
                    biometric templates, at any time.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Data Portability</h3>
                  <p className="text-gray-700 text-sm">
                    Export your attendance records in standard formats (CSV, PDF) for 
                    personal use or transfer to other systems.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>We do not sell or rent your personal data to third parties.</strong> 
                  Your information is only shared in the following limited circumstances:
                </p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your educational institution's academic administration for attendance reporting</li>
                  <li>With instructors for your enrolled courses to track class participation</li>
                  <li>When required by law or to protect the safety and security of our users</li>
                  <li>In anonymized, aggregated form for research purposes (only with your explicit consent)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="list-disc list-inside space-y-1 text-blue-900">
                  <li><strong>Attendance Records:</strong> Retained for the duration of your enrollment plus 7 years for academic record-keeping</li>
                  <li><strong>Biometric Templates:</strong> Deleted within 30 days of account closure or opt-out</li>
                  <li><strong>Profile Information:</strong> Retained until you request deletion or graduate</li>
                  <li><strong>System Logs:</strong> Kept for 90 days for security and troubleshooting purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have questions about this privacy policy or how we handle your data, please contact us:
                </p>
                
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@smartattend.edu</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> SmartAttend Privacy Office, Mumbai, Maharashtra 400001</p>
                </div>
                
                <p className="text-sm text-gray-600 mt-4">
                  We will respond to all privacy-related inquiries within 48 hours during business days.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 mt-12 text-center">
            <p className="text-gray-600">
              This privacy policy is part of our commitment to transparent and responsible data handling 
              in educational technology.
            </p>
            <div className="mt-4">
              <Link 
                to="/" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Return to SmartAttend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;