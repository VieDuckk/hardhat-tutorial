import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'success' | 'danger';
  loading?: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, variant = 'primary', loading, text, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300';
  
  // Handle variant styles
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    success: 'bg-green-500 hover:bg-green-600',
    danger: 'bg-red-500 hover:bg-red-600',
  }[variant];

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      {...props}
      onClick={loading || disabled ? undefined : onClick}
      disabled={loading || disabled}
      aria-disabled={loading || disabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} text-white flex items-center justify-center`}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
