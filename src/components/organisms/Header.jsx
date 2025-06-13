import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const Header = ({ 
  title,
  showLocation = true, 
  showSearch = false,
  onSearch,
  onLocationClick,
  className = '' 
}) => {
  const [currentLocation] = useState('Koramangala, Bangalore');
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`bg-white border-b border-gray-200 ${className}`}
    >
      <div className="px-4 py-3">
        {showLocation && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onLocationClick}
            className="flex items-center mb-3 w-full text-left"
          >
            <ApperIcon name="MapPin" className="w-5 h-5 text-primary mr-2" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">Delivering to</p>
              <p className="font-medium text-gray-900 break-words">{currentLocation}</p>
            </div>
            <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}
        
        {title && !showSearch && (
          <h1 className="text-xl font-display font-semibold text-gray-900">
            {title}
          </h1>
        )}
        
        {showSearch && (
          <SearchBar
            onSearch={onSearch}
            placeholder="Search restaurants, dishes..."
          />
        )}
      </div>
    </motion.header>
  );
};

export default Header;