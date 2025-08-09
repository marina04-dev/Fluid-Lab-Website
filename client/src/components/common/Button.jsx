// client/src/components/common/Button.jsx - ΔΙΟΡΘΩΜΕΝΟ με purple theme support
import React from "react";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      className = "",
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base classes που είναι consistent με το νέο CSS
    const baseClasses = "btn"; // Χρησιμοποιούμε την .btn base class από το CSS

    // Variant classes που συμφωνούν με το νέο purple theme CSS
    const variants = {
      primary: "btn-primary", // Purple gradient
      secondary: "btn-secondary", // Light purple
      outline: "btn-outline", // Purple outline που προστέθηκε
      success: "btn-success", // Green
      danger: "btn-danger", // Red
      warning: "btn-warning", // Yellow
    };

    // Size classes που συμφωνούν με το νέο CSS
    const sizes = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    };

    // Παίρνουμε τις κατάλληλες classes
    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    // Κατασκευάζουμε το τελικό className
    const buttonClasses = `
      ${baseClasses}
      ${variantClass}
      ${sizeClass}
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          // Loading spinner με purple theme
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
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
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
