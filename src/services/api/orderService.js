import orderData from '../mockData/orders.json';

let orders = [...orderData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  async getAll() {
    await delay(300);
    return [...orders];
  },

  async getById(id) {
    await delay(200);
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return { ...order };
  },

  async create(orderData) {
    await delay(500);
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'placed',
      placedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString()
    };
    
    orders.unshift(newOrder);
    return { ...newOrder };
  },

  async updateStatus(id, status) {
    await delay(200);
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      return { ...orders[orderIndex] };
    }
    throw new Error('Order not found');
  },

  async reorder(orderId) {
    await delay(300);
    const originalOrder = orders.find(o => o.id === orderId);
    if (!originalOrder) {
      throw new Error('Order not found');
    }
    
    const newOrder = {
      id: Date.now().toString(),
      restaurantId: originalOrder.restaurantId,
      items: [...originalOrder.items],
      total: originalOrder.total,
      status: 'placed',
      address: originalOrder.address,
      placedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString()
    };
    
    orders.unshift(newOrder);
    return { ...newOrder };
  }
};