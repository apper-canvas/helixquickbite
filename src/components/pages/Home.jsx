import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import CategoryFilter from '@/components/organisms/CategoryFilter';
import RestaurantGrid from '@/components/organisms/RestaurantGrid';
import { restaurantService } from '@/services';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Pizza', 'Indian', 'Chinese', 'Fast Food', 'Italian', 'Mexican', 'Japanese', 'South Indian', 'Healthy'];
  
  useEffect(() => {
    loadRestaurants();
  }, []);
  
  useEffect(() => {
    filterRestaurants();
  }, [restaurants, selectedCategory]);
  
  const loadRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await restaurantService.getAll();
      setRestaurants(data);
    } catch (err) {
      setError(err.message || 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };
  
  const filterRestaurants = () => {
    if (selectedCategory === 'All') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.cuisine.includes(selectedCategory)
      );
      setFilteredRestaurants(filtered);
    }
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const handleLocationClick = () => {
    // In a real app, this would open location picker
    console.log('Location picker clicked');
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      <Header 
        showLocation={true}
        onLocationClick={handleLocationClick}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            className="bg-white border-b border-gray-200"
          />
        </motion.div>
        
        <div className="mb-16">
          <RestaurantGrid
            restaurants={filteredRestaurants}
            loading={loading}
            error={error}
            onRetry={loadRestaurants}
            emptyMessage={selectedCategory === 'All' ? "No restaurants available" : `No ${selectedCategory} restaurants found`}
            emptyDescription="Try selecting a different category or check back later"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;