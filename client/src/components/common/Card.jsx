import React from 'react';

const Card = ({ 
    children, 
    className = '', 
    hover = false,
    padding = 'default',
    ...props 
}) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8'
    };

    const baseClasses = `
        bg-white rounded-xl shadow-sm border border-gray-200 
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${paddingClasses[padding]}
        ${className}
    `;

    return (
        <div className={baseClasses} {...props}>
            {children}
        </div>
    );
};

export default Card;