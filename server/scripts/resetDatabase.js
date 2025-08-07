// server/scripts/resetDatabase.js - Script για καθαρισμό της database
const mongoose = require("mongoose");
const readline = require("readline");
const User = require("../models/User");
const Content = require("../models/Content");
const TeamMember = require("../models/TeamMember");
const Project = require("../models/Project");
const Publication = require("../models/Publication");
const ContactMessage = require("../models/ContactMessage");
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const resetDatabase = async () => {
  try {
    console.log("🔄 Database Reset Utility");
    console.log("=======================\n");

    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Show current database stats
    const stats = {
      users: await User.countDocuments(),
      content: await Content.countDocuments(),
      team: await TeamMember.countDocuments(),
      projects: await Project.countDocuments(),
      publications: await Publication.countDocuments(),
      messages: await ContactMessage.countDocuments(),
    };

    console.log("📊 Current Database Stats:");
    console.log(`- Users: ${stats.users}`);
    console.log(`- Content Items: ${stats.content}`);
    console.log(`- Team Members: ${stats.team}`);
    console.log(`- Projects: ${stats.projects}`);
    console.log(`- Publications: ${stats.publications}`);
    console.log(`- Messages: ${stats.messages}\n`);

    // Confirm reset
    const confirm1 = await askQuestion(
      "⚠️  Are you sure you want to reset the entire database? (yes/no): "
    );

    if (confirm1.toLowerCase() !== "yes") {
      console.log("❌ Reset cancelled");
      process.exit(0);
    }

    const confirm2 = await askQuestion(
      '⚠️  This action cannot be undone. Type "RESET" to confirm: '
    );

    if (confirm2 !== "RESET") {
      console.log("❌ Reset cancelled - confirmation text did not match");
      process.exit(0);
    }

    console.log("\n🗑️  Starting database reset...\n");

    // Drop collections
    const collections = [
      { model: User, name: "Users" },
      { model: Content, name: "Content" },
      { model: TeamMember, name: "Team Members" },
      { model: Project, name: "Projects" },
      { model: Publication, name: "Publications" },
      { model: ContactMessage, name: "Contact Messages" },
    ];

    for (const collection of collections) {
      try {
        const count = await collection.model.countDocuments();
        if (count > 0) {
          await collection.model.deleteMany({});
          console.log(`✅ Cleared ${collection.name} (${count} documents)`);
        } else {
          console.log(`ℹ️  ${collection.name} was already empty`);
        }
      } catch (error) {
        console.log(`⚠️  Error clearing ${collection.name}:`, error.message);
      }
    }

    console.log("\n✅ Database reset completed successfully!");

    const seedNow = await askQuestion(
      "\n🌱 Would you like to run the seed script now? (yes/no): "
    );

    if (seedNow.toLowerCase() === "yes") {
      console.log("\n🌱 Running seed script...\n");
      require("./seedData");
    } else {
      console.log("\n💡 You can run the seed script later with: npm run seed");
      process.exit(0);
    }
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
};

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n👋 Reset cancelled by user");
  rl.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n👋 Reset cancelled by system");
  rl.close();
  process.exit(0);
});

// Run the reset
resetDatabase();
