import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import ApperIcon from '@/components/ApperIcon';

const Account = () => {
  const menuItems = [
    { icon: 'User', label: 'Profile', description: 'Manage your account details' },
    { icon: 'MapPin', label: 'Addresses', description: 'Manage delivery addresses' },
    { icon: 'CreditCard', label: 'Payment Methods', description: 'Add or edit payment options' },
    { icon: 'Bell', label: 'Notifications', description: 'Manage your notification preferences' },
    { icon: 'HelpCircle', label: 'Help & Support', description: 'Get help with your orders' },
    { icon: 'Settings', label: 'Settings', description: 'App preferences and settings' },
  ];
  
  const MenuItem = ({ item, index }) => (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full bg-white rounded-lg shadow-card p-4 mb-3 flex items-center text-left"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
        <ApperIcon name={item.icon} className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 mb-1">{item.label}</h3>
        <p className="text-sm text-gray-500 break-words">{item.description}</p>
      </div>
      <ApperIcon name="ChevronRight" className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </motion.button>
  );
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      <Header 
        title="Account"
        className="flex-shrink-0"
      />
      
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white mx-4 mt-4 rounded-lg shadow-card p-6"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-1">
                John Doe
              </h2>
              <p className="text-gray-600 break-words">john.doe@example.com</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
          </div>
        </motion.div>
        
        {/* Menu Items */}
        <div className="px-4 mt-6">
          {menuItems.map((item, index) => (
            <MenuItem key={item.label} item={item} index={index} />
          ))}
        </div>
        
        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mt-6"
        >
          <button className="w-full bg-white rounded-lg shadow-card p-4 flex items-center justify-center text-error hover:bg-error/5 transition-colors duration-200">
            <ApperIcon name="LogOut" className="w-5 h-5 mr-2" />
            <span className="font-medium">Sign Out</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;