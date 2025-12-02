const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
    bookingTime: { type: Date, default: Date.now },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
