import React, { useState, useEffect } from 'react';
import { IoCheckmarkCircle, IoCloseCircle, IoClose } from 'react-icons/io5';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' ? <IoCheckmarkCircle /> : <IoCloseCircle />}
        </span>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;