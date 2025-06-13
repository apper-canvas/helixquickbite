import addressData from '../mockData/addresses.json';

let addresses = [...addressData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const addressService = {
  async getAll() {
    await delay(200);
    return [...addresses];
  },

  async getById(id) {
    await delay(150);
    const address = addresses.find(a => a.id === id);
    if (!address) {
      throw new Error('Address not found');
    }
    return { ...address };
  },

  async create(addressData) {
    await delay(300);
    const newAddress = {
      id: Date.now().toString(),
      ...addressData
    };
    
    addresses.push(newAddress);
    return { ...newAddress };
  },

  async update(id, data) {
    await delay(250);
    const addressIndex = addresses.findIndex(a => a.id === id);
    if (addressIndex >= 0) {
      addresses[addressIndex] = { ...addresses[addressIndex], ...data };
      return { ...addresses[addressIndex] };
    }
    throw new Error('Address not found');
  },

  async delete(id) {
    await delay(200);
    const addressIndex = addresses.findIndex(a => a.id === id);
    if (addressIndex >= 0) {
      addresses.splice(addressIndex, 1);
      return true;
    }
    throw new Error('Address not found');
  },

  async setDefault(id) {
    await delay(150);
    addresses.forEach(address => {
      address.isDefault = address.id === id;
    });
    return [...addresses];
  }
};