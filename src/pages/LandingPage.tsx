import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Users, 
  BarChart3, 
  Shield, 
  Clock, 
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Zap,
  Eye,
  FileText
} from 'lucide-react';
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-teal-600" />,
      title: "Capture",
      description: "Wi-Fi enabled cameras automatically detect and capture student faces during class entry"
    },
    {
      icon: <Eye className="w-8 h-8 text-teal-600" />,
      title: "Verify",
      description: "Advanced facial recognition matches captured images with pre-registered student profiles"
    },
    {
      icon: <FileText className="w-8 h-8 text-teal-600" />,
      title: "Report",
      description: "Generate comprehensive attendance reports with analytics and export capabilities"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-teal-600" />,
      title: "95% Time Reduction",
      description: "Eliminate manual roll call and streamline attendance tracking"
    },
    {
      icon: <Shield className="w-6 h-6 text-teal-600" />,
      title: "Proxy Prevention",
      description: "Advanced biometric verification prevents attendance fraud"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
      title: "Real-time Analytics",
      description: "Instant insights into attendance patterns and student engagement"
    }
  ];

  const testimonials = [
    {
      quote: "SmartAttend has transformed how we manage attendance. The accuracy is incredible and it saves us hours every week.",
      author: "Dr. Priya Nair",
      position: "Head of Department, Computer Engineering",
      college: "Mumbai University"
    },
    {
      quote: "The privacy controls and biometric security give both students and faculty confidence in the system.",
      author: "Prof. Arun Mehta",
      position: "Dean of Academics",
      college: "IIT Delhi"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Camera className="w-8 h-8 text-teal-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">SmartAttend</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
                <a href="#benefits" className="text-gray-600 hover:text-teal-600 transition-colors">Benefits</a>
                <a href="#testimonials" className="text-gray-600 hover:text-teal-600 transition-colors">Testimonials</a>
                <Link to="/privacy" className="text-gray-600 hover:text-teal-600 transition-colors">Privacy</Link>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Features</a>
              <a href="#benefits" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Benefits</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Testimonials</a>
              <Link to="/privacy" className="block px-3 py-2 text-gray-600 hover:text-teal-600">Privacy</Link>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full text-left px-3 py-2 text-teal-600 font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Automate attendance. <br />
                <span className="text-teal-600">Detect engagement.</span> <br />
                Improve outcomes.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Wi-Fi camera + facial recognition + cloud analytics for colleges. 
                Transform your attendance management with cutting-edge biometric technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Request Demo
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-center mb-6">
                  <Camera className="w-8 h-8 text-teal-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-900">Live Classroom Feed</span>
                </div>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Camera feed simulation</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">Anita Sharma</span>
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Present
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-gray-900">Rohan Patil</span>
                    <span className="text-yellow-600 text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Late
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SmartAttend Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our three-step process ensures accurate, efficient, and secure attendance tracking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Impact & Benefits
            </h2>
            <p className="text-xl text-gray-600">
              See the measurable difference SmartAttend makes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Educators Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by leading institutions across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                  <p className="text-teal-600">{testimonial.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Camera className="w-8 h-8 text-teal-400 mr-2" />
                <span className="text-2xl font-bold">SmartAttend</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing attendance management with AI-powered facial recognition and analytics.
              </p>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg inline-block">
                <span className="font-semibold">SIH 2025 Project</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API Reference</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>team@smartattend.edu</p>
                <p>+91 98765 43210</p>
                <p>Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SmartAttend. Built for Smart India Hackathon 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;