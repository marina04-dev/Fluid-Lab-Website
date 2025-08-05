const mongoose = require('mongoose');
const User = require('../models/User');
const Content = require('../models/Content');
const TeamMember = require('../models/TeamMember');
const Project = require('../models/Project');
const Publication = require('../models/Publication');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Content.deleteMany({});
        await TeamMember.deleteMany({});
        await Project.deleteMany({});
        await Publication.deleteMany({});
        
        console.log('Cleared existing data');

        // Create admin user
        const admin = new User({
            username: 'admin',
            email: 'admin@fluidlab.com',
            password: 'admin123456',
            role: 'admin'
        });
        await admin.save();
        console.log('Created admin user');

        // Create sample content
        const contentItems = [
            {
                key: 'hero-title',
                title: 'Hero Title',
                content: 'Advanced Fluid Mechanics Research',
                type: 'text',
                section: 'hero'
            },
            {
                key: 'hero-subtitle',
                title: 'Hero Subtitle',
                content: 'Leading the Future of Fluid Dynamics',
                type: 'text',
                section: 'hero'
            },
            {
                key: 'hero-description',
                title: 'Hero Description',
                content: 'Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer, including Magnetohydrodynamics, Turbomachinery, Bioengineering, and more.',
                type: 'text',
                section: 'hero'
            },
            {
                key: 'about-title',
                title: 'About Title',
                content: 'About Our Research',
                type: 'text',
                section: 'about'
            },
            {
                key: 'about-content',
                title: 'About Content',
                content: 'We specialize in cutting-edge research in fluid mechanics, combining theoretical knowledge with practical applications. Our team collaborates with industry leaders and academic institutions worldwide to solve complex fluid dynamics challenges.',
                type: 'text',
                section: 'about'
            }
        ];

        await Content.insertMany(contentItems);
        console.log('Created sample content');

        // Create sample team member
        const teamMember = new TeamMember({
            name: 'Dr. John Smith',
            position: 'Principal Investigator',
            bio: 'Dr. Smith leads our fluid mechanics research with over 15 years of experience in computational fluid dynamics and experimental methods.',
            email: 'j.smith@fluidlab.com',
            expertise: ['Computational Fluid Dynamics', 'Turbulence Modeling', 'Heat Transfer'],
            socialLinks: {
                linkedin: 'https://linkedin.com/in/johnsmith',
                googleScholar: 'https://scholar.google.com/citations?user=example'
            },
            order: 1
        });
        await teamMember.save();
        console.log('Created sample team member');

        // Create sample project
        const project = new Project({
            title: 'Advanced Turbulence Modeling',
            description: 'Development of novel turbulence models for high Reynolds number flows',
            fullDescription: 'This project focuses on developing and validating advanced turbulence models that can accurately predict complex flow phenomena in industrial applications.',
            category: 'turbulence',
            status: 'active',
            startDate: new Date('2024-01-01'),
            teamMembers: [teamMember._id],
            tags: ['CFD', 'Turbulence', 'Modeling'],
            isFeatured: true
        });
        await project.save();
        console.log('Created sample project');

        // Create sample publication
        const publication = new Publication({
            title: 'Novel Approaches to Turbulence Modeling in Complex Geometries',
            authors: ['John Smith', 'Jane Doe', 'Bob Johnson'],
            journal: 'Journal of Fluid Mechanics',
            year: 2024,
            volume: '950',
            pages: '123-145',
            doi: '10.1017/jfm.2024.123',
            abstract: 'This paper presents novel approaches to turbulence modeling in complex geometries...',
            type: 'journal',
            tags: ['Turbulence', 'CFD', 'Complex Geometry'],
            projects: [project._id]
        });
        await publication.save();
        console.log('Created sample publication');

        console.log('✅ Database seeded successfully!');
        console.log('\nLogin credentials:');
        console.log('Email: admin@fluidlab.com');
        console.log('Password: admin123456');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();