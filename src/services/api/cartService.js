let cartData = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const cartService = {
  async getCart() {
    await delay(150);
    return [...cartData];
  },

  async addItem(item) {
    await delay(200);
    const existingItemIndex = cartData.findIndex(
      cartItem => cartItem.menuItemId === item.menuItemId &&
      JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations)
    );

    if (existingItemIndex >= 0) {
      cartData[existingItemIndex].quantity += item.quantity;
    } else {
      cartData.push({
        id: Date.now().toString(),
        ...item
      });
    }

    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    return [...cartData];
  },

  async updateQuantity(itemId, quantity) {
    await delay(150);
    const itemIndex = cartData.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cartData.splice(itemIndex, 1);
      } else {
        cartData[itemIndex].quantity = quantity;
      }
    }

    window.dispatchEvent(new CustomEvent('cartUpdated'));
    return [...cartData];
  },

  async removeItem(itemId) {
    await delay(150);
    cartData = cartData.filter(item => item.id !== itemId);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    return [...cartData];
  },

  async clearCart() {
    await delay(100);
    cartData = [];
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    return [];
  },

  async getTotal() {
    await delay(100);
    // This would calculate total based on menu item prices
    // For now, return a mock total
    return cartData.reduce((total, item) => total + (item.quantity * 250), 0);
  }
};