import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorState from '@/components/molecules/ErrorState';
import { orderService } from '@/services';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadOrder();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (order && order.status !== 'delivered' && order.status !== 'cancelled') {
        loadOrder();
      }
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [id, order?.status]);
  
  const loadOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getById(id);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate('/orders');
  };
  
  const statusSteps = [
    { key: 'placed', label: 'Order Placed', icon: 'CheckCircle' },
    { key: 'preparing', label: 'Preparing', icon: 'ChefHat' },
    { key: 'on_the_way', label: 'On the way', icon: 'Truck' },
    { key: 'delivered', label: 'Delivered', icon: 'Home' }
  ];
  
  const getCurrentStepIndex = (status) => {
    return statusSteps.findIndex(step => step.key === status);
  };
  
  if (loading && !order) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading order..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              icon="ArrowLeft"
              onClick={handleBack}
              className="mr-4"
            />
            <h1 className="text-lg font-display font-semibold text-gray-900">
              Order Tracking
            </h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <ErrorState 
            message={error}
            onRetry={loadOrder}
          />
        </div>
      </div>
    );
  }
  
  if (!order) return null;
  
  const currentStepIndex = getCurrentStepIndex(order.status);
  const estimatedDelivery = new Date(order.estimatedDelivery);
  const isDelivered = order.status === 'delivered';
  const isCancelled = order.status === 'cancelled';
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 p-4 flex-shrink-0"
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            icon="ArrowLeft"
            onClick={handleBack}
            className="mr-4"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-display font-semibold text-gray-900">
              Order #{order.id}
            </h1>
            <p className="text-sm text-gray-600">
              {format(new Date(order.placedAt), 'MMM dd, yyyy • hh:mm a')}
            </p>
          </div>
        </div>
      </motion.header>
      
      <div className="flex-1 overflow-y-auto">
        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-gray-200 p-6"
        >
          {!isCancelled ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {isDelivered ? 'Order Delivered!' : 'Tracking your order'}
                </h2>
                <p className="text-gray-600">
                  {isDelivered 
                    ? `Delivered at ${format(new Date(order.deliveredAt || order.estimatedDelivery), 'hh:mm a')}`
                    : `Estimated delivery: ${format(estimatedDelivery, 'hh:mm a')}`
                  }
                </p>
              </div>
              
              <div className="relative">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <div key={step.key} className="flex items-center mb-6 last:mb-0">
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`
                            w-12 h-12 rounded-full flex items-center justify-center
                            ${isCompleted 
                              ? 'bg-success text-white' 
                              : 'bg-gray-200 text-gray-400'
                            }
                          `}
                        >
                          <ApperIcon name={step.icon} className="w-6 h-6" />
                        </motion.div>
                        
                        {index < statusSteps.length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                            <div className={`
                              w-0.5 h-8 
                              ${isCompleted ? 'bg-success' : 'bg-gray-200'}
                            `} />
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className={`
                          font-medium
                          ${isCompleted ? 'text-gray-900' : 'text-gray-500'}
                        `}>
                          {step.label}
                        </h3>
                        {isCurrent && !isDelivered && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-primary font-medium"
                          >
                            In progress...
                          </motion.p>
                        )}
                      </div>
                      
                      {isCurrent && !isDelivered && (
                        <Badge variant="primary" size="sm">
                          Current
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="XCircle" className="w-8 h-8 text-error" />
              </div>
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Order Cancelled
              </h2>
              <p className="text-gray-600">
                Your order has been cancelled and refund will be processed soon.
              </p>
            </div>
          )}
        </motion.div>
        
        {/* Restaurant Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-b border-gray-200 p-4"
        >
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
            Restaurant Details
          </h3>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Store" className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 break-words">
                {order.restaurantName}
              </h4>
              <p className="text-sm text-gray-600">
                Order ID: {order.id}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-b border-gray-200"
        >
          <div className="p-4">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Order Items
            </h3>
            
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.05) }}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 break-words">
                      {item.name}
                    </h4>
                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <p className="text-sm text-gray-600">
                        {Object.entries(item.customizations).map(([key, value]) => 
                          `${key}: ${value}`
                        ).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {item.quantity} × ₹{item.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{item.quantity * item.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-semibold text-lg text-primary">
                  ₹{order.total}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white mb-4"
        >
          <div className="p-4">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
              Delivery Address
            </h3>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 break-words">{order.address.line1}</p>
                {order.address.line2 && (
                  <p className="text-gray-900 break-words">{order.address.line2}</p>
                )}
                <p className="text-gray-600 break-words">
                  {order.address.city}
                </p>
                {order.address.landmark && (
                  <p className="text-sm text-gray-500 break-words">
                    Near {order.address.landmark}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;