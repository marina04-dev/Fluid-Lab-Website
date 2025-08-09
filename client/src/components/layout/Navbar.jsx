// client/src/components/layout/Navbar.jsx - ΔΙΟΡΘΩΜΕΝΟ με purple theme
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  // State variables to handle menu display
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State variables to handle web page scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // Get necessary variables/functions from AuthContext
  const { user, logout } = useAuth();
  // Get necessary variables for translation
  const { t, i18n } = useTranslation();
  // Get path from useLocation
  const location = useLocation();

  // Determine if we're on homepage and should use transparent navbar initially
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  // Handle scroll effect - only relevant for homepage
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if it the user is in the home page
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // For non-home pages, navbar should always be "scrolled" (solid)
      setIsScrolled(true);
    }
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Navigation paths and translation if needed
  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.team"), href: "/team" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.publications"), href: "/publications" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  // Check the active path
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Language switcher function
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "el" : "en";
    i18n.changeLanguage(newLang);
  };

  // Language label function
  const getCurrentLanguageLabel = () => {
    return i18n.language === "en" ? "EN" : "GR Ελληνικά";
  };

  // Determine navbar appearance
  const shouldBeTransparent = isHomePage && !isScrolled;
  const navbarBg = shouldBeTransparent
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md shadow-lg";

  const textColor = shouldBeTransparent ? "text-white" : "text-gray-700";
  const hoverColor = shouldBeTransparent
    ? "hover:text-blue-200"
    : "hover:text-purple-600"; // ΔΙΟΡΘΩΣΗ: Purple hover

  // Special styling for admin pages
  if (isAdminPage) {
    return (
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo for admin με purple gradient */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FL</span>
              </div>
              <span>Fluid Lab Admin</span>
            </Link>

            {/* Admin Actions */}
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-sm text-gray-600">
                    Welcome, {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                  >
                    {t("nav.logout")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navbarBg}`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo με purple gradient */}
          <Link
            to="/"
            className={`flex items-center space-x-2 text-xl font-bold transition-colors duration-200 ${textColor}`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FL</span>
            </div>
            <span>Fluid Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.href)
                    ? shouldBeTransparent
                      ? "text-white font-semibold"
                      : "text-purple-600 font-semibold" // ΔΙΟΡΘΩΣΗ: Purple active
                    : `${textColor} ${hoverColor}`
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* User actions for logged in users */}
            {user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition-colors duration-200 ${textColor} ${hoverColor}`}
                >
                  {t("nav.dashboard")}
                </Link>
                <button
                  onClick={logout}
                  className={`text-sm font-medium transition-colors duration-200 ${textColor} hover:text-red-500`}
                >
                  {t("nav.logout")}
                </button>
              </div>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors duration-200 ${
                shouldBeTransparent
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xs">{i18n.language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-colors duration-200 ${textColor} ${
                shouldBeTransparent ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-xs">{i18n.language.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${textColor} ${
                shouldBeTransparent ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation με ΔΙΟΡΘΩΜΕΝΟ purple theme */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    isActivePath(item.href)
                      ? "text-purple-600 bg-purple-50" // ΔΙΟΡΘΩΣΗ: Purple active
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50" // ΔΙΟΡΘΩΣΗ: Purple hover
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg"
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                  >
                    {t("nav.logout")}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
