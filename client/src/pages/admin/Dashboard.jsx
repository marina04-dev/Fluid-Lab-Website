import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

const Dashboard = () => {
    const { user } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Overview', href: '/admin', icon: '📊' },
        { name: 'Content', href: '/admin/content', icon: '📝' },
        { name: 'Team', href: '/admin/team', icon: '👥' },
        { name: 'Projects', href: '/admin/projects', icon: '🔬' },
        { name: 'Publications', href: '/admin/publications', icon: '📚' },
        { name: 'Messages', href: '/admin/messages', icon: '💬' },
    ];

    const isActivePath = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    const OverviewPage = () => (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.username}!</p>
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
                            <p className="text-2xl font-semibold text-gray-900">12</p>
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
                            <p className="text-2xl font-semibold text-gray-900">8</p>
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
                            <p className="text-sm font-medium text-gray-500">Active Projects</p>
                            <p className="text-2xl font-semibold text-gray-900">15</p>
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
                            <p className="text-2xl font-semibold text-gray-900">42</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link
                            to="/admin/content"
                            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <span className="text-lg mr-3">📝</span>
                                <div>
                                    <p className="font-medium text-gray-900">Manage Content</p>
                                    <p className="text-sm text-gray-600">Update website content and text</p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/admin/team"
                            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <span className="text-lg mr-3">👥</span>
                                <div>
                                    <p className="font-medium text-gray-900">Add Team Member</p>
                                    <p className="text-sm text-gray-600">Add new team members and profiles</p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/admin/projects"
                            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <span className="text-lg mr-3">🔬</span>
                                <div>
                                    <p className="font-medium text-gray-900">Create Project</p>
                                    <p className="text-sm text-gray-600">Add new research projects</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            <div>
                                <p className="text-gray-900">New contact message received</p>
                                <p className="text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            <div>
                                <p className="text-gray-900">Project "Advanced Turbulence" updated</p>
                                <p className="text-gray-500">1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            <div>
                                <p className="text-gray-900">New publication added</p>
                                <p className="text-gray-500">3 days ago</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );

    const PlaceholderPage = ({ title, description }) => (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
            <Card>
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-600">This admin section is under development.</p>
                </div>
            </Card>
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
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <Routes>
                        <Route path="/" element={<OverviewPage />} />
                        <Route 
                            path="/content" 
                            element={
                                <PlaceholderPage 
                                    title="Content Management" 
                                    description="Manage website content and text"
                                />
                            } 
                        />
                        <Route 
                            path="/team" 
                            element={
                                <PlaceholderPage 
                                    title="Team Management" 
                                    description="Manage team members and profiles"
                                />
                            } 
                        />
                        <Route 
                            path="/projects" 
                            element={
                                <PlaceholderPage 
                                    title="Project Management" 
                                    description="Manage research projects"
                                />
                            } 
                        />
                        <Route 
                            path="/publications" 
                            element={
                                <PlaceholderPage 
                                    title="Publication Management" 
                                    description="Manage publications and research papers"
                                />
                            } 
                        />
                        <Route 
                            path="/messages" 
                            element={
                                <PlaceholderPage 
                                    title="Contact Messages" 
                                    description="View and respond to contact messages"
                                />
                            } 
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;