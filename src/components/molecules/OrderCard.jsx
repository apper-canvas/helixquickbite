import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

const OrderCard = ({ order, onReorder, className = '' }) => {
  const navigate = useNavigate();
  
  const statusConfig = {
    placed: { color: 'warning', label: 'Order Placed', icon: 'Clock' },
    preparing: { color: 'warning', label: 'Preparing', icon: 'ChefHat' },
    on_the_way: { color: 'info', label: 'On the way', icon: 'Truck' },
    delivered: { color: 'success', label: 'Delivered', icon: 'CheckCircle' },
    cancelled: { color: 'error', label: 'Cancelled', icon: 'XCircle' }
  };
  
  const status = statusConfig[order.status] || statusConfig.placed;
  
  const handleTrackOrder = () => {
    if (order.status !== 'delivered' && order.status !== 'cancelled') {
      navigate(`/order/${order.id}`);
    }
  };
  
  const handleReorder = () => {
    if (onReorder) {
      onReorder(order.id);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-card p-4 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1 break-words">
            {order.restaurantName}
          </h3>
          <p className="text-sm text-gray-500">
            {format(new Date(order.placedAt), 'MMM dd, yyyy • hh:mm a')}
          </p>
        </div>
        <Badge variant={status.color} size="sm">
          <ApperIcon name={status.icon} className="w-3 h-3 mr-1" />
          {status.label}
        </Badge>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">
          {order.items.length} item{order.items.length > 1 ? 's' : ''}
        </p>
        <p className="font-semibold text-lg text-gray-900">
          ₹{order.total}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        {(order.status === 'placed' || order.status === 'preparing' || order.status === 'on_the_way') && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleTrackOrder}
            className="flex-1"
          >
            Track Order
          </Button>
        )}
        
        <Button
          variant="primary"
          size="sm"
          onClick={handleReorder}
          className="flex-1"
        >
          Reorder
        </Button>
      </div>
    </motion.div>
  );
};

export default OrderCard;