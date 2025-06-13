import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CategoryPill = ({ 
  category, 
  icon, 
  isActive = false,
  onClick,
  className = '' 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(category)}
      className={`
        inline-flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-200
        ${isActive 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary shadow-sm'
        }
        ${className}
      `}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-gray-500'}`}
        />
      )}
      {category}
    </motion.button>
  );
};

export default CategoryPill;