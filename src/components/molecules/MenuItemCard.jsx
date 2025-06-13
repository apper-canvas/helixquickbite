import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { cartService } from '@/services';

const MenuItemCard = ({ menuItem, className = '' }) => {
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const cartItem = {
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: quantity,
        customizations: {},
        specialInstructions: ''
      };
      
      await cartService.addItem(cartItem);
      toast.success(`${menuItem.name} added to cart!`);
      
      // Reset quantity after adding
      setQuantity(1);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}
    >
      <div className="flex">
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 mb-1 break-words">
                {menuItem.name}
              </h3>
              <div className="flex items-center mb-2">
                <span className="font-semibold text-lg text-gray-900">
                  ₹{menuItem.price}
                </span>
                {menuItem.isVeg && (
                  <Badge variant="success" size="xs" className="ml-2">
                    <ApperIcon name="Leaf" className="w-3 h-3" />
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 break-words">
            {menuItem.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <ApperIcon name="Minus" className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              variant="primary"
              size="sm"
              loading={adding}
              onClick={handleAddToCart}
              className="ml-4"
            >
              Add
            </Button>
          </div>
        </div>
        
        {menuItem.image && (
          <div className="w-24 h-24 m-4 flex-shrink-0">
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MenuItemCard;