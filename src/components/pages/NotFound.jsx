import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mb-8"
        >
          <ApperIcon 
            name="SearchX" 
            className="w-24 h-24 text-gray-300 mx-auto" 
          />
        </motion.div>
        
        <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGoHome}
            icon="Home"
            className="w-full"
          >
            Go to Home
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            icon="ArrowLeft"
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;