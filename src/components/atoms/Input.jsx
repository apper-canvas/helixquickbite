import { forwardRef, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label,
  type = 'text',
  error,
  helperText,
  icon,
  rightIcon,
  onRightIconClick,
  className = '',
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const hasValue = props.value || props.defaultValue;
  
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          className={`
            peer w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200
            focus:outline-none focus:ring-0
            ${icon ? 'pl-12' : ''}
            ${rightIcon || type === 'password' ? 'pr-12' : ''}
            ${error 
              ? 'border-error focus:border-error text-error' 
              : 'border-gray-300 focus:border-primary text-gray-900'
            }
            ${label ? 'placeholder-transparent' : ''}
          `}
          placeholder={label || props.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {label && (
          <label className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${focused || hasValue 
              ? '-top-2 text-xs bg-white px-1' 
              : 'top-3 text-base'
            }
            ${error ? 'text-error' : focused ? 'text-primary' : 'text-gray-500'}
            ${icon && !(focused || hasValue) ? 'left-12' : 'left-4'}
          `}>
            {label}
          </label>
        )}
        
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ApperIcon 
              name={icon} 
              className={`w-5 h-5 ${error ? 'text-error' : 'text-gray-400'}`}
            />
          </div>
        )}
        
        {(rightIcon || type === 'password') && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={type === 'password' ? handlePasswordToggle : onRightIconClick}
          >
            <ApperIcon 
              name={
                type === 'password' 
                  ? (showPassword ? 'EyeOff' : 'Eye')
                  : rightIcon
              }
              className={`w-5 h-5 ${error ? 'text-error' : 'text-gray-400'} hover:text-gray-600`}
            />
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;