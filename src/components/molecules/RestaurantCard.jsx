import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const RestaurantCard = ({ restaurant, className = '' }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-lg shadow-card overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="error" size="md">Closed</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="success" size="sm">
            <ApperIcon name="Star" className="w-3 h-3 mr-1 fill-current" />
            {restaurant.rating}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 break-words">
          {restaurant.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 break-words">
          {restaurant.cuisine.join(', ')}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
            <span>{restaurant.deliveryTime} mins</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="IndianRupee" className="w-4 h-4 mr-1" />
            <span>Min ₹{restaurant.minOrder}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;