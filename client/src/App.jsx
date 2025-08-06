// client/src/App.jsx - με i18n support
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ContentProvider } from "./contexts/ContentContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Publications from "./pages/Publications";
import PublicationDetail from "./pages/PublicationDetail";
import Contact from "./pages/Contact";
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/common/ErrorBoundary";
import BackButton from "./components/common/BackButton";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <ContentProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <ScrollToTop />
                <Navbar />

                <main className="flex-grow">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/about"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <About />
                        </div>
                      }
                    />
                    <Route
                      path="/team"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <Team />
                        </div>
                      }
                    />
                    <Route
                      path="/projects"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <Projects />
                        </div>
                      }
                    />
                    <Route
                      path="/projects/:id"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <ProjectDetail />
                        </div>
                      }
                    />
                    <Route
                      path="/publications"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <Publications />
                        </div>
                      }
                    />
                    <Route
                      path="/publications/:id"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <PublicationDetail />
                        </div>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <div className="pt-20">
                          <div className="container-custom py-8">
                            <BackButton />
                          </div>
                          <Contact />
                        </div>
                      }
                    />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route
                      path="/admin/*"
                      element={
                        <ProtectedRoute requiredRole="editor">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* 404 Route */}
                    <Route
                      path="*"
                      element={
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-6xl font-bold text-gray-900 mb-4">
                              404
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                              Page not found
                            </p>
                            <BackButton />
                          </div>
                        </div>
                      }
                    />
                  </Routes>
                </main>

                <Footer />

                {/* Toast notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                      fontSize: "14px",
                    },
                    success: {
                      style: {
                        background: "#10B981",
                      },
                    },
                    error: {
                      style: {
                        background: "#EF4444",
                      },
                    },
                  }}
                />
              </div>
            </Router>
          </ContentProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
