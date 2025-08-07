# Fluid Mechanics Research Lab Website

A modern, responsive website for a fluid mechanics research laboratory built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Modern React Frontend** with responsive design
- **Admin Dashboard** for content management
- **Multi-language support** (English/Greek)
- **Content Management System** for dynamic content
- **Team Member Management** with profiles and expertise
- **Research Projects** showcase with detailed information
- **Publications Database** with academic papers and references
- **Contact System** with message management
- **User Authentication** with role-based access control
- **RESTful API** with comprehensive endpoints
- **Database Seeding** with sample data

## 🛠️ Tech Stack

### Frontend

- **React 18** with Hooks and Context API
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** enabled
- **Rate limiting** and security headers

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd fluid-lab-website
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/fluid-lab

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 🚦 Running the Application

### 1. Start the Backend Server

```bash
cd server
npm run dev
```

The API server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd client
npm start
```

The React app will start on `http://localhost:3000`

## 🌱 Database Setup

### Seed the Database with Sample Data

```bash
cd server
npm run seed
```

This will create:

- **Admin user**: admin@fluidlab.com (password: admin123456)
- **Editor user**: editor@fluidlab.com (password: editor123456)
- Sample content items for all sections
- Team members with detailed profiles
- Research projects with descriptions
- Academic publications with references
- Sample contact messages

### Reset Database (if needed)

```bash
cd server
npm run reset-db
```

This interactive script will:

1. Show current database statistics
2. Ask for confirmation (requires typing "RESET")
3. Clear all collections
4. Optionally run the seed script

## 🔐 Authentication & Access Levels

### User Roles

- **Admin**: Full access to all features and data
- **Editor**: Can manage content, team, projects, and publications
- **Viewer**: Read-only access (future implementation)

### Admin Panel Access

Navigate to `/admin/login` and use the credentials created during seeding.

## 📱 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)
- `GET /api/auth/me` - Get current user info

### Content Management

- `GET /api/content` - Get all active content
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create new content (auth required)
- `PUT /api/content/:key` - Update content by key (auth required)
- `DELETE /api/content/:key` - Delete content by key (admin only)

### Team Management

- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Create team member (auth required)
- `PUT /api/team/:id` - Update team member (auth required)
- `DELETE /api/team/:id` - Delete team member (admin only)

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Publications

- `GET /api/publications` - Get all publications
- `GET /api/publications/:id` - Get publication by ID
- `POST /api/publications` - Create publication (auth required)
- `PUT /api/publications/:id` - Update publication (auth required)
- `DELETE /api/publications/:id` - Delete publication (admin only)

### Contact Messages

- `GET /api/messages` - Get all messages (auth required)
- `GET /api/messages/:id` - Get message by ID (auth required)
- `POST /api/messages` - Create new message (public)
- `PUT /api/messages/:id` - Mark as read/respond (auth required)
- `DELETE /api/messages/:id` - Delete message (admin only)

## 🎨 Customization

### Content Management

All website text can be managed through the admin panel:

1. Login to admin panel
2. Navigate to "Content Management"
3. Edit any content item
4. Changes appear immediately on the website

### Styling & Themes

The project uses Tailwind CSS with custom components:

- Colors can be modified in `client/src/index.css`
- Component styles are defined in the `@layer components` section
- Responsive breakpoints follow Tailwind's conventions

### Adding New Sections

1. Create content items in the database
2. Add the corresponding keys to the frontend components
3. Use the `getContent()` function to retrieve dynamic content

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Use `npm start` instead of `npm run dev`
3. Configure MongoDB connection for production
4. Set up reverse proxy (nginx recommended)
5. Enable SSL/TLS certificates

### Frontend Deployment

1. Build the production version: `npm run build`
2. Serve the `build` folder with a web server
3. Configure API base URL for production
4. Set up CDN (optional)

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-domain.com
```

## 📚 Project Structure

```
fluid-lab-website/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── server/                  # Node.js backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Database scripts
│   ├── uploads/            # File uploads (created automatically)
│   ├── server.js           # Express server setup
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors**

- Ensure MongoDB is running
- Check the `MONGODB_URI` in your `.env` file
- Verify network connectivity

**CORS Issues**

- Check the `FRONTEND_URL` environment variable
- Ensure the frontend is running on the correct port

**Authentication Problems**

- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure cookies are enabled in browser

**Build Errors**

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

### Development Tips

- Use `npm run dev` for backend development (auto-restart)
- Frontend hot reload is enabled by default
- Check browser console and server logs for errors
- Use the network tab to debug API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **File Upload System** for images and documents
- **Advanced Search** functionality
- **Email Notifications** for contact forms
- **Social Media Integration**
- **SEO Optimization** with meta tags
- **PWA Support** for mobile app-like experience
- **Analytics Dashboard** with usage statistics
- **Backup & Export** functionality
- **Multi-tenancy** support for multiple labs
