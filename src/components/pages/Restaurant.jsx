import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import MenuList from '@/components/organisms/MenuList';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorState from '@/components/molecules/ErrorState';
import { restaurantService, menuItemService } from '@/services';

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadRestaurant();
    loadMenu();
  }, [id]);
  
  const loadRestaurant = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await restaurantService.getById(id);
      setRestaurant(data);
    } catch (err) {
      setError(err.message || 'Failed to load restaurant');
    } finally {
      setLoading(false);
    }
  };
  
  const loadMenu = async () => {
    setMenuLoading(true);
    try {
      const data = await menuItemService.getByRestaurant(id);
      setMenuItems(data);
    } catch (err) {
      toast.error('Failed to load menu');
    } finally {
      setMenuLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading restaurant..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4">
          <Button
            variant="ghost"
            icon="ArrowLeft"
            onClick={handleBack}
          >
            Back
          </Button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <ErrorState 
            message={error}
            onRetry={loadRestaurant}
          />
        </div>
      </div>
    );
  }
  
  if (!restaurant) return null;
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 p-4 flex-shrink-0"
      >
        <Button
          variant="ghost"
          icon="ArrowLeft"
          onClick={handleBack}
          className="mr-4"
        />
        <h1 className="text-lg font-display font-semibold text-gray-900 flex-1 break-words">
          {restaurant.name}
        </h1>
      </motion.header>
      
      <div className="flex-1 overflow-y-auto">
        {/* Restaurant Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white"
        >
          <div className="relative">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            {!restaurant.isOpen && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="error" size="lg">Currently Closed</Badge>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-2 break-words">
                  {restaurant.name}
                </h1>
                <p className="text-gray-600 mb-2 break-words">
                  {restaurant.cuisine.join(', ')}
                </p>
                <p className="text-sm text-gray-500 break-words">
                  {restaurant.address}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <ApperIcon name="Star" className="w-4 h-4 text-accent mr-1 fill-current" />
                  <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                </div>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <ApperIcon name="Clock" className="w-4 h-4 text-gray-600 mr-1" />
                  <span className="font-semibold text-gray-900">{restaurant.deliveryTime} mins</span>
                </div>
                <p className="text-xs text-gray-500">Delivery</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <ApperIcon name="IndianRupee" className="w-4 h-4 text-gray-600 mr-1" />
                  <span className="font-semibold text-gray-900">₹{restaurant.minOrder}</span>
                </div>
                <p className="text-xs text-gray-500">Minimum</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Menu */}
        <div className="pb-20">
          <MenuList
            menuItems={menuItems}
            loading={menuLoading}
            onRetry={loadMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Restaurant;