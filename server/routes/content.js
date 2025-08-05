const express = require('express');
const { body, validationResult } = require('express-validator');
const Content = require('../models/Content');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route GET /api/content
// @desc Get all active content
// @access Public
router.get('/', async (req, res) => {
    try {
        const { section, key } = req.query;
        
        let query = { isActive: true };
        if (section) query.section = section;
        if (key) query.key = key;

        const content = await Content.find(query).sort({ createdAt: -1 });
        
        // If requesting a specific key, return single item
        if (key && content.length > 0) {
            return res.json(content[0]);
        }
        
        res.json(content);
    } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/content/:id
// @desc Get content by ID
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        
        res.json(content);
    } catch (error) {
        console.error('Get content by ID error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/content
// @desc Create new content
// @access Private (admin/editor)
router.post('/', [ auth,
        authorize('admin', 'editor'),
        body('key').notEmpty().trim().escape(),
        body('title').notEmpty().trim(),
        body('content').notEmpty(),
        body('section').isIn(['hero', 'about', 'services', 'footer', 'general'])
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { key, title, content, type, section, metadata } = req.body;

        // Check if content with this key already exists
        const existingContent = await Content.findOne({ key });
        if (existingContent) {
            return res.status(400).json({ 
                message: 'Content with this key already exists' 
            });
        }

        const newContent = new Content({
            key,
            title,
            content,
            type: type || 'text',
            section,
            metadata: metadata || {}
        });

        await newContent.save();

        res.status(201).json({
            message: 'Content created successfully',
            content: newContent
        });
    } catch (error) {
        console.error('Create content error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/content/:id
// @desc Update content
// @access Private (admin/editor)
router.put('/:id', [ auth,
        authorize('admin', 'editor'),
        body('title').optional().trim(),
        body('content').optional(),
        body('section').optional().isIn(['hero', 'about', 'services', 'footer', 'general'])
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, type, section, metadata, isActive } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (type !== undefined) updateData.type = type;
        if (section !== undefined) updateData.section = section;
        if (metadata !== undefined) updateData.metadata = metadata;
        if (isActive !== undefined) updateData.isActive = isActive;

        const updatedContent = await Content.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.json({
            message: 'Content updated successfully',
            content: updatedContent
        });
    } catch (error) {
        console.error('Update content error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route DELETE /api/content/:id
// @desc Delete content (soft delete)
// @access Private (admin only)
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
    try {
        const content = await Content.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Delete content error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/content/admin/all
// @desc Get all content including inactive (admin view)
// @access Private (admin/editor)
router.get('/admin/all', [auth, authorize('admin', 'editor')], async (req, res) => {
    try {
        const content = await Content.find({}).sort({ createdAt: -1 });
        res.json(content);
    } catch (error) {
        console.error('Get all content error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
