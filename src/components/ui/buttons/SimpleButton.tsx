import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

export function SimpleButton({
  className = '',
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-md hover:shadow-lg',
    outline: 'border-2 border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700',
    ghost: 'hover:bg-gray-100 active:bg-gray-200 text-gray-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg',
  };

  const sizes = {
    default: 'h-11 px-6 py-2',
    sm: 'h-9 px-4',
    lg: 'h-12 px-8',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
