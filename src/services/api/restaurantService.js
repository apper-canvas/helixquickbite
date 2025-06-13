import restaurantData from '../mockData/restaurants.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const restaurantService = {
  async getAll() {
    await delay(300);
    return [...restaurantData];
  },

  async getById(id) {
    await delay(200);
    const restaurant = restaurantData.find(r => r.id === id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return { ...restaurant };
  },

  async search(query, filters = {}) {
    await delay(400);
    let results = [...restaurantData];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.cuisine && filters.cuisine.length > 0) {
      results = results.filter(restaurant =>
        restaurant.cuisine.some(c => filters.cuisine.includes(c))
      );
    }
    
    if (filters.rating) {
      results = results.filter(restaurant => restaurant.rating >= filters.rating);
    }
    
    if (filters.deliveryTime) {
      results = results.filter(restaurant => restaurant.deliveryTime <= filters.deliveryTime);
    }
    
    return results;
  },

  async getFeatured() {
    await delay(250);
    return restaurantData.filter(r => r.rating >= 4.5).slice(0, 6);
  },

  async getByCategory(category) {
    await delay(300);
    return restaurantData.filter(r => 
      r.cuisine.includes(category)
    );
  }
};