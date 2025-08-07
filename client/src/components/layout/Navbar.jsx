// client/src/components/layout/Navbar.jsx - UPDATED με react-i18next
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Determine if we're on homepage and should use transparent navbar initially
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  // Handle scroll effect - only relevant for homepage
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

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

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.team"), href: "/team" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.publications"), href: "/publications" },
    { name: t("nav.contact"), href: "/contact" },
  ];

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
    : "hover:text-blue-600";

  // Special styling for admin pages
  if (isAdminPage) {
    return (
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo for admin */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-2 text-xl font-bold transition-colors duration-200 ${textColor}`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
                    ? "text-blue-600"
                    : `${textColor} ${hoverColor}`
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${textColor} ${hoverColor} border border-current border-opacity-20 hover:border-opacity-40`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {getCurrentLanguageLabel()}
            </button>

            {/* Admin Link - Only show for authenticated users */}
            {user && (
              <div className="relative group">
                <button
                  className={`text-sm font-medium transition-colors duration-200 ${textColor}`}
                >
                  {t("nav.admin")}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher */}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    isActivePath(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
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
