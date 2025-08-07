// client/src/components/common/LoadingSpinner.jsx
import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

const LoadingSpinner = ({
  size = "md",
  text = null,
  overlay = false,
  color = "blue",
  className = "",
}) => {
  // Safely access language context - it might not be available in all contexts
  const languageContext = useContext(LanguageContext);
  const t = languageContext?.t || null;

  const sizes = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colors = {
    blue: "text-blue-600",
    white: "text-white",
    gray: "text-gray-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Handle text display
  const getDisplayText = () => {
    if (text === true) {
      // If text is true and translation function is available, use it
      return t ? t("common.loading") : "Loading...";
    }
    return text;
  };

  const spinner = (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      {/* Spinner */}
      <div className={`${sizes[size]} ${colors[color]} animate-spin`}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>

      {/* Loading Text */}
      {text && (
        <div
          className={`${textSizes[size]} ${colors[color]} font-medium animate-pulse`}
        >
          {getDisplayText()}
        </div>
      )}
    </div>
  );

  // Overlay version
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-xl">{spinner}</div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
