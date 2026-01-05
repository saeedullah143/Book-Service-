import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <BiLoaderAlt className="spinner-icon" />
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;