import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import RestaurantGrid from '@/components/organisms/RestaurantGrid';
import EmptyState from '@/components/molecules/EmptyState';
import { restaurantService } from '@/services';

const Search = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    
    if (!query.trim()) {
      setRestaurants([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await restaurantService.search(query);
      setRestaurants(results);
    } catch (err) {
      setError(err.message || 'Failed to search restaurants');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      <Header 
        showSearch={true}
        onSearch={handleSearch}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 overflow-y-auto">
        {!hasSearched ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <EmptyState
              icon="Search"
              title="Find your favorite food"
              description="Search for restaurants, cuisines, or specific dishes to discover great meals near you"
              className="mt-20"
            />
          </motion.div>
        ) : (
          <div className="mb-16">
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 bg-white border-b border-gray-200"
              >
                <p className="text-sm text-gray-600">
                  {loading ? 'Searching...' : `Results for "${searchQuery}"`}
                </p>
              </motion.div>
            )}
            
            <RestaurantGrid
              restaurants={restaurants}
              loading={loading}
              error={error}
              onRetry={handleRetry}
              emptyMessage="No restaurants found"
              emptyDescription={`No results found for "${searchQuery}". Try searching with different keywords.`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;