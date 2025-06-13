import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import AddressCard from '@/components/molecules/AddressCard';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyState from '@/components/molecules/EmptyState';
import { cartService, addressService, orderService } from '@/services';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const [cart, addressList, total] = await Promise.all([
        cartService.getCart(),
        addressService.getAll(),
        cartService.getTotal()
      ]);
      
      setCartItems(cart);
      setAddresses(addressList);
      setCartTotal(total);
      
      // Auto-select default address
      const defaultAddress = addressList.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      toast.error('Failed to load checkout data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setPlacing(true);
    try {
      const orderData = {
        restaurantId: '1', // Mock restaurant ID
        items: cartItems,
        total: cartTotal,
        address: selectedAddress,
        paymentMethod: paymentMethod
      };
      
      const order = await orderService.create(orderData);
      await cartService.clearCart();
      
      toast.success('Order placed successfully!');
      navigate(`/order/${order.id}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };
  
  const updateQuantity = async (itemId, quantity) => {
    try {
      await cartService.updateQuantity(itemId, quantity);
      loadData(); // Refresh cart data
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };
  
  const removeItem = async (itemId) => {
    try {
      await cartService.removeItem(itemId);
      toast.success('Item removed from cart');
      loadData(); // Refresh cart data
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading checkout..." />
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              icon="ArrowLeft"
              onClick={handleBack}
              className="mr-4"
            />
            <h1 className="text-lg font-display font-semibold text-gray-900">
              Checkout
            </h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon="ShoppingCart"
            title="Your cart is empty"
            description="Add items to your cart to continue with checkout"
            actionLabel="Browse Restaurants"
            onAction={() => navigate('/')}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 p-4 flex-shrink-0"
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            icon="ArrowLeft"
            onClick={handleBack}
            className="mr-4"
          />
          <h1 className="text-lg font-display font-semibold text-gray-900">
            Checkout
          </h1>
        </div>
      </motion.header>
      
      <div className="flex-1 overflow-y-auto">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-gray-200"
        >
          <div className="p-4">
            <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 break-words">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} each
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <ApperIcon name="Minus" className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <ApperIcon name="Plus" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-b border-gray-200"
        >
          <div className="p-4">
            <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Delivery Address
            </h2>
            
            <div className="space-y-3">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isSelected={selectedAddress?.id === address.id}
                  onSelect={handleAddressSelect}
                  showActions={false}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-b border-gray-200"
        >
          <div className="p-4">
            <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Payment Method
            </h2>
            
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod('cash')}
                className={`
                  w-full p-4 rounded-lg border-2 flex items-center transition-all duration-200
                  ${paymentMethod === 'cash' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <ApperIcon name="Banknote" className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-medium text-gray-900">Cash on Delivery</h3>
                  <p className="text-sm text-gray-600">Pay when your order arrives</p>
                </div>
                {paymentMethod === 'cash' && (
                  <ApperIcon name="CheckCircle" className="w-5 h-5 text-primary" />
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod('card')}
                className={`
                  w-full p-4 rounded-lg border-2 flex items-center transition-all duration-200
                  ${paymentMethod === 'card' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <ApperIcon name="CreditCard" className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-medium text-gray-900">Online Payment</h3>
                  <p className="text-sm text-gray-600">Pay securely with card or UPI</p>
                </div>
                {paymentMethod === 'card' && (
                  <ApperIcon name="CheckCircle" className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Bill Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white mb-20"
        >
          <div className="p-4">
            <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Bill Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Total</span>
                <span className="font-medium">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₹40</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Charges</span>
                <span className="font-medium">₹{Math.round(cartTotal * 0.05)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-lg text-primary">
                    ₹{cartTotal + 40 + Math.round(cartTotal * 0.05)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Place Order Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white border-t border-gray-200 p-4"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handlePlaceOrder}
          loading={placing}
          disabled={!selectedAddress}
          className="w-full"
        >
          Place Order • ₹{cartTotal + 40 + Math.round(cartTotal * 0.05)}
        </Button>
      </motion.div>
    </div>
  );
};

export default Checkout;