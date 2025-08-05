const express = require('express');
const { uploadImage, uploadDocument, handleUploadError } = require('../middleware/upload');
const { auth, authorize } = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// @route POST /api/upload/image
// @desc Upload image file
// @access Private (editor/admin)
router.post('/image', [
        auth,
        authorize('editor', 'admin'),
        uploadImage.single('image'),
        handleUploadError
    ], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        
        res.json({
            message: 'Image uploaded successfully',
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                url: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

// @route POST /api/upload/document
// @desc Upload document file
// @access Private (editor/admin)
router.post('/document', [
        auth,
        authorize('editor', 'admin'),
        uploadDocument.single('document'),
        handleUploadError
    ], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        
        res.json({
            message: 'Document uploaded successfully',
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                url: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ message: 'Error uploading document' });
    }
});

// @route DELETE /api/upload/:filename
// @desc Delete uploaded file
// @access Private (admin only)
router.delete('/:filename', [auth, authorize('admin')], async (req, res) => {
    try {
        const { filename } = req.params;
        
        // Find file in upload directories
        const possiblePaths = [
            `uploads/team/${filename}`,
            `uploads/projects/${filename}`,
            `uploads/publications/${filename}`,
            `uploads/general/${filename}`
        ];
        
        let filePath = null;
        for (const possiblePath of possiblePaths) {
            if (fs.existsSync(possiblePath)) {
                filePath = possiblePath;
                break;
            }
        }
        
        if (!filePath) {
            return res.status(404).json({ message: 'File not found' });
        }
        
        fs.unlinkSync(filePath);
        
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('File deletion error:', error);
        res.status(500).json({ message: 'Error deleting file' });
    }
});

// @route GET /api/upload/files
// @desc Get list of uploaded files
// @access Private (editor/admin)
router.get('/files', [auth, authorize('editor', 'admin')], async (req, res) => {
    try {
        const { type } = req.query; // 'team', 'projects', 'publications', 'general'
        
        let uploadDir = 'uploads/';
        if (type) {
            uploadDir += `${type}/`;
        }
        
        if (!fs.existsSync(uploadDir)) {
            return res.json({ files: [] });
        }
        
        const files = fs.readdirSync(uploadDir, { withFileTypes: true })
            .filter(dirent => dirent.isFile())
            .map(dirent => {
                const filePath = path.join(uploadDir, dirent.name);
                const stats = fs.statSync(filePath);
                
                return {
                    filename: dirent.name,
                    path: filePath,
                    url: `${req.protocol}://${req.get('host')}/${filePath}`,
                    size: stats.size,
                    createdAt: stats.birthtime,
                    modifiedAt: stats.mtime
                };
        });
        
        res.json({ files });
    } catch (error) {
        console.error('Get files error:', error);
        res.status(500).json({ message: 'Error retrieving files' });
    }
});

module.exports = router;
