import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaClock, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Booking made <span className="text-indigo-600">effortless</span>.
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Streamline your scheduling with our premium slot booking system. 
            Manage appointments, view real-time availability, and secure your spot in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1">
              Book a Slot Now
            </Link>
            <Link to="/signup" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all hover:border-slate-300">
              Create Account
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                <FaCalendarCheck />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Booking</h3>
              <p className="text-slate-600">
                Book your preferred slots instantly with real-time availability updates. No more double bookings.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Availability</h3>
              <p className="text-slate-600">
                Access the system anytime, anywhere. Manage your schedule on your own terms.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-16 h-16 bg-fuchsia-100 text-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Reliable</h3>
              <p className="text-slate-600">
                Your data is safe with us. Built with modern security standards and JWT authentication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
