import React, { useEffect } from "react";
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
  // get necessary variables/functions from ContentContext
  const {
    content,
    team,
    projects,
    publications,
    loading,
    error,
    fetchContent,
    fetchTeam,
    fetchProjects,
    fetchPublications,
    clearError,
  } = useContent();
  // use path location
  const location = useLocation();

  // Load all dashboard data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch all necessary data for dashboard overview
        await Promise.all([
          fetchContent(),
          fetchTeam(),
          fetchProjects(),
          fetchPublications(),
        ]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();
  }, [fetchContent, fetchTeam, fetchProjects, fetchPublications]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

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

  // function to calculate recent activity (last 30 days)
  const getRecentStats = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentProjects =
      projects?.filter((project) => new Date(project.createdAt) > thirtyDaysAgo)
        .length || 0;

    const recentPublications =
      publications?.filter(
        (publication) => new Date(publication.createdAt) > thirtyDaysAgo
      ).length || 0;

    const recentTeamMembers =
      team?.filter((member) => new Date(member.createdAt) > thirtyDaysAgo)
        .length || 0;

    const activeProjects =
      projects?.filter(
        (project) => project.status === "active" && project.isActive !== false
      ).length || 0;

    return {
      recentProjects,
      recentPublications,
      recentTeamMembers,
      activeProjects,
    };
  };

  const recentStats = getRecentStats();

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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-red-800">
              <strong>Error:</strong> {error}
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && Object.keys(content).length === 0 && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Loading dashboard data..." />
        </div>
      )}

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
              <p className="text-xs text-gray-400">Website content entries</p>
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
              <p className="text-xs text-gray-400">
                +{recentStats.recentTeamMembers} this month
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
                Research Projects
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {projects.length}
              </p>
              <p className="text-xs text-gray-400">
                {recentStats.activeProjects} active projects
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
              <p className="text-xs text-gray-400">
                +{recentStats.recentPublications} this month
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Projects
            </h3>
            <Link
              to="/admin/projects"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View all →
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects found</p>
          ) : (
            <div className="space-y-4">
              {projects
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        project.status === "active"
                          ? "bg-green-400"
                          : project.status === "completed"
                          ? "bg-blue-400"
                          : project.status === "planned"
                          ? "bg-yellow-400"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {project.status?.charAt(0).toUpperCase() +
                          project.status?.slice(1) || "Unknown"}
                        {project.category &&
                          ` • ${project.category.replace(/-/g, " ")}`}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>

        {/* Recent Publications */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Publications
            </h3>
            <Link
              to="/admin/publications"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View all →
            </Link>
          </div>
          {publications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No publications found
            </p>
          ) : (
            <div className="space-y-4">
              {publications
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map((publication) => (
                  <div
                    key={publication._id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate mb-1">
                      {publication.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Array.isArray(publication.authors)
                        ? publication.authors.slice(0, 2).join(", ") +
                          (publication.authors.length > 2 ? " et al." : "")
                        : publication.authors || "Unknown authors"}
                      {publication.year && ` • ${publication.year}`}
                    </p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          publication.publicationType === "journal"
                            ? "bg-blue-100 text-blue-800"
                            : publication.publicationType === "conference"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {publication.publicationType?.replace("-", " ") ||
                          "Publication"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigation
            .filter((item) => item.href !== "/admin")
            .map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </Card>

      {/* System Status */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Server Status</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Database</p>
            <p className="text-xs text-gray-500">Connected</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
              <span className="text-sm font-bold text-blue-600">API</span>
            </div>
            <p className="text-sm font-medium text-gray-900">API Status</p>
            <p className="text-xs text-gray-500">Operational</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
              <span className="text-sm font-bold text-purple-600">78%</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Storage Used</p>
            <p className="text-xs text-gray-500">Healthy</p>
          </div>
        </div>
      </Card>
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
                Quick Stats
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Content</span>
                  <span className="text-blue-600 font-medium">
                    {Object.keys(content).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Team</span>
                  <span className="text-green-600 font-medium">
                    {team.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects</span>
                  <span className="text-purple-600 font-medium">
                    {projects.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Publications</span>
                  <span className="text-yellow-600 font-medium">
                    {publications.length}
                  </span>
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
