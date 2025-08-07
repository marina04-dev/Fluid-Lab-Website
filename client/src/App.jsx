// client/src/App.jsx - UPDATED με i18n integration
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ContentProvider } from "./contexts/ContentContext";
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

// Import i18n configuration
import "./i18n";

function App() {
  return (
    <ErrorBoundary>
      {/* Wrap The App Between The Contexts */}
      <AuthProvider>
        <ContentProvider>
          <Router>
            {/* Χωρίς global background - κάθε page θα έχει το δικό της */}
            <div className="min-h-screen flex flex-col">
              <ScrollToTop />
              <Navbar />

              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  {/* Όταν ο χρήστης πάει στο "/" εμφανίζεται η σελίδα Home */}
                  <Route path="/" element={<Home />} />

                  {/* Other pages με λευκό background που αρχίζει από κάτω από το navbar */}
                  {/* Όταν πάει στο "/about" εμφανίζεται η σελίδα About */}
                  <Route
                    path="/about"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <About />
                      </div>
                    }
                  />
                  {/* Όταν πάει στο "/team" εμφανίζεται η σελίδα Team */}
                  <Route
                    path="/team"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <Team />
                      </div>
                    }
                  />
                  {/* Όταν πάει στο "/projects" εμφανίζεται η σελίδα Projects */}
                  <Route
                    path="/projects"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <Projects />
                      </div>
                    }
                  />
                  {/* Όταν πάει στο "/projects/:id" εμφανίζεται η σελίδα ProjectDetail */}
                  <Route
                    path="/projects/:id"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <ProjectDetail />
                      </div>
                    }
                  />
                  {/* Όταν πάει στο "/publications" εμφανίζεται η σελίδα Publications */}
                  <Route
                    path="/publications"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <Publications />
                      </div>
                    }
                  />
                  {/* Όταν πάει στο "/publications/:id" εμφανίζεται η σελίδα PublicationDetail */}
                  <Route
                    path="/publications/:id"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <PublicationDetail />
                      </div>
                    }
                  />
                  {/* Όταν πάει στο "/contact" εμφανίζεται η σελίδα Contact */}
                  <Route
                    path="/contact"
                    element={
                      <div className="pt-16 bg-gray-50 min-h-screen">
                        <Contact />
                      </div>
                    }
                  />

                  {/* Admin Routes με διαφορετικό styling */}
                  {/* Όταν πάει στο "/admin/login" εμφανίζεται η σελίδα popup Login */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <div className="pt-16 bg-gray-100 min-h-screen">
                          <AdminDashboard />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>

              {/* Footer δεν εμφανίζεται στα admin pages */}
              <Routes>
                <Route path="/admin/*" element={null} />
                <Route path="*" element={<Footer />} />
              </Routes>

              {/* Toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: "#4ade80",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    duration: 4000,
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
                  },
                }}
              />
            </div>
          </Router>
        </ContentProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
