import React, { useEffect, useState } from 'react';
import API from '../api';
import { FaPlus, FaTrash, FaCalendarPlus, FaListAlt, FaUsers } from 'react-icons/fa';

const AdminPanel = () => {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: '', time: '', capacity: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('slots'); // 'slots' or 'bookings'

  const fetchData = async () => {
    try {
      const [slotsRes, bookingsRes] = await Promise.all([
        API.get('/slots/all'),
        API.get('/bookings/admin')
      ]);
      setSlots(slotsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    try {
      await API.post('/slots/create', newSlot);
      setMessage('Slot created successfully!');
      setNewSlot({ date: '', time: '', capacity: '', description: '' });
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create slot');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm('Are you sure? This will delete the slot and might affect bookings.')) return;
    try {
      await API.delete(`/slots/${id}`);
      setMessage('Slot deleted successfully!');
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete slot');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
        <div className="flex bg-slate-100 p-1 rounded-lg mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab('slots')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'slots' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Manage Slots
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'bookings' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All Bookings
          </button>
        </div>
      </div>

      {message && <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200">{message}</div>}
      {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">{error}</div>}

      {activeTab === 'slots' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Slot Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FaCalendarPlus className="text-indigo-600" />
                Create New Slot
              </h2>
              <form onSubmit={handleCreateSlot} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={newSlot.capacity}
                    onChange={(e) => setNewSlot({ ...newSlot, capacity: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    rows="3"
                    value={newSlot.description}
                    onChange={(e) => setNewSlot({ ...newSlot, description: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <FaPlus /> Create Slot
                </button>
              </form>
            </div>
          </div>

          {/* Slots List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <FaListAlt className="text-indigo-600" />
                  Existing Slots
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {slots.map((slot) => (
                    <div key={slot._id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 transition-colors">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-bold text-slate-900 text-lg">{slot.date}</p>
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-sm font-medium">{slot.time}</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{slot.description}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          Capacity: <span className="font-medium text-slate-700">{slot.bookedCount}/{slot.capacity}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteSlot(slot._id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Slot"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaUsers className="text-indigo-600" />
              All Bookings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Slot Date</th>
                  <th className="px-6 py-4">Slot Time</th>
                  <th className="px-6 py-4">Booked On</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No bookings found.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{booking.userId?.name}</div>
                        <div className="text-xs text-slate-500">{booking.userId?.email}</div>
                      </td>
                      <td className="px-6 py-4 font-medium">{booking.slotId?.date}</td>
                      <td className="px-6 py-4 text-indigo-600 font-medium">{booking.slotId?.time}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(booking.bookingTime).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Confirmed</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
