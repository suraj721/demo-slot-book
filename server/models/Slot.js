const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:MM
    capacity: { type: Number, required: true },
    bookedCount: { type: Number, default: 0 },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
