import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BottomNavigation from '@/components/organisms/BottomNavigation';
import CartButton from '@/components/organisms/CartButton';
import { cartService } from '@/services';

const Layout = () => {
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const cart = await cartService.getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalItems);
      } catch (error) {
        console.error('Failed to load cart count:', error);
      }
    };
    
    loadCartCount();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const hideNavigation = ['/checkout', '/order'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      
      {!hideNavigation && (
        <>
          <BottomNavigation />
          {cartItemCount > 0 && <CartButton itemCount={cartItemCount} />}
        </>
      )}
    </div>
  );
};

export default Layout;