import { motion } from 'framer-motion';

const SkeletonCard = ({ type = 'restaurant', className = '' }) => {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    }
  };
  
  if (type === 'restaurant') {
    return (
      <div className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}>
        <motion.div
          className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
          {...shimmer}
        />
        <div className="p-4 space-y-3">
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-3/4"
            {...shimmer}
          />
          <motion.div
            className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-1/2"
            {...shimmer}
          />
          <div className="flex justify-between">
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-16"
              {...shimmer}
            />
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-20"
              {...shimmer}
            />
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'menuitem') {
    return (
      <div className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}>
        <div className="flex p-4">
          <div className="flex-1 space-y-3 min-w-0">
            <motion.div
              className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-3/4"
              {...shimmer}
            />
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-16"
              {...shimmer}
            />
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-full"
              {...shimmer}
            />
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-2/3"
              {...shimmer}
            />
          </div>
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg ml-4"
            {...shimmer}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-card p-4 ${className}`}>
      <div className="space-y-3">
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-3/4"
          {...shimmer}
        />
        <motion.div
          className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-1/2"
          {...shimmer}
        />
        <motion.div
          className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-full"
          {...shimmer}
        />
      </div>
    </div>
  );
};

export default SkeletonCard;