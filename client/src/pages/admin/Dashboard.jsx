// client/src/pages/admin/Dashboard.jsx - FIXED VERSION
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useContent } from "../../contexts/ContentContext";
import Card from "../../components/common/Card";
import BackButton from "../../components/common/BackButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ContentManagement from "./ContentManagement";
import TeamManagement from "./TeamManagement";
import ProjectManagement from "./ProjectManagement";
import PublicationManagement from "./PublicationManagement";
import MessageManagement from "./MessageManagement";

const Dashboard = () => {
  // get the user from AuthContext
  const { user } = useAuth();
  // get necessary variables/functions from context
  const { content, team, projects, publications, loading } = useContent();
  // use path location
  const location = useLocation();

  // navigation menus
  const navigation = [
    {
      name: "Overview",
      href: "/admin",
      icon: "📊",
      description: "Dashboard overview and statistics",
    },
    {
      name: "Content",
      href: "/admin/content",
      icon: "📝",
      description: "Manage website content and text",
    },
    {
      name: "Team",
      href: "/admin/team",
      icon: "👥",
      description: "Manage team members",
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: "🔬",
      description: "Manage research projects",
    },
    {
      name: "Publications",
      href: "/admin/publications",
      icon: "📚",
      description: "Manage publications and papers",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: "💬",
      description: "View and respond to messages",
    },
  ];

  // function to get the active path
  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const OverviewPage = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <BackButton to="/" text="Back to Website" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.username}!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Content Items</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.keys(content).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <p className="text-2xl font-semibold text-gray-900">
                {team.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Active Projects
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {projects.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Publications</p>
              <p className="text-2xl font-semibold text-gray-900">
                {publications.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/content"
            className="group flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-800">
                Update Content
              </p>
              <p className="text-xs text-blue-600">
                Edit website text and copy
              </p>
            </div>
          </Link>

          <Link
            to="/admin/team"
            className="group flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-green-800">
                Add Team Member
              </p>
              <p className="text-xs text-green-600">Manage team members</p>
            </div>
          </Link>

          <Link
            to="/admin/projects"
            className="group flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <span className="text-2xl">🔬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-purple-800">
                New Project
              </p>
              <p className="text-xs text-purple-600">Create research project</p>
            </div>
          </Link>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">
                System started successfully
              </p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">Database connected</p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">
                User {user?.username} logged in
              </p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
        </div>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="flex items-center text-sm text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <span className="flex items-center text-sm text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Services</span>
              <span className="flex items-center text-sm text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Username</span>
              <span className="text-sm text-gray-900 font-medium">
                {user?.username}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Email</span>
              <span className="text-sm text-gray-900 font-medium">
                {user?.email}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Role</span>
              <span className="text-sm text-gray-900 font-medium capitalize">
                {user?.role}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Login</span>
              <span className="text-sm text-gray-900 font-medium">
                Just now
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const PlaceholderPage = ({ title, description, isImplemented = false }) => (
    <div className="space-y-8">
      <div className="flex items-center space-x-4 mb-8">
        <BackButton variant="back" text="Back to Dashboard" />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      {!isImplemented && (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600">
              This admin section is under development.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              This page will include full functionality for managing{" "}
              {title.toLowerCase()}.
            </p>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FL</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-500">Fluid Lab CMS</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActivePath(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* System Status in Sidebar */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                System Status
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Server</span>
                  <span className="text-green-600 font-medium">● Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-medium">
                    ● Connected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage</span>
                  <span className="text-blue-600 font-medium">78% Used</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/publications" element={<PublicationManagement />} />
            <Route path="/messages" element={<MessageManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
