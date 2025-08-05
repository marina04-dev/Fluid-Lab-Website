const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route GET /api/projects
// @desc Get all active projects
// @access Public
router.get('/', async (req, res) => {
    try {
        const { category, status, featured } = req.query;
        
        let query = { isActive: true };
        if (category) query.category = category;
        if (status) query.status = status;
        if (featured === 'true') query.isFeatured = true;

        const projects = await Project.find(query)
            .populate('teamMembers', 'name position image')
            .populate('publications', 'title authors year journal')
            .sort({ isFeatured: -1, createdAt: -1 });
        
        res.json(projects);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/projects/:id
// @desc Get project by ID
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('teamMembers', 'name position image email expertise')
            .populate('publications');
        
        if (!project || !project.isActive) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/projects
// @desc Create new project
// @access Private (admin/editor)
router.post('/', [
        auth,
        authorize('admin', 'editor'),
        body('title').notEmpty().trim(),
        body('description').notEmpty().trim(),
        body('category').isIn([
            'magnetohydrodynamics', 'turbomachinery', 'bioengineering',
            'thermal-analysis', 'turbulence', 'multiphase-flow',
            'industrial-applications', 'environmental-applications',
            'fluid-structure-interaction'
        ]),
        body('startDate').isISO8601()
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const project = new Project(req.body);
        await project.save();

        const populatedProject = await Project.findById(project._id)
            .populate('teamMembers', 'name position image')
            .populate('publications', 'title authors year');

        res.status(201).json({
            message: 'Project created successfully',
            project: populatedProject
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/projects/:id
// @desc Update project
// @access Private (admin/editor)
router.put('/:id', [auth, authorize('admin', 'editor')], async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
            ).populate('teamMembers', 'name position image')
            .populate('publications', 'title authors year');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({
            message: 'Project updated successfully',
            project
        });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route DELETE /api/projects/:id
// @desc Delete project (soft delete)
// @access Private (admin only)
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;