import React, { forwardRef } from 'react';

const Textarea = forwardRef(({ 
    label,
    error,
    className = '',
    required = false,
    rows = 4,
    ...props 
}, ref) => {
    const textareaClasses = `
        w-full px-4 py-3 border rounded-lg transition-all duration-200 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        placeholder-gray-500 resize-vertical
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
            <textarea
                ref={ref}
                rows={rows}
                className={textareaClasses}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;