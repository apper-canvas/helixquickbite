import { motion } from 'framer-motion';
import RestaurantCard from '@/components/molecules/RestaurantCard';
import SkeletonCard from '@/components/molecules/SkeletonCard';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';

const RestaurantGrid = ({ 
  restaurants = [], 
  loading = false,
  error = null,
  onRetry,
  emptyMessage = "No restaurants found",
  emptyDescription = "Try adjusting your search or browse different categories",
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SkeletonCard type="restaurant" />
          </motion.div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={onRetry}
        className="m-4"
      />
    );
  }
  
  if (restaurants.length === 0) {
    return (
      <EmptyState
        icon="Store"
        title={emptyMessage}
        description={emptyDescription}
        className="m-4"
      />
    );
  }
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${className}`}>
      {restaurants.map((restaurant, index) => (
        <motion.div
          key={restaurant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <RestaurantCard restaurant={restaurant} />
        </motion.div>
      ))}
    </div>
  );
};

export default RestaurantGrid;