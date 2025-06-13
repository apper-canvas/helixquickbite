import { motion } from 'framer-motion';
import CategoryPill from '@/components/molecules/CategoryPill';

const CategoryFilter = ({ 
  categories, 
  selectedCategory,
  onCategorySelect,
  className = '' 
}) => {
  const categoryIcons = {
    'All': 'Grid3X3',
    'Pizza': 'Pizza',
    'Burger': 'Beef',
    'Chinese': 'Soup',
    'Indian': 'Flame',
    'Italian': 'Pizza',
    'Mexican': 'Pepper',
    'Japanese': 'Fish',
    'South Indian': 'Flame',
    'Fast Food': 'Zap',
    'Healthy': 'Leaf',
    'Desserts': 'IceCream'
  };
  
  return (
    <div className={`overflow-x-auto scrollbar-hide ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex space-x-3 px-4 py-2 min-w-max"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <CategoryPill
              category={category}
              icon={categoryIcons[category]}
              isActive={selectedCategory === category}
              onClick={onCategorySelect}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;