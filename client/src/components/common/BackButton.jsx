// client/src/components/common/BackButton.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BackButton = ({
  to = "/",
  text = "Back to Home",
  greekText = "Επιστροφή στην Αρχική",
  className = "",
  showIcon = true,
  variant = "home", // "home" | "back"
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Αν υπάρχει history, πήγαινε πίσω, αλλιώς στην αρχική
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const baseClasses = `
        inline-flex items-center px-4 py-2 text-sm font-medium 
        transition-all duration-200 rounded-lg
        ${className}
    `;

  if (variant === "back") {
    return (
      <button
        onClick={handleGoBack}
        className={`${baseClasses} text-blue-600 hover:text-blue-700 hover:bg-blue-50`}
      >
        {showIcon && (
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
        <span className="hidden sm:inline">{text}</span>
        <span className="sm:hidden">Back</span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`${baseClasses} text-blue-600 hover:text-blue-700 hover:bg-blue-50`}
    >
      {showIcon && (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h3m0 0h3m0 0a1 1 0 001-1V10M9 21v-6a1 1 0 011-1h2a1 1 0 011 1v6"
          />
        </svg>
      )}
      <span className="hidden sm:inline">{text}</span>
      <span className="sm:hidden">Home</span>
    </Link>
  );
};

export default BackButton;
