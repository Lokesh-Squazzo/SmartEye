import React from 'react';
import Layout from '../components/Layout';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle, 
  Clock, 
  Camera,
  Eye,
  CheckCircle
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const kpiData = [
    { label: 'College Attendance', value: '92.4%', change: '+2.3%', trend: 'up', color: 'text-green-500' },
    { label: 'Students Flagged', value: '23', change: '-5', trend: 'down', color: 'text-red-500' },
    { label: 'Proxies Detected', value: '7', change: '+2', trend: 'up', color: 'text-yellow-500' },
    { label: 'Avg Arrival Time', value: '9:08 AM', change: '-3 min', trend: 'down', color: 'text-blue-500' }
  ];

  const riskStudents = [
    { name: 'Rohit Kumar', roll: 'CE-2025-067', attendance: '58%', trend: [65, 60, 58, 55, 58] },
    { name: 'Sneha Patil', roll: 'IT-2025-089', attendance: '62%', trend: [70, 68, 65, 62, 62] },
    { name: 'Amit Shah', roll: 'ME-2025-123', attendance: '59%', trend: [68, 65, 62, 60, 59] }
  ];

  const liveMatches = [
    { name: 'Anita Sharma', confidence: '98.5%', time: '10:04 AM', status: 'verified' },
    { name: 'Rohan Patil', confidence: '96.2%', time: '10:18 AM', status: 'verified' },
    { name: 'Maya Desai', confidence: '99.1%', time: '10:06 AM', status: 'verified' }
  ];

  const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <svg width="60" height="20" className="inline-block">
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 50;
          const y = 20 - ((value - min) / range) * 15;
          return (
            <circle 
              key={index} 
              cx={x + 5} 
              cy={y} 
              r="1" 
              fill="#ef4444" 
            />
          );
        })}
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="1"
          points={data.map((value, index) => {
            const x = (index / (data.length - 1)) * 50 + 5;
            const y = 20 - ((value - min) / range) * 15;
            return `${x},${y}`;
          }).join(' ')}
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-screen Analytics Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights and attendance analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This semester</option>
            </select>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
                <div className={`flex items-center ${kpi.color}`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`ml-2 text-sm ${kpi.color}`}>{kpi.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Charts Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Rate Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Rate - Last 30 Days</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Line chart showing attendance trends</p>
                </div>
              </div>
            </div>

            {/* Class Comparison Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Attendance Comparison</h2>
              <div className="space-y-4">
                {['Data Structures', 'Computer Networks', 'Database Systems', 'Software Engineering'].map((subject, index) => {
                  const percentage = [95, 87, 92, 89][index];
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700">{subject}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-gray-900">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Students Below Attendance Threshold</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {riskStudents.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.roll}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {student.attendance}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Sparkline data={student.trend} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Rail */}
          <div className="space-y-6">
            {/* Live Camera Thumbnails */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Camera Feeds</h3>
              <div className="space-y-4">
                {['Room 101', 'Room 203', 'Room 105'].map((room, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <Camera className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{room}</p>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                        <span className="text-xs text-green-600">Live</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Face Matches */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Face Matches</h3>
              <div className="space-y-4">
                {liveMatches.map((match, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{match.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{match.confidence}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{match.time}</span>
                      </div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Camera Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    <span className="text-sm text-green-600">15/16 Online</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Load</span>
                  <span className="text-sm text-gray-900">23%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm text-gray-900">2 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;