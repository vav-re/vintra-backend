import React from 'react';

const Avatar = ({
  name,
  src,
  size = 'md',
  className = '',
  color = 'bg-vintra-primary',
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'h-8 w-8 text-xs',
    sm: 'h-10 w-10 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-2xl',
  };
  
  // Generate initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const initials = getInitials(name);
  
  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${color}
        text-white
        rounded-full
        flex
        items-center
        justify-center
        font-medium
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;