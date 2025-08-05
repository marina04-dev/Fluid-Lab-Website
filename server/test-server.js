// Create this as: server/test-server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

console.log('🚀 Starting clean test server...');

const app = express();

// Security middleware
console.log('📦 Loading helmet...');
app.use(helmet());
console.log('✅ Helmet loaded');

// Rate limiting
console.log('📦 Loading rate limiter...');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
console.log('✅ Rate limiter loaded');

// CORS configuration
console.log('📦 Loading CORS...');
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com'  // change when domain given
    : 'http://localhost:5173',
    credentials: true
}));
console.log('✅ CORS loaded');

// Body parsing middleware
console.log('📦 Loading body parsers...');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
console.log('✅ Body parsers loaded');

// Logging
if (process.env.NODE_ENV === 'development') {
    console.log('📦 Loading morgan...');
    app.use(morgan('dev'));
    console.log('✅ Morgan loaded');
}

// Static files (for uploaded images, documents)
console.log('📦 Loading static files...');
app.use('/uploads', express.static('uploads'));
console.log('✅ Static files loaded');

// Skip database connection for now to isolate the issue
console.log('⏭️  Skipping database connection for testing...');

// Routes - Load one by one with detailed logging
console.log('\n🛣️  Loading routes...');

try {
    console.log('Loading auth routes...');
    app.use('/api/auth', require('./routes/auth'));
    console.log('✅ Auth routes loaded successfully');
} catch (error) {
    console.log('❌ Auth routes failed:', error.message);
    process.exit(1);
}

try {
    console.log('Loading content routes...');
    app.use('/api/content', require('./routes/content'));
    console.log('✅ Content routes loaded successfully');
} catch (error) {
    console.log('❌ Content routes failed:', error.message);
    process.exit(1);
}

try {
    console.log('Loading team routes...');
    app.use('/api/team', require('./routes/team'));
    console.log('✅ Team routes loaded successfully');
} catch (error) {
    console.log('❌ Team routes failed:', error.message);
    process.exit(1);
}

try {
    console.log('Loading projects routes...');
    app.use('/api/projects', require('./routes/projects'));
    console.log('✅ Projects routes loaded successfully');
} catch (error) {
    console.log('❌ Projects routes failed:', error.message);
    process.exit(1);
}

try {
    console.log('Loading publications routes...');
    app.use('/api/publications', require('./routes/publications'));
    console.log('✅ Publications routes loaded successfully');
} catch (error) {
    console.log('❌ Publications routes failed:', error.message);
    process.exit(1);
}

try {
    console.log('Loading contact routes...');
    app.use('/api/contact', require('./routes/contact'));
    console.log('✅ Contact routes loaded successfully');
} catch (error) {
    console.log('❌ Contact routes failed:', error.message);
    process.exit(1);
}

try {
    console.log('Loading upload routes...');
    app.use('/api/upload', require('./routes/upload'));
    console.log('✅ Upload routes loaded successfully');
} catch (error) {
    console.log('❌ Upload routes failed:', error.message);
    process.exit(1);
}

console.log('✅ All routes loaded successfully!');

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV 
    });
});

// 404 handler
app.use('/api/*', (req, res) => {
    res.status(404).json({ 
        message: 'API endpoint not found',
        path: req.originalUrl 
    });
});  

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 5001; // Different port to avoid conflicts

console.log('\n🚀 Starting server...');
app.listen(PORT, () => {
    console.log(`✅ Test server running successfully on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});