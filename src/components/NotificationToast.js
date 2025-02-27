import React from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationToast = () => {
  const { notifications } = useApp();

  if (notifications.length === 0) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-700';
      case 'error':
        return 'bg-red-900/20 border-red-700';
      case 'info':
      default:
        return 'bg-blue-900/20 border-blue-700';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start p-4 ${getBackgroundColor(notification.type)} rounded-lg border shadow-lg max-w-sm animate-slideIn`}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 mr-2">
            <p className="text-sm text-gray-100">{notification.message}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-200">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;