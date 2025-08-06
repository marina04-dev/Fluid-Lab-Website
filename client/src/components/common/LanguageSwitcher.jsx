// client/src/components/common/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const LanguageSwitcher = ({ variant = "dropdown", className = "" }) => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = availableLanguages.find(
    (lang) => lang.code === language
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  if (variant === "toggle") {
    // Simple toggle between two languages
    const otherLanguage = availableLanguages.find(
      (lang) => lang.code !== language
    );

    return (
      <button
        onClick={() => handleLanguageChange(otherLanguage.code)}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 ${className}`}
        title={`Switch to ${otherLanguage.name}`}
      >
        <span className="mr-2">{otherLanguage.flag}</span>
        <span className="hidden sm:inline">{otherLanguage.name}</span>
        <span className="sm:hidden">{otherLanguage.code.toUpperCase()}</span>
      </button>
    );
  }

  // Dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <span className="sm:hidden">{language.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in-up">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                lang.code === language
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              <span className="mr-3">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.name}</span>
              {lang.code === language && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
