import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LoadingSpinner = ({ 
  size = 'md', 
  className = '',
  text = null 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <ApperIcon 
          name="Loader2" 
          className={`${sizes[size]} text-primary`}
        />
      </motion.div>
      {text && (
        <span className="ml-3 text-gray-600">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;