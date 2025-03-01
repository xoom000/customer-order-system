import React from 'react';
import { Wifi, WifiOff, RotateCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ApiStatusIndicator = () => {
  const { apiStatus, checkApiHealth } = useApp();

  const handleRefresh = () => {
    checkApiHealth();
  };

  // Don't show until we've checked the API status
  if (apiStatus.isLoading) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 z-50 flex items-center rounded-full px-3 py-1 ${
      apiStatus.isError ? 'bg-red-800/60' : 'bg-green-800/60'
    } shadow-lg cursor-pointer group`}
    onClick={handleRefresh}
    title="Click to refresh API status"
    >
      {apiStatus.isError ? (
        <>
          <WifiOff className="h-4 w-4 text-red-300 mr-2" />
          <span className="text-xs text-red-200">API Offline</span>
        </>
      ) : (
        <>
          <Wifi className="h-4 w-4 text-green-300 mr-2" />
          <span className="text-xs text-green-200">API Connected</span>
        </>
      )}
      <RotateCw className="h-3 w-3 ml-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default ApiStatusIndicator;