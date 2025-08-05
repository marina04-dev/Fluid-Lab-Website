const express = require('express');
require('dotenv').config();

const app = express();

console.log('Testing route files individually...\n');

// Test each route file one by one
const routeFiles = [
    './routes/auth',
    './routes/content', 
    './routes/team',
    './routes/projects',
    './routes/publications',
    './routes/contact',
    './routes/upload'
];

routeFiles.forEach((routeFile, index) => {
    try {
        console.log(`${index + 1}. Testing ${routeFile}...`);
        const router = require(routeFile);
        app.use(`/api/test${index}`, router);
        console.log(`   ✅ ${routeFile} - OK\n`);
    } catch (error) {
        console.log(`   ❌ ${routeFile} - ERROR:`);
        console.log(`   ${error.message}\n`);
        console.log('Stack trace:', error.stack);
        process.exit(1);
    }
});

console.log('All route files loaded successfully!');
process.exit(0);