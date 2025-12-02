const express = require('express');
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Book a Slot
router.post('/:id/book', protect, async (req, res) => {
    const slotId = req.params.id;
    const userId = req.user._id;

    try {
        const slot = await Slot.findById(slotId);
        if (!slot) return res.status(404).json({ message: 'Slot not found' });

        if (slot.capacity <= slot.bookedCount) {
            return res.status(400).json({ message: 'Slot is full' });
        }

        // Check if user already booked this slot
        const existingBooking = await Booking.findOne({ userId, slotId, status: 'confirmed' });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this slot' });
        }

        // Check if user booked another slot on the same day
        // This requires finding all bookings for the user and checking the slot date
        // For simplicity, let's assume we just check if they have a booking for this specific slot ID for now, 
        // or we can fetch the slot details for all user bookings.
        // Requirement: "one slot per user per day"

        const userBookings = await Booking.find({ userId, status: 'confirmed' }).populate('slotId');
        const hasBookingOnSameDay = userBookings.some(booking => booking.slotId.date === slot.date);

        if (hasBookingOnSameDay) {
            return res.status(400).json({ message: 'You can only book one slot per day' });
        }

        const booking = await Booking.create({ userId, slotId });

        slot.bookedCount += 1;
        await slot.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User Bookings
router.get('/user', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('slotId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Bookings (Admin)
router.get('/admin', protect, admin, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('userId', 'name email').populate('slotId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cancel Booking
router.delete('/:id/cancel', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const slot = await Slot.findById(booking.slotId);
        if (slot) {
            slot.bookedCount = Math.max(0, slot.bookedCount - 1);
            await slot.save();
        }

        await booking.deleteOne();
        res.json({ message: 'Booking cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
