import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
    label,
    error,
    type = 'text',
    className = '',
    required = false,
    ...props 
}, ref) => {
    const inputClasses = `
        w-full px-4 py-3 border rounded-lg transition-all duration-200 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        placeholder-gray-500
        ${error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300'
        }
        ${className}
    `;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                className={inputClasses}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;