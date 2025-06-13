import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const CartButton = ({ itemCount = 0 }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/checkout');
  };
  
  if (itemCount === 0) return null;
  
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-20 right-4 bg-primary text-white p-4 rounded-full shadow-lg z-50"
    >
      <div className="relative">
        <ApperIcon name="ShoppingCart" className="w-6 h-6" />
        <Badge 
          variant="accent" 
          size="xs" 
          className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
          animate
        >
          {itemCount}
        </Badge>
      </div>
    </motion.button>
  );
};

export default CartButton;