import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentPortal from './pages/StudentPortal';
import StaffPortal from './pages/StaffPortal';
import AdminPortal from './pages/AdminPortal';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      
      {user ? (
        <>
          {user.role === 'student' && (
            <Route path="/student/*" element={<StudentPortal />} />
          )}
          {user.role === 'staff' && (
            <Route path="/staff/*" element={<StaffPortal />} />
          )}
          {user.role === 'admin' && (
            <>
              <Route path="/admin/*" element={<AdminPortal />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </>
          )}
          <Route path="*" element={<Navigate to={`/${user.role}`} replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/auth" replace />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;