import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { navigationRoutes } from '@/config/routes';

const BottomNavigation = () => {
  const location = useLocation();
  
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
    >
      <div className="flex items-center justify-around py-2">
        {navigationRoutes.map((route) => {
          const isActive = location.pathname === route.path;
          
          return (
            <NavLink
              key={route.id}
              to={route.path}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              {({ isActive: linkActive }) => (
                <>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`
                      p-2 rounded-lg transition-colors duration-200
                      ${linkActive ? 'bg-primary/10' : 'hover:bg-gray-100'}
                    `}
                  >
                    <ApperIcon 
                      name={route.icon} 
                      className={`
                        w-6 h-6 transition-colors duration-200
                        ${linkActive ? 'text-primary' : 'text-gray-500'}
                      `}
                    />
                  </motion.div>
                  <span className={`
                    text-xs mt-1 font-medium transition-colors duration-200
                    ${linkActive ? 'text-primary' : 'text-gray-500'}
                  `}>
                    {route.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;