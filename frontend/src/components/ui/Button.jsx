import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses = 'font-medium rounded-lg focus:outline-none transition-colors flex items-center justify-center';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-vintra-primary text-white hover:bg-opacity-90 focus:ring-2 focus:ring-vintra-primary focus:ring-opacity-50',
    secondary: 'bg-vintra-secondary text-white hover:bg-opacity-90 focus:ring-2 focus:ring-vintra-secondary focus:ring-opacity-50',
    outline: 'border border-vintra-primary text-vintra-primary hover:bg-vintra-primary hover:bg-opacity-5 focus:ring-2 focus:ring-vintra-primary focus:ring-opacity-50',
    text: 'text-vintra-primary hover:bg-vintra-primary hover:bg-opacity-5'
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  // Full width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled || isLoading ? disabledClasses : ''}
    ${widthClasses}
    ${className}
  `;

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;