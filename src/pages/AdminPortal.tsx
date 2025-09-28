import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { BarChart3, Users, Camera, Calendar, Settings, Plus, CreditCard as Edit, Trash2, Upload, Download, CheckCircle, AlertCircle, XCircle, Eye, EyeOff, MapPin } from 'lucide-react';

const AdminPortal = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { path: '/admin', icon: BarChart3, label: 'Overview' },
    { path: '/admin/cameras', icon: Camera, label: 'Camera Management' },
    { path: '/admin/timetable', icon: Calendar, label: 'Timetable' },
    { path: '/admin/users', icon: Users, label: 'User Management' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics Dashboard' }
  ];

  const sidebar = (
    <div className="py-6">
      <nav className="space-y-1 px-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/admin' && location.pathname === '/admin/');
          
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
      <Route path="/" element={<AdminOverview sidebar={sidebar} />} />
      <Route path="/cameras" element={<CameraManagement sidebar={sidebar} />} />
      <Route path="/timetable" element={<TimetableManager sidebar={sidebar} />} />
      <Route path="/users" element={<UserManagement sidebar={sidebar} />} />
      <Route path="/reports" element={<Reports sidebar={sidebar} />} />
    </Routes>
  );
};

const AdminOverview: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const systemStats = [
    { label: 'Total Attendance', value: '92%', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Cameras Online', value: '15/16', icon: Camera, color: 'text-teal-500', bg: 'bg-teal-50' },
    { label: 'Proxies Flagged', value: '3', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Active Users', value: '1,247', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  const recentAlerts = [
    { type: 'proxy', message: 'Proxy attendance flagged in Room 101 - Student ID: CE-2025-089', time: '2 min ago' },
    { type: 'camera', message: 'Camera offline: Room 205', time: '15 min ago' },
    { type: 'attendance', message: 'Low attendance alert: Database Systems (67%)', time: '1 hour ago' }
  ];

  return (
    <Layout title="System Overview" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`${stat.bg} border border-gray-200 rounded-lg p-6`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'proxy' ? 'bg-red-400' :
                      alert.type === 'camera' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`} />
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Camera Status</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {['Room 101', 'Room 102', 'Room 201', 'Room 205'].map((room, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{room}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        index === 3 ? 'bg-red-400' : 'bg-green-400'
                      }`} />
                      <span className={`text-sm ${
                        index === 3 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {index === 3 ? 'Offline' : 'Online'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/admin/cameras" 
              className="flex items-center justify-center p-4 bg-teal-50 rounded-lg border-2 border-teal-200 hover:border-teal-300 transition-colors"
            >
              <div className="text-center">
                <Camera className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-teal-700">Add Camera</span>
              </div>
            </Link>
            
            <Link 
              to="/admin/users" 
              className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-colors"
            >
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-blue-700">Manage Users</span>
              </div>
            </Link>
            
            <Link 
              to="/admin/reports" 
              className="flex items-center justify-center p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors"
            >
              <div className="text-center">
                <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-green-700">Export Reports</span>
              </div>
            </Link>
            
            <Link 
              to="/analytics" 
              className="flex items-center justify-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200 hover:border-purple-300 transition-colors"
            >
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-purple-700">View Analytics</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CameraManagement: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [cameras, setCameras] = useState([
    { id: 1, name: 'Room 101', ip: '192.168.1.101', status: 'online', room: 'Room 101', location: 'Block A' },
    { id: 2, name: 'Room 102', ip: '192.168.1.102', status: 'online', room: 'Room 102', location: 'Block A' },
    { id: 3, name: 'Room 201', ip: '192.168.1.201', status: 'online', room: 'Room 201', location: 'Block B' },
    { id: 4, name: 'Room 205', ip: '192.168.1.205', status: 'offline', room: 'Room 205', location: 'Block B' }
  ]);

  return (
    <Layout title="Camera Management" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Wi-Fi Cameras</h2>
            <p className="text-gray-600">Manage classroom cameras and monitor their status</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Camera
          </button>
        </div>

        {/* Cameras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <div key={camera.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{camera.name}</h3>
                <div className={`flex items-center ${
                  camera.status === 'online' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    camera.status === 'online' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <span className="text-sm font-medium capitalize">{camera.status}</span>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-4">
                {camera.status === 'online' ? (
                  <Camera className="w-8 h-8 text-gray-400" />
                ) : (
                  <div className="text-center">
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-1" />
                    <span className="text-xs text-red-600">No Signal</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{camera.location} • {camera.room}</span>
                </div>
                <div>
                  <span className="font-medium">IP:</span> {camera.ip}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Test Feed
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Camera Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
              <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
              
              <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Camera</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Camera Name
                    </label>
                    <input
                      type="text"
                      placeholder="Room 301"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IP Address / RTSP URL
                    </label>
                    <input
                      type="text"
                      placeholder="192.168.1.301 or rtsp://camera-url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Block A</option>
                      <option>Block B</option>
                      <option>Block C</option>
                      <option>Block D</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Assignment
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Room 301</option>
                      <option>Room 302</option>
                      <option>Room 303</option>
                      <option>Room 304</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Add Camera
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const TimetableManager: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  return (
    <Layout title="Timetable Management" sidebar={sidebar}>
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Timetable Manager</h3>
        <p className="text-gray-500">Drag-and-drop timetable management coming soon...</p>
      </div>
    </Layout>
  );
};

const UserManagement: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  const users = [
    { name: 'Anita Sharma', email: 'anita@college.edu', role: 'student', rollNumber: 'CE-2025-042', status: 'active' },
    { name: 'Dr. Rajesh Kumar', email: 'rajesh@college.edu', role: 'staff', rollNumber: null, status: 'active' },
    { name: 'Maya Desai', email: 'maya@college.edu', role: 'student', rollNumber: 'CE-2025-021', status: 'active' },
    { name: 'Admin User', email: 'admin@college.edu', role: 'admin', rollNumber: null, status: 'active' }
  ];

  return (
    <Layout title="User Management" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Users</h2>
            <p className="text-gray-600">Manage students, staff, and administrators</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-teal-600 font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.rollNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-teal-600 hover:text-teal-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

const Reports: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  return (
    <Layout title="Reports" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Report Generation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>Attendance Summary</option>
                <option>Class-wise Report</option>
                <option>Student Report</option>
                <option>Proxy Detection</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This semester</option>
                <option>Custom range</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>
          </div>
          
          <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Automated Reports</h2>
          <p className="text-gray-600 mb-4">Schedule weekly automated reports to be sent via email</p>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Schedule Weekly Report
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPortal;