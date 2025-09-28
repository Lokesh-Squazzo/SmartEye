import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, Users, Camera, Clock, Settings, CheckCircle, AlertCircle, XCircle, CreditCard as Edit, Download, Mail, MessageSquare, Play, Pause, RotateCcw } from 'lucide-react';

const StaffPortal = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { path: '/staff', icon: Calendar, label: 'Dashboard' },
    { path: '/staff/roster', icon: Users, label: 'Live Roster' },
    { path: '/staff/classes', icon: Clock, label: 'My Classes' },
    { path: '/staff/settings', icon: Settings, label: 'Settings' }
  ];

  const sidebar = (
    <div className="py-6">
      <nav className="space-y-1 px-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/staff' && location.pathname === '/staff/');
          
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
      <Route path="/" element={<StaffDashboard sidebar={sidebar} />} />
      <Route path="/roster" element={<LiveRoster sidebar={sidebar} />} />
      <Route path="/classes" element={<MyClasses sidebar={sidebar} />} />
      <Route path="/settings" element={<StaffSettings sidebar={sidebar} />} />
    </Routes>
  );
};

const StaffDashboard: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const todayClasses = [
    { subject: "Data Structures", time: "09:00 - 10:00", room: "Room 101", enrolled: 45, present: 42 },
    { subject: "Computer Networks", time: "10:15 - 11:15", room: "Room 203", enrolled: 38, present: 35 },
    { subject: "Database Systems", time: "11:30 - 12:30", room: "Room 105", enrolled: 41, present: null }
  ];

  return (
    <Layout title="Staff Dashboard" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today's Classes</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Present Students</p>
                <p className="text-2xl font-bold text-gray-900">77</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Camera className="w-8 h-8 text-teal-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cameras Online</p>
                <p className="text-2xl font-bold text-gray-900">3/3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-sm">93%</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">93%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {todayClasses.map((classItem, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{classItem.subject}</h3>
                    <p className="text-sm text-gray-500">{classItem.time} • {classItem.room}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Enrolled: {classItem.enrolled} students
                      {classItem.present !== null && (
                        <span className="ml-2 text-teal-600">
                          • Present: {classItem.present}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {classItem.present !== null && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {Math.round((classItem.present / classItem.enrolled) * 100)}%
                        </p>
                        <p className="text-xs text-gray-500">attendance</p>
                      </div>
                    )}
                    <Link
                      to="/staff/roster"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Roster
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Camera Feed */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Live Camera Feeds</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-500">All cameras online</span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Room 101', 'Room 203', 'Room 105'].map((room, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{room}</h3>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">192.168.1.{100 + index}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const LiveRoster: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [graceWindow, setGraceWindow] = useState(15);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { name: "Anita Sharma", roll: "CE-2025-042", status: "present", time: "10:04", photo: null, confidence: 98.5 },
    { name: "Rohan Patil", roll: "CE-2025-005", status: "late", time: "10:18", photo: null, confidence: 96.2 },
    { name: "Maya Desai", roll: "CE-2025-021", status: "absent", time: null, photo: null, confidence: null },
    { name: "Arjun Singh", roll: "CE-2025-033", status: "present", time: "10:02", photo: null, confidence: 97.8 },
    { name: "Priya Nair", roll: "CE-2025-019", status: "present", time: "10:06", photo: null, confidence: 99.1 }
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
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const toggleStudentStatus = (studentIndex: number) => {
    setSelectedStudent({ ...students[studentIndex], index: studentIndex });
    setShowCorrectionModal(true);
  };

  return (
    <Layout title="Live Roster" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Timer Control */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Class Timer Control</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsTimerActive(!isTimerActive)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isTimerActive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isTimerActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    End Class
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Class
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grace Window (minutes)
              </label>
              <select 
                value={graceWindow}
                onChange={(e) => setGraceWindow(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="w-full">
                <p className="text-sm font-medium text-gray-700 mb-2">Grace window ends at</p>
                <p className="text-lg font-bold text-teal-600">10:{graceWindow.toString().padStart(2, '0')}</p>
              </div>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Timer
              </button>
            </div>
          </div>
        </div>

        {/* Roster Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Data Structures - Room 101</h2>
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium">
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </button>
              <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Mail className="w-4 h-4 mr-1" />
                Send Alerts
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Override
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{student.roll}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(student.status)}
                        <span className={`ml-2 text-sm font-medium capitalize ${
                          student.status === 'present' ? 'text-green-700' :
                          student.status === 'late' ? 'text-yellow-700' :
                          'text-red-700'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.time || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.confidence ? `${student.confidence}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStudentStatus(index)}
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Present</p>
                <p className="text-xl font-bold text-green-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Late</p>
                <p className="text-xl font-bold text-yellow-900">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XCircle className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800">Absent</p>
                <p className="text-xl font-bold text-red-900">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-teal-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-teal-800">Total</p>
                <p className="text-xl font-bold text-teal-900">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Correction Modal */}
      {showCorrectionModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            
            <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attendance Correction
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Student: <span className="font-medium">{selectedStudent.name}</span></p>
                <p className="text-sm text-gray-600 mb-4">Roll: <span className="font-medium">{selectedStudent.roll}</span></p>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Correction
                </label>
                <textarea 
                  placeholder="Enter reason for manual attendance correction..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCorrectionModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCorrectionModal(false)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const MyClasses: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  return (
    <Layout title="My Classes" sidebar={sidebar}>
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">My Classes</h3>
        <p className="text-gray-500">Class management features coming soon...</p>
      </div>
    </Layout>
  );
};

const StaffSettings: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  return (
    <Layout title="Settings" sidebar={sidebar}>
      <div className="text-center py-12">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Settings</h3>
        <p className="text-gray-500">Settings panel coming soon...</p>
      </div>
    </Layout>
  );
};

export default StaffPortal;