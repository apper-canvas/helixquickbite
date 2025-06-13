import { useState } from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  placeholder = "Search restaurants, cuisines...", 
  onSearch,
  className = '',
  ...props 
}) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };
  
  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon="Search"
        rightIcon={query ? "X" : null}
        onRightIconClick={query ? handleClear : null}
        className="w-full"
        {...props}
      />
    </form>
  );
};

export default SearchBar;