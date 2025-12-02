const express = require('express');
const Slot = require('../models/Slot');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Create Slot (Admin)
router.post('/create', protect, admin, async (req, res) => {
    const { date, time, capacity, description } = req.body;
    try {
        const slot = await Slot.create({ date, time, capacity, description });
        res.status(201).json(slot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Slots
router.get('/all', async (req, res) => {
    try {
        const slots = await Slot.find({});
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Slot (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (slot) {
            await slot.deleteOne();
            res.json({ message: 'Slot removed' });
        } else {
            res.status(404).json({ message: 'Slot not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
