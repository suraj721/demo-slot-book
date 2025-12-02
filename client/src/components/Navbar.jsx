import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              SlotBooker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Dashboard</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Admin Panel</Link>
                )}
                <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaUserCircle className="text-2xl text-slate-400" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-indigo-600 focus:outline-none">
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Home</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Dashboard</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Admin Panel</Link>
              )}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-3 mb-3">
                  <FaUserCircle className="text-2xl text-slate-400" />
                  <span className="font-medium text-slate-700">{user.name}</span>
                </div>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }} 
                  className="w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
              <Link to="/login" className="block w-full text-center px-4 py-2 text-slate-700 font-medium hover:bg-slate-50 rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="block w-full text-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
