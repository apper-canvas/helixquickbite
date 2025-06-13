import menuItemData from '../mockData/menuItems.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const menuItemService = {
  async getAll() {
    await delay(300);
    return [...menuItemData];
  },

  async getById(id) {
    await delay(200);
    const menuItem = menuItemData.find(item => item.id === id);
    if (!menuItem) {
      throw new Error('Menu item not found');
    }
    return { ...menuItem };
  },

  async getByRestaurant(restaurantId) {
    await delay(250);
    return menuItemData.filter(item => item.restaurantId === restaurantId);
  },

  async getByCategory(restaurantId, category) {
    await delay(200);
    return menuItemData.filter(item => 
      item.restaurantId === restaurantId && item.category === category
    );
  },

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return menuItemData.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }
};