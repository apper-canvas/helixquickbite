import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

const AddressCard = ({ 
  address, 
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
  className = '' 
}) => {
  const typeIcons = {
    Home: 'Home',
    Office: 'Building',
    Other: 'MapPin'
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`
        bg-white rounded-lg border-2 transition-all duration-200 p-4 cursor-pointer
        ${isSelected 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-gray-300'
        }
        ${className}
      `}
      onClick={() => onSelect?.(address)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center mr-3
            ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
          `}>
            <ApperIcon 
              name={typeIcons[address.type] || 'MapPin'} 
              className="w-5 h-5" 
            />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900">{address.type}</h3>
              {address.isDefault && (
                <Badge variant="accent" size="xs" className="ml-2">
                  Default
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {isSelected && (
          <ApperIcon name="CheckCircle" className="w-5 h-5 text-primary" />
        )}
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        <p className="break-words">{address.line1}</p>
        {address.line2 && <p className="break-words">{address.line2}</p>}
        <p className="break-words">{address.city} - {address.pincode}</p>
        {address.landmark && (
          <p className="text-gray-500 break-words">Near {address.landmark}</p>
        )}
      </div>
      
      {showActions && (
        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            icon="Edit"
            onClick={() => onEdit?.(address)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={() => onDelete?.(address.id)}
          />
        </div>
      )}
    </motion.div>
  );
};

export default AddressCard;