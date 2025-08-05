const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: [
        'magnetohydrodynamics',
        'turbomachinery', 
        'bioengineering',
        'thermal-analysis',
        'turbulence',
        'multiphase-flow',
        'industrial-applications',
        'environmental-applications',
        'fluid-structure-interaction'
        ]
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'planned'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember'
    }],
    images: [{
        url: String,
        caption: String
    }],
    tags: [{
        type: String,
        trim: true
    }],
    publications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
