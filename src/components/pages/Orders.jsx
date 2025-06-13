import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import OrderCard from '@/components/molecules/OrderCard';
import SkeletonCard from '@/components/molecules/SkeletonCard';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import { orderService, cartService } from '@/services';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReorder = async (orderId) => {
    try {
      // First, clear the current cart
      await cartService.clearCart();
      
      // Then reorder
      const newOrder = await orderService.reorder(orderId);
      toast.success('Items added to cart!');
      
      // Refresh orders list
      loadOrders();
    } catch (err) {
      toast.error('Failed to reorder. Please try again.');
    }
  };
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4 p-4">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkeletonCard />
            </motion.div>
          ))}
        </div>
      );
    }
    
    if (error) {
      return (
        <ErrorState 
          message={error}
          onRetry={loadOrders}
          className="m-4"
        />
      );
    }
    
    if (orders.length === 0) {
      return (
        <EmptyState
          icon="ShoppingBag"
          title="No orders yet"
          description="When you place orders, they'll appear here. Start exploring restaurants to place your first order!"
          actionLabel="Browse Restaurants"
          onAction={() => window.history.back()}
          className="mt-20"
        />
      );
    }
    
    return (
      <div className="space-y-4 p-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <OrderCard 
              order={order}
              onReorder={handleReorder}
            />
          </motion.div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      <Header 
        title="Your Orders"
        className="flex-shrink-0"
      />
      
      <div className="flex-1 overflow-y-auto mb-16">
        {renderContent()}
      </div>
    </div>
  );
};

export default Orders;