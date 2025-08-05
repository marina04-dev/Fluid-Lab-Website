const express = require('express');
const { body, validationResult } = require('express-validator');
const Publication = require('../models/Publication');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route GET /api/publications
// @desc Get all active publications
// @access Public
router.get('/', async (req, res) => {
    try {
        const { year, type, author } = req.query;
        
        let query = { isActive: true };
        if (year) query.year = parseInt(year);
        if (type) query.type = type;
        if (author) {
            query.authors = { $regex: author, $options: 'i' };
        }

        const publications = await Publication.find(query)
            .populate('projects', 'title category')
            .sort({ year: -1, createdAt: -1 });
        
        res.json(publications);
    } catch (error) {
        console.error('Get publications error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/publications/:id
// @desc Get publication by ID
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id)
            .populate('projects', 'title description category');
        
        if (!publication || !publication.isActive) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        
        res.json(publication);
    } catch (error) {
        console.error('Get publication error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/publications
// @desc Create new publication
// @access Private (admin/editor)
router.post('/', [
        auth,
        authorize('admin', 'editor'),
        body('title').notEmpty().trim(),
        body('authors').isArray({ min: 1 }),
        body('year').isInt({ min: 1900, max: new Date().getFullYear() + 5 }),
        body('type').optional().isIn(['journal', 'conference', 'book', 'thesis', 'preprint'])
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const publication = new Publication(req.body);
        await publication.save();

        const populatedPublication = await Publication.findById(publication._id)
            .populate('projects', 'title category');

        res.status(201).json({
            message: 'Publication created successfully',
            publication: populatedPublication
        });
    } catch (error) {
        console.error('Create publication error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/publications/:id
// @desc Update publication
// @access Private (admin/editor)
router.put('/:id', [auth, authorize('admin', 'editor')], async (req, res) => {
    try {
        const publication = await Publication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
            ).populate('projects', 'title category');

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        res.json({
            message: 'Publication updated successfully',
            publication
        });
    } catch (error) {
        console.error('Update publication error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route DELETE /api/publications/:id
// @desc Delete publication (soft delete)
// @access Private (admin only)
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
    try {
        const publication = await Publication.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        res.json({ message: 'Publication deleted successfully' });
    } catch (error) {
        console.error('Delete publication error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;