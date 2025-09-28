import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Camera,
  Shield,
  QrCode,
  Download,
  ChevronRight
} from 'lucide-react';

const StudentPortal = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { path: '/student', icon: Calendar, label: 'Dashboard' },
    { path: '/student/attendance', icon: Clock, label: 'Attendance History' },
    { path: '/student/profile', icon: User, label: 'Profile' },
    { path: '/student/privacy', icon: Shield, label: 'Privacy Settings' }
  ];

  const sidebar = (
    <div className="py-6">
      <nav className="space-y-1 px-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/student' && location.pathname === '/student/');
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<StudentDashboard sidebar={sidebar} />} />
      <Route path="/attendance" element={<AttendanceHistory sidebar={sidebar} />} />
      <Route path="/profile" element={<StudentProfile sidebar={sidebar} />} />
      <Route path="/privacy" element={<PrivacySettings sidebar={sidebar} />} />
    </Routes>
  );
};

const StudentDashboard: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const todayClasses = [
    { subject: "Data Structures", time: "09:00 - 10:00", room: "Room 101", status: "present", timestamp: "09:04 AM" },
    { subject: "Computer Networks", time: "10:15 - 11:15", room: "Room 203", status: "late", timestamp: "10:18 AM" },
    { subject: "Database Systems", time: "11:30 - 12:30", room: "Room 105", status: "upcoming", timestamp: null },
    { subject: "Software Engineering", time: "02:00 - 03:00", room: "Room 201", status: "upcoming", timestamp: null }
  ];

  const notifications = [
    "Attendance marked for Data Structures - 09:04 AM",
    "Late arrival detected for Computer Networks - 10:18 AM",
    "Reminder: Database Systems starts in 30 minutes"
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'late':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'late':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'absent':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Layout title="Dashboard" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Present Today</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Late</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold">88%</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Attendance</p>
                <p className="text-2xl font-bold text-gray-900">88%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {todayClasses.map((classItem, index) => (
              <div key={index} className={`p-6 ${getStatusColor(classItem.status)} border-l-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(classItem.status)}
                    <div>
                      <h3 className="font-semibold">{classItem.subject}</h3>
                      <p className="text-sm opacity-75">{classItem.time} • {classItem.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium capitalize">{classItem.status}</p>
                    {classItem.timestamp && (
                      <p className="text-xs opacity-75">{classItem.timestamp}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <p className="text-sm text-gray-700">{notification}</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const AttendanceHistory: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const attendanceData = [
    { date: "2025-01-15", subject: "Data Structures", status: "present", time: "09:04" },
    { date: "2025-01-15", subject: "Computer Networks", status: "late", time: "10:18" },
    { date: "2025-01-14", subject: "Database Systems", status: "present", time: "11:32" },
    { date: "2025-01-14", subject: "Software Engineering", status: "absent", time: null },
    { date: "2025-01-13", subject: "Data Structures", status: "present", time: "09:02" },
    { date: "2025-01-13", subject: "Computer Networks", status: "present", time: "10:15" }
  ];

  return (
    <Layout title="Attendance History" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Calendar Heatmap Placeholder */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded ${
                  Math.random() > 0.3 ? 'bg-green-200' : 
                  Math.random() > 0.7 ? 'bg-red-200' : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100 rounded"></div>
              <div className="w-3 h-3 bg-green-100 rounded"></div>
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <div className="w-3 h-3 bg-green-300 rounded"></div>
              <div className="w-3 h-3 bg-green-400 rounded"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Attendance</h2>
            <button className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium">
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.time || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StudentProfile: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const { user } = useAuth();

  return (
    <Layout title="Profile" sidebar={sidebar}>
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.rollNumber}</p>
              <p className="text-teal-600">{user?.college}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                value={user?.rollNumber}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College
              </label>
              <input
                type="text"
                value={user?.college}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biometric Status
              </label>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-800 font-medium">Biometric template: registered ✓</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your facial biometric template is securely stored as hashed feature-keys
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PrivacySettings: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const [biometricConsent, setBiometricConsent] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <Layout title="Privacy Settings" sidebar={sidebar}>
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Biometric Data Consent</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Facial Recognition</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Allow SmartAttend to use facial recognition for attendance tracking. 
                    Biometric templates stored as hashed feature-keys for security.
                  </p>
                </div>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    checked={biometricConsent}
                    onChange={(e) => setBiometricConsent(e.target.checked)}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                </label>
              </div>

              {!biometricConsent && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <QrCode className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-blue-900">Alternative QR Check-in</h4>
                  </div>
                  <p className="text-sm text-blue-800">
                    With facial recognition disabled, you can use QR code scanning for attendance.
                    Your instructor will provide a unique QR code for each class.
                  </p>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Sharing</h2>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Analytics & Research</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Allow anonymized attendance data to be used for institutional research 
                  and improving the SmartAttend system.
                </p>
              </div>
              <label className="flex items-center ml-4">
                <input
                  type="checkbox"
                  checked={dataSharing}
                  onChange={(e) => setDataSharing(e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
              </label>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Rights</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium text-gray-900">Download My Data</h4>
                <p className="text-sm text-gray-600">Get a copy of all your attendance records</p>
              </button>
              
              <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-700">
                <h4 className="font-medium">Delete My Account</h4>
                <p className="text-sm text-red-600">Permanently remove your account and all data</p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentPortal;