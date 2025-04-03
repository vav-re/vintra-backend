import React, { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, helperText, error, icon, fullWidth = true, className = '', ...props }, ref) => {
    // Base input classes
    const inputBaseClasses = `
      px-4 py-2 rounded-lg border focus:outline-none focus:ring-1
      ${error 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-vintra-primary focus:ring-vintra-primary'
      }
      ${icon ? 'pl-10' : ''}
      ${fullWidth ? 'w-full' : ''}
    `;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            className={inputBaseClasses}
            ref={ref}
            {...props}
          />
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;