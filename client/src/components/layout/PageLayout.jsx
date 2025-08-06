// client/src/components/layout/PageLayout.jsx
import React from "react";
import BackButton from "../common/BackButton";
import LoadingSpinner from "../common/LoadingSpinner";

const PageLayout = ({
  title,
  subtitle,
  children,
  showBackButton = true,
  backButtonProps = {},
  loading = false,
  loadingText,
  maxWidth = "7xl",
  className = "",
  headerActions = null,
  breadcrumbs = null,
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text={loadingText} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${className}`}>
      <div
        className={`${maxWidthClasses[maxWidth]} mx-auto px-6 sm:px-8 lg:px-10`}
      >
        <div className="py-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              {/* Back Button & Breadcrumbs */}
              <div className="flex items-center space-x-4">
                {showBackButton && <BackButton {...backButtonProps} />}
                {breadcrumbs && (
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                      {breadcrumbs.map((crumb, index) => (
                        <li key={index} className="flex items-center">
                          {index > 0 && (
                            <svg
                              className="w-4 h-4 text-gray-400 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {crumb.href ? (
                            <a
                              href={crumb.href}
                              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              {crumb.label}
                            </a>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              {crumb.label}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Header Actions */}
            {headerActions && (
              <div className="flex-shrink-0">{headerActions}</div>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
