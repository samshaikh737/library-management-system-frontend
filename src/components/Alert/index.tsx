// components/Alert.tsx
import React from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info';
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, text, isOpen, onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
          bgColor: 'bg-green-50',
          iconPath: 'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-2.707 5.293a1 1 0 1 1 1.414-1.414L10 6.586l1.293-1.293a1 1 0 0 1 1.414 1.414L11 8.586l2.293 2.293a1 1 0 0 1-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L9 8.586l-1.707-1.707a1 1 0 0 1 0-1.414Z',
        };
      case 'warning':
        return {
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-300',
          bgColor: 'bg-yellow-50',
          iconPath: 'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 5a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0V7Zm0 6a.75.75 0 0 0-1.5 0 .75.75 0 0 0 1.5 0Z',
        };
      case 'error':
        return {
          textColor: 'text-red-800',
          borderColor: 'border-red-300',
          bgColor: 'bg-red-50',
          iconPath: 'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1.707 4.293a1 1 0 1 1 1.414-1.414L10 6.586l1.293-1.293a1 1 0 0 1 1.414 1.414L11.414 8l2.293 2.293a1 1 0 0 1-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 8 6.293 5.707Z',
        };
      case 'info':
      default:
        return {
          textColor: 'text-blue-800',
          borderColor: 'border-blue-300',
          bgColor: 'bg-blue-50',
          iconPath: 'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 4a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0V6Zm0 10a.75.75 0 0 0-1.5 0 .75.75 0 0 0 1.5 0Z',
        };
    }
  };

  const { textColor, borderColor, bgColor, iconPath } = getAlertStyles();

  return (
    <div
      className={`fixed top-4 right-4 flex items-center p-4 text-sm ${textColor} border ${borderColor} rounded-lg ${bgColor} z-{100000} transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={iconPath} />
      </svg>
      <div className="flex-1">
        <span className="font-medium">{text}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
