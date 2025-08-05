const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    image: {
        type: String, // URL to image
        default: null
    },
    expertise: [{
        type: String,
        trim: true
    }],
    socialLinks: {
        linkedin: String,
        twitter: String,
        researchGate: String,
        orcid: String,
        googleScholar: String
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
