// client/src/components/common/Input.jsx
import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  helpText = "",
  className = "",
  ...props
}) => {
  const baseInputClasses = `
    w-full px-5 py-4 border border-gray-300 rounded-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-all duration-200 placeholder-gray-500 text-base
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? "border-red-300 focus:ring-red-500" : ""}
    ${className}
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={baseInputClasses}
        {...props}
      />

      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {helpText && !error && (
        <p className="text-sm text-gray-600">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
