import { motion } from 'framer-motion';
import MenuItemCard from '@/components/molecules/MenuItemCard';
import SkeletonCard from '@/components/molecules/SkeletonCard';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';

const MenuList = ({ 
  menuItems = [], 
  loading = false,
  error = null,
  onRetry,
  groupByCategory = true,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`space-y-4 p-4 ${className}`}>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SkeletonCard type="menuitem" />
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
  
  if (menuItems.length === 0) {
    return (
      <EmptyState
        icon="UtensilsCrossed"
        title="No menu items found"
        description="This restaurant's menu is currently unavailable"
        className="m-4"
      />
    );
  }
  
  if (!groupByCategory) {
    return (
      <div className={`space-y-4 p-4 ${className}`}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MenuItemCard menuItem={item} />
          </motion.div>
        ))}
      </div>
    );
  }
  
  // Group by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
  
  return (
    <div className={`${className}`}>
      {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="mb-6"
        >
          <div className="sticky top-0 bg-gray-50 px-4 py-3 border-b border-gray-200 z-10">
            <h2 className="font-display font-semibold text-lg text-gray-900">
              {category}
            </h2>
          </div>
          
          <div className="space-y-4 p-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
              >
                <MenuItemCard menuItem={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MenuList;