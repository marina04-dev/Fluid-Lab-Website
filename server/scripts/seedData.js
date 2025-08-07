// server/scripts/seedData.js - COMPLETE VERSION με όλα τα δεδομένα
const mongoose = require("mongoose");
const User = require("../models/User");
const Content = require("../models/Content");
const TeamMember = require("../models/TeamMember");
const Project = require("../models/Project");
const Publication = require("../models/Publication");
const ContactMessage = require("../models/ContactMessage");
require("dotenv").config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔗 Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});
    await TeamMember.deleteMany({});
    await Project.deleteMany({});
    await Publication.deleteMany({});
    await ContactMessage.deleteMany({});

    console.log("🧹 Cleared existing data");

    // Create admin user
    const admin = new User({
      username: "admin",
      email: "admin@fluidlab.com",
      password: "admin123456",
      role: "admin",
    });
    await admin.save();
    console.log("👤 Created admin user");

    // Create editor user
    const editor = new User({
      username: "editor",
      email: "editor@fluidlab.com",
      password: "editor123456",
      role: "editor",
    });
    await editor.save();
    console.log("👤 Created editor user");

    // Create comprehensive content items
    const contentItems = [
      // Hero Section
      {
        key: "hero-title",
        title: "Hero Title",
        content: "Advanced Fluid Mechanics Research",
        type: "text",
        section: "hero",
      },
      {
        key: "hero-subtitle",
        title: "Hero Subtitle",
        content: "Leading the Future of Fluid Dynamics",
        type: "text",
        section: "hero",
      },
      {
        key: "hero-description",
        title: "Hero Description",
        content:
          "Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer, including Magnetohydrodynamics, Turbomachinery, Bioengineering, and more.",
        type: "text",
        section: "hero",
      },

      // About Section
      {
        key: "about-title",
        title: "About Title",
        content: "About Our Research",
        type: "text",
        section: "about",
      },
      {
        key: "about-description",
        title: "About Description",
        content:
          "We specialize in cutting-edge research in fluid mechanics, combining theoretical knowledge with practical applications. Our team collaborates with industry leaders and academic institutions worldwide to solve complex fluid dynamics challenges.",
        type: "text",
        section: "about",
      },
      {
        key: "about-mission",
        title: "About Mission",
        content:
          "Our mission is to advance the understanding of fluid mechanics through innovative research and to provide solutions that benefit society and industry.",
        type: "text",
        section: "about",
      },
      {
        key: "about-vision",
        title: "About Vision",
        content:
          "To be a leading research center that bridges the gap between fundamental fluid mechanics research and practical engineering solutions.",
        type: "text",
        section: "about",
      },

      // Services Section
      {
        key: "services-title",
        title: "Services Title",
        content: "Our Services",
        type: "text",
        section: "services",
      },
      {
        key: "services-subtitle",
        title: "Services Subtitle",
        content:
          "Comprehensive fluid mechanics solutions for research and industry",
        type: "text",
        section: "services",
      },

      // Footer Section
      {
        key: "footer-description",
        title: "Footer Description",
        content:
          "Leading research in fluid mechanics and computational fluid dynamics. Advancing the future of flow analysis and simulation.",
        type: "text",
        section: "footer",
      },
      {
        key: "footer-copyright",
        title: "Footer Copyright",
        content: "© 2024 Fluid Mechanics Research Lab. All rights reserved.",
        type: "text",
        section: "footer",
      },

      // Contact Section
      {
        key: "contact-title",
        title: "Contact Title",
        content: "Get In Touch",
        type: "text",
        section: "general",
      },
      {
        key: "contact-subtitle",
        title: "Contact Subtitle",
        content: "Ready to collaborate or have questions about our research?",
        type: "text",
        section: "general",
      },
      {
        key: "contact-address",
        title: "Contact Address",
        content:
          "Department of Mechanical Engineering\nUniversity Campus\nAthens, Greece 15773",
        type: "text",
        section: "general",
      },
      {
        key: "contact-phone",
        title: "Contact Phone",
        content: "+30 210 123 4567",
        type: "text",
        section: "general",
      },
      {
        key: "contact-email",
        title: "Contact Email",
        content: "info@fluidlab.com",
        type: "text",
        section: "general",
      },

      // Team Section
      {
        key: "team-title",
        title: "Team Title",
        content: "Our Research Team",
        type: "text",
        section: "general",
      },
      {
        key: "team-subtitle",
        title: "Team Subtitle",
        content:
          "Meet the experts driving innovation in fluid mechanics research",
        type: "text",
        section: "general",
      },
    ];

    await Content.insertMany(contentItems);
    console.log("📝 Created comprehensive content items");

    // Create team members
    const teamMembers = [
      {
        name: "Dr. John Smith",
        position: "Principal Investigator",
        bio: "Dr. Smith leads our fluid mechanics research with over 15 years of experience in computational fluid dynamics and experimental methods. His work focuses on turbulence modeling and heat transfer applications.",
        email: "j.smith@fluidlab.com",
        phone: "+30 210 123 4501",
        expertise: [
          "Computational Fluid Dynamics",
          "Turbulence Modeling",
          "Heat Transfer",
          "Experimental Methods",
        ],
        socialLinks: {
          linkedin: "https://linkedin.com/in/johnsmith-fluid",
          googleScholar: "https://scholar.google.com/citations?user=example1",
          orcid: "https://orcid.org/0000-0000-0000-0001",
          researchGate: "https://researchgate.net/profile/John-Smith",
        },
        order: 1,
      },
      {
        name: "Dr. Maria Rodriguez",
        position: "Senior Research Scientist",
        bio: "Dr. Rodriguez specializes in magnetohydrodynamics and plasma physics applications. She has contributed significantly to the understanding of MHD flows in industrial applications.",
        email: "m.rodriguez@fluidlab.com",
        phone: "+30 210 123 4502",
        expertise: [
          "Magnetohydrodynamics",
          "Plasma Physics",
          "Industrial Applications",
          "Numerical Simulation",
        ],
        socialLinks: {
          linkedin: "https://linkedin.com/in/maria-rodriguez-mhd",
          googleScholar: "https://scholar.google.com/citations?user=example2",
          orcid: "https://orcid.org/0000-0000-0000-0002",
        },
        order: 2,
      },
      {
        name: "Dr. Andreas Papadopoulos",
        position: "Research Associate",
        bio: "Dr. Papadopoulos focuses on bioengineering applications of fluid mechanics, particularly in cardiovascular flows and drug delivery systems.",
        email: "a.papadopoulos@fluidlab.com",
        phone: "+30 210 123 4503",
        expertise: [
          "Bioengineering",
          "Cardiovascular Flows",
          "Drug Delivery",
          "Micro-fluidics",
        ],
        socialLinks: {
          linkedin: "https://linkedin.com/in/andreas-papadopoulos-bio",
          googleScholar: "https://scholar.google.com/citations?user=example3",
        },
        order: 3,
      },
      {
        name: "Dr. Elena Komnenos",
        position: "Postdoctoral Researcher",
        bio: "Dr. Komnenos works on multiphase flow phenomena and their applications in environmental engineering and industrial processes.",
        email: "e.komnenos@fluidlab.com",
        expertise: [
          "Multiphase Flow",
          "Environmental Engineering",
          "Industrial Processes",
          "Flow Visualization",
        ],
        socialLinks: {
          googleScholar: "https://scholar.google.com/citations?user=example4",
          orcid: "https://orcid.org/0000-0000-0000-0004",
        },
        order: 4,
      },
    ];

    const savedTeamMembers = await TeamMember.insertMany(teamMembers);
    console.log("👥 Created team members");

    // Create projects
    const projects = [
      {
        title: "Advanced Turbulence Modeling in Complex Geometries",
        description:
          "Development of novel turbulence models for high Reynolds number flows in complex industrial geometries",
        fullDescription:
          "This project focuses on developing and validating advanced turbulence models that can accurately predict complex flow phenomena in industrial applications. We use both computational and experimental approaches to understand turbulence behavior in complex geometries such as turbomachinery, heat exchangers, and automotive applications.",
        category: "turbulence",
        status: "active",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-12-31"),
        teamMembers: [savedTeamMembers[0]._id, savedTeamMembers[3]._id],
        tags: ["CFD", "Turbulence", "Modeling", "Industrial Applications"],
        isFeatured: true,
      },
      {
        title: "Magnetohydrodynamic Flow Control Systems",
        description:
          "Investigation of MHD flow control techniques for plasma processing and materials manufacturing",
        fullDescription:
          "Research on the application of magnetic fields to control electrically conducting fluid flows. Applications include plasma processing, liquid metal cooling systems, and advanced materials manufacturing processes.",
        category: "magnetohydrodynamics",
        status: "active",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2025-05-31"),
        teamMembers: [savedTeamMembers[1]._id],
        tags: ["MHD", "Plasma", "Flow Control", "Manufacturing"],
        isFeatured: true,
      },
      {
        title: "Bioengineering Applications in Drug Delivery",
        description:
          "Microfluidic systems for targeted drug delivery and medical diagnostics",
        fullDescription:
          "Development of microfluidic devices for precise drug delivery and point-of-care diagnostics. The project combines fluid mechanics principles with biomedical applications to create innovative healthcare solutions.",
        category: "bioengineering",
        status: "active",
        startDate: new Date("2023-09-01"),
        endDate: new Date("2025-08-31"),
        teamMembers: [savedTeamMembers[2]._id],
        tags: [
          "Microfluidics",
          "Drug Delivery",
          "Medical Devices",
          "Healthcare",
        ],
        isFeatured: false,
      },
      {
        title: "Thermal Management in Electronic Systems",
        description:
          "Advanced cooling solutions for high-performance electronic components",
        fullDescription:
          "Research on innovative thermal management strategies for electronic systems, including liquid cooling, heat pipes, and advanced heat exchanger designs.",
        category: "thermal-analysis",
        status: "completed",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2023-12-31"),
        teamMembers: [savedTeamMembers[0]._id, savedTeamMembers[3]._id],
        tags: ["Heat Transfer", "Electronics", "Cooling", "Thermal Management"],
      },
      {
        title: "Environmental Flow Modeling",
        description:
          "Computational modeling of environmental flows for pollution control and ecosystem management",
        fullDescription:
          "Application of advanced CFD techniques to model environmental flows, including river systems, coastal flows, and atmospheric dispersion for environmental protection and management.",
        category: "environmental-applications",
        status: "planned",
        startDate: new Date("2024-07-01"),
        teamMembers: [savedTeamMembers[3]._id],
        tags: ["Environmental", "CFD", "Pollution Control", "Ecosystem"],
      },
    ];

    const savedProjects = await Project.insertMany(projects);
    console.log("🔬 Created research projects");

    // Create publications
    const publications = [
      {
        title: "Novel Approaches to Turbulence Modeling in Complex Geometries",
        authors: ["John Smith", "Elena Komnenos", "Robert Johnson"],
        journal: "Journal of Fluid Mechanics",
        year: 2024,
        volume: "950",
        issue: "A15",
        pages: "123-145",
        doi: "10.1017/jfm.2024.123",
        abstract:
          "This paper presents novel approaches to turbulence modeling in complex geometries, with particular focus on industrial applications. We develop new closure models that show improved accuracy compared to standard approaches.",
        type: "journal",
        tags: [
          "Turbulence",
          "CFD",
          "Complex Geometry",
          "Industrial Applications",
        ],
        projects: [savedProjects[0]._id],
      },
      {
        title: "Magnetohydrodynamic Flow Control in Industrial Applications",
        authors: ["Maria Rodriguez", "Andreas Papadopoulos"],
        journal: "Physics of Fluids",
        year: 2024,
        volume: "36",
        issue: "2",
        pages: "025101",
        doi: "10.1063/5.0187234",
        abstract:
          "Investigation of MHD flow control techniques for industrial plasma processing applications. The study demonstrates significant improvements in process efficiency through optimized magnetic field configurations.",
        type: "journal",
        tags: ["MHD", "Flow Control", "Industrial", "Plasma Processing"],
        projects: [savedProjects[1]._id],
      },
      {
        title: "Microfluidic Drug Delivery Systems: Design and Optimization",
        authors: ["Andreas Papadopoulos", "John Smith"],
        journal: "Lab on a Chip",
        year: 2023,
        volume: "23",
        issue: "18",
        pages: "4156-4168",
        doi: "10.1039/D3LC00445G",
        abstract:
          "Design and optimization of microfluidic systems for targeted drug delivery. The work presents novel device geometries that enable precise control of drug concentration and delivery timing.",
        type: "journal",
        tags: [
          "Microfluidics",
          "Drug Delivery",
          "Bioengineering",
          "Medical Devices",
        ],
        projects: [savedProjects[2]._id],
      },
      {
        title: "Advanced Heat Transfer in Electronic Cooling Applications",
        authors: ["John Smith", "Elena Komnenos", "Maria Rodriguez"],
        journal: "International Journal of Heat and Mass Transfer",
        year: 2023,
        volume: "215",
        pages: "124523",
        doi: "10.1016/j.ijheatmasstransfer.2023.124523",
        abstract:
          "Comprehensive study of advanced heat transfer mechanisms in electronic cooling applications, including novel heat exchanger designs and liquid cooling solutions.",
        type: "journal",
        tags: ["Heat Transfer", "Electronics", "Cooling", "Thermal Management"],
        projects: [savedProjects[3]._id],
      },
      {
        title: "Computational Fluid Dynamics in Environmental Applications",
        authors: ["Elena Komnenos", "Andreas Papadopoulos"],
        journal: "Environmental Fluid Mechanics",
        year: 2023,
        volume: "23",
        issue: "4",
        pages: "891-912",
        doi: "10.1007/s10652-023-09925-8",
        abstract:
          "Application of computational fluid dynamics to environmental flow problems, with focus on pollution dispersion and ecosystem modeling.",
        type: "journal",
        tags: ["CFD", "Environmental", "Pollution", "Modeling"],
        projects: [savedProjects[4]._id],
      },
      {
        title: "Recent Advances in Fluid Mechanics Research",
        authors: [
          "John Smith",
          "Maria Rodriguez",
          "Andreas Papadopoulos",
          "Elena Komnenos",
        ],
        journal:
          "Proceedings of the International Conference on Fluid Mechanics",
        year: 2023,
        pages: "245-252",
        abstract:
          "Review of recent advances in fluid mechanics research, covering computational methods, experimental techniques, and industrial applications.",
        type: "conference",
        tags: [
          "Review",
          "Fluid Mechanics",
          "Computational Methods",
          "Experimental",
        ],
      },
    ];

    const savedPublications = await Publication.insertMany(publications);
    console.log("📚 Created publications");

    // Create sample contact messages
    const contactMessages = [
      {
        name: "Dr. Michael Chen",
        email: "m.chen@university.edu",
        subject: "Collaboration Opportunity - Turbulence Research",
        message:
          "Dear Dr. Smith,\n\nI am writing to inquire about potential collaboration opportunities in turbulence modeling research. Our research group at Stanford University is working on similar problems and I believe there could be synergies between our work.\n\nI would love to discuss this further at your convenience.\n\nBest regards,\nMichael Chen",
        isRead: false,
      },
      {
        name: "Sarah Johnson",
        email: "s.johnson@techcorp.com",
        subject: "Consulting Services for Heat Exchanger Design",
        message:
          "Hello,\n\nWe are a technology company working on optimizing heat exchangers for our data centers. We would like to inquire about your consulting services for thermal management solutions.\n\nPlease let us know your availability and rates.\n\nBest regards,\nSarah Johnson\nTechCorp Inc.",
        isRead: true,
      },
      {
        name: "Prof. Alexandra Dimitriou",
        email: "a.dimitriou@ntua.gr",
        subject: "Research Collaboration Proposal",
        message:
          "Dear Colleagues,\n\nI am a professor at NTUA working on environmental fluid mechanics. I would like to propose a collaboration on coastal flow modeling for our upcoming EU project.\n\nPlease let me know if you would be interested in discussing this opportunity.\n\nBest regards,\nAlexandra Dimitriou",
        isRead: false,
      },
    ];

    await ContactMessage.insertMany(contactMessages);
    console.log("💬 Created sample contact messages");

    // Update projects with publications
    await Project.findByIdAndUpdate(savedProjects[0]._id, {
      publications: [savedPublications[0]._id],
    });
    await Project.findByIdAndUpdate(savedProjects[1]._id, {
      publications: [savedPublications[1]._id],
    });
    await Project.findByIdAndUpdate(savedProjects[2]._id, {
      publications: [savedPublications[2]._id],
    });
    await Project.findByIdAndUpdate(savedProjects[3]._id, {
      publications: [savedPublications[3]._id],
    });

    console.log("🔄 Updated project-publication relationships");

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`- Users: ${await User.countDocuments()}`);
    console.log(`- Content Items: ${await Content.countDocuments()}`);
    console.log(`- Team Members: ${await TeamMember.countDocuments()}`);
    console.log(`- Projects: ${await Project.countDocuments()}`);
    console.log(`- Publications: ${await Publication.countDocuments()}`);
    console.log(`- Messages: ${await ContactMessage.countDocuments()}`);

    console.log("\n🔐 Login credentials:");
    console.log("Admin:");
    console.log("  Email: admin@fluidlab.com");
    console.log("  Password: admin123456");
    console.log("Editor:");
    console.log("  Email: editor@fluidlab.com");
    console.log("  Password: editor123456");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeder
seedData();
