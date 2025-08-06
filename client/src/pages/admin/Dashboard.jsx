// client/src/pages/admin/Dashboard.jsx
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../../components/common/Card";
import BackButton from "../../components/common/BackButton";
import ContentManagement from "./ContentManagement";
import TeamManagement from "./TeamManagement";
import ProjectManagement from "./ProjectManagement";
import PublicationManagement from "./PublicationManagement";
import MessageManagement from "./MessageManagement";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Overview", href: "/admin", icon: "📊" },
    { name: "Content", href: "/admin/content", icon: "📝" },
    { name: "Team", href: "/admin/team", icon: "👥" },
    { name: "Projects", href: "/admin/projects", icon: "🔬" },
    { name: "Publications", href: "/admin/publications", icon: "📚" },
    { name: "Messages", href: "/admin/messages", icon: "💬" },
  ];

  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const OverviewPage = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Content Items</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </Card>

        <Card>
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
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Publications</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <Link
              to="/admin/content"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="text-xl mr-4">📝</span>
                <div>
                  <p className="font-medium text-gray-900">Manage Content</p>
                  <p className="text-sm text-gray-600">
                    Update website content and text
                  </p>
                </div>
              </div>
            </Link>
            <Link
              to="/admin/team"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="text-xl mr-4">👥</span>
                <div>
                  <p className="font-medium text-gray-900">Add Team Member</p>
                  <p className="text-sm text-gray-600">
                    Add new team members and profiles
                  </p>
                </div>
              </div>
            </Link>
            <Link
              to="/admin/projects"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="text-xl mr-4">🔬</span>
                <div>
                  <p className="font-medium text-gray-900">Create Project</p>
                  <p className="text-sm text-gray-600">
                    Add new research projects
                  </p>
                </div>
              </div>
            </Link>
            <Link
              to="/admin/publications"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="text-xl mr-4">📚</span>
                <div>
                  <p className="font-medium text-gray-900">Add Publication</p>
                  <p className="text-sm text-gray-600">
                    Publish new research papers
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">
                  Content updated: Hero section
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">New team member added</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Project status updated</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">New publication added</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const PlaceholderPage = ({ title, description, isImplemented = false }) => (
    <div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FL</span>
              </div>
              <span className="text-xl font-bold">Admin</span>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Stats in Sidebar */}
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
        <div className="flex-1 p-8">
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
