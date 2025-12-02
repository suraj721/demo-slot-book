import React, { useEffect, useState } from 'react';
import API from '../api';
import { FaCalendarAlt, FaClock, FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [slotsRes, bookingsRes] = await Promise.all([
        API.get('/slots/all'),
        API.get('/bookings/user')
      ]);
      setSlots(slotsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBook = async (slotId) => {
    try {
      await API.post(`/bookings/${slotId}/book`);
      setMessage('Slot booked successfully!');
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.delete(`/bookings/${bookingId}/cancel`);
      setMessage('Booking cancelled successfully!');
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Cancellation failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>
      
      {message && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6 animate-fade-in">
          <div className="flex">
            <FaCheckCircle className="text-green-500 mt-1 mr-3" />
            <p className="text-sm text-green-700">{message}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 animate-fade-in">
          <div className="flex">
            <FaTimesCircle className="text-red-500 mt-1 mr-3" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Available Slots Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-600" />
                Available Slots
              </h2>
            </div>
            <div className="p-6">
              {slots.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FaInfoCircle className="mx-auto text-4xl mb-4 text-slate-300" />
                  <p>No slots available at the moment.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {slots.map((slot) => {
                    const isFull = slot.bookedCount >= slot.capacity;
                    return (
                      <div key={slot._id} className={`relative group p-5 rounded-xl border transition-all ${isFull ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-slate-900">{slot.date}</p>
                            <p className="text-indigo-600 font-medium flex items-center gap-1 text-sm mt-1">
                              <FaClock className="text-xs" /> {slot.time}
                            </p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {isFull ? 'Full' : 'Available'}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{slot.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <p className="text-xs text-slate-500">
                            <span className="font-medium text-slate-700">{slot.bookedCount}</span> / {slot.capacity} booked
                          </p>
                          <button
                            onClick={() => handleBook(slot._id)}
                            disabled={isFull}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isFull
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow'
                            }`}
                          >
                            {isFull ? 'Full' : 'Book Now'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* My Bookings Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                My Bookings
              </h2>
            </div>
            <div className="p-6">
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p>You haven't booked any slots yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-slate-900">{booking.slotId?.date}</p>
                          <p className="text-indigo-600 text-sm font-medium">{booking.slotId?.time}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Confirmed
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">
                        Booked on {new Date(booking.bookingTime).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="w-full py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
