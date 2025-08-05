const express = require('express');
const { body, validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route POST /api/contact
// @desc Submit contact message
// @access Public
router.post('/', [
        body('name').notEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('subject').notEmpty().trim().escape(),
        body('message').notEmpty().trim().escape()
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, subject, message } = req.body;

        const contactMessage = new ContactMessage({
            name,
            email,
            subject,
            message
        });

        await contactMessage.save();

        res.status(201).json({
            message: 'Your message has been sent successfully. We will get back to you soon!'
        });
    } catch (error) {
        console.error('Contact message error:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again.' });
    }
});

// @route GET /api/contact/messages
// @desc Get all contact messages
// @access Private (admin/editor)
router.get('/messages', [auth, authorize('admin', 'editor')], async (req, res) => {
    try {
        const { isRead, page = 1, limit = 10 } = req.query;
        
        let query = {};
        if (isRead !== undefined) query.isRead = isRead === 'true';

        const messages = await ContactMessage.find(query)
            .populate('respondedBy', 'username')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await ContactMessage.countDocuments(query);

        res.json({
            messages,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get contact messages error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/contact/messages/:id/read
// @desc Mark message as read
// @access Private (admin/editor)
router.put('/messages/:id/read', [auth, authorize('admin', 'editor')], async (req, res) => {
    try {
        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({ message: 'Message marked as read' });
    } catch (error) {
        console.error('Mark message read error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/contact/messages/:id/respond
// @desc Respond to message
// @access Private (admin/editor)
router.put('/messages/:id/respond', [
        auth,
        authorize('admin', 'editor'),
        body('response').notEmpty().trim()
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { response } = req.body;

        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            {
                response,
                respondedAt: new Date(),
                respondedBy: req.user._id,
                isRead: true
            },
            { new: true }
            ).populate('respondedBy', 'username');

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({
            message: 'Response saved successfully',
            contactMessage: message
        });
    } catch (error) {
        console.error('Respond to message error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;