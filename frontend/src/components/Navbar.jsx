import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, FileText, BarChart3, Brain } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FileText className="h-8 w-8" />
              <span className="text-xl font-bold">Smart Complaint System</span>
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 hover:text-primary-200 transition"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Complaints</span>
              </Link>
              <Link
                to="/complaint/new"
                className="flex items-center space-x-1 hover:text-primary-200 transition"
              >
                <FileText className="h-5 w-5" />
                <span>New Complaint</span>
              </Link>
              <Link
                to="/ai/analysis"
                className="flex items-center space-x-1 hover:text-primary-200 transition"
              >
                <Brain className="h-5 w-5" />
                <span>AI Analysis</span>
              </Link>
              <div className="flex items-center space-x-2 border-l border-primary-400 pl-4">
                <span className="text-sm">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-primary-200 transition"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
