import React, { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import './YearDropdown.css';

const YearDropdown = ({ value, onChange, disabled, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (year) => {
    onChange({ target: { name: 'publishedYear', value: year } });
    setIsOpen(false);
  };

  return (
    <div className={`year-dropdown ${className || ''}`} ref={dropdownRef}>
      <button
        type="button"
        className="year-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>{value}</span>
        <IoChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="year-dropdown-menu">
          {years.map(year => (
            <button
              key={year}
              type="button"
              className={`year-option ${year === value ? 'selected' : ''}`}
              onClick={() => handleSelect(year)}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearDropdown;