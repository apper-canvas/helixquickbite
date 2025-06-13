import Home from '@/components/pages/Home';
import Search from '@/components/pages/Search';
import Orders from '@/components/pages/Orders';
import Account from '@/components/pages/Account';
import Restaurant from '@/components/pages/Restaurant';
import Checkout from '@/components/pages/Checkout';
import OrderTracking from '@/components/pages/OrderTracking';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home,
    showInNav: true
  },
  search: {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'Search',
    component: Search,
    showInNav: true
  },
  orders: {
    id: 'orders',
    label: 'Orders',
    path: '/orders',
    icon: 'ShoppingBag',
    component: Orders,
    showInNav: true
  },
  account: {
    id: 'account',
    label: 'Account',
    path: '/account',
    icon: 'User',
    component: Account,
    showInNav: true
  },
  restaurant: {
    id: 'restaurant',
    label: 'Restaurant',
    path: '/restaurant/:id',
    icon: 'Store',
    component: Restaurant,
    showInNav: false
  },
  checkout: {
    id: 'checkout',
    label: 'Checkout',
    path: '/checkout',
    icon: 'CreditCard',
    component: Checkout,
    showInNav: false
  },
  orderTracking: {
    id: 'orderTracking',
    label: 'Order Tracking',
    path: '/order/:id',
    icon: 'MapPin',
    component: OrderTracking,
    showInNav: false
  }
};

export const routeArray = Object.values(routes);
export const navigationRoutes = routeArray.filter(route => route.showInNav);