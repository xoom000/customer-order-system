import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State variables
  const [customers, setCustomers] = useState([]);
  const [customerProducts, setCustomerProducts] = useState({});
  const [routes, setRoutes] = useState([]);
  const [apiStatus, setApiStatus] = useState({ isLoading: true, isError: false });
  const [notifications, setNotifications] = useState([]);

  // Load initial data
  useEffect(() => {
    checkApiHealth();
  }, []);

  // Check API health
  const checkApiHealth = async () => {
    try {
      const health = await ApiService.checkHealth();
      setApiStatus({ 
        isLoading: false, 
        isError: false, 
        status: health.status,
        database: health.database 
      });
    } catch (error) {
      setApiStatus({ 
        isLoading: false, 
        isError: true, 
        error: error.message 
      });
      addNotification({ 
        type: 'error', 
        message: 'Failed to connect to the API server. Please check your connection.' 
      });
    }
  };

  // Add a notification
  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Customer methods
  const addCustomer = (customer) => {
    setCustomers(prev => [...prev, customer]);
    setCustomerProducts(prev => ({ ...prev, [customer.id]: [] }));
    addNotification({ 
      type: 'success', 
      message: `Customer "${customer.name}" added successfully.` 
    });
  };

  const updateCustomer = (customerId, updatedData) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId ? { ...customer, ...updatedData } : customer
      )
    );
    addNotification({ 
      type: 'success', 
      message: 'Customer updated successfully.' 
    });
  };

  const deleteCustomer = (customerId) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId));
    const { [customerId]: _, ...remainingProducts } = customerProducts;
    setCustomerProducts(remainingProducts);
    addNotification({ 
      type: 'success', 
      message: 'Customer deleted successfully.' 
    });
  };

  // Route methods
  const fetchRouteRequirements = async (routeNum, dayOfWeek) => {
    try {
      const data = await ApiService.getRouteRequirements(routeNum, dayOfWeek);
      return data;
    } catch (error) {
      addNotification({ 
        type: 'error', 
        message: `Error loading route ${routeNum}: ${error.message}` 
      });
      throw error;
    }
  };

  const fetchRouteCustomers = async (routeNum, dayOfWeek) => {
    try {
      const data = await ApiService.getRouteCustomerBreakdown(routeNum, dayOfWeek);
      return data;
    } catch (error) {
      addNotification({ 
        type: 'error', 
        message: `Error loading customers for route ${routeNum}: ${error.message}` 
      });
      throw error;
    }
  };

  // Product methods
  const updateCustomerProducts = (customerId, products) => {
    setCustomerProducts(prev => ({ ...prev, [customerId]: products }));
    addNotification({ 
      type: 'success', 
      message: `Updated ${products.length} products for customer.` 
    });
  };

  const searchItems = async (query) => {
    try {
      return await ApiService.searchItems(query);
    } catch (error) {
      addNotification({ 
        type: 'error', 
        message: `Error searching items: ${error.message}` 
      });
      throw error;
    }
  };

  // Route stop management
  const addRouteStop = async (routeData) => {
    try {
      const result = await ApiService.addRouteStop(routeData);
      addNotification({ 
        type: 'success', 
        message: `Added new stop to route ${routeData.route}.` 
      });
      return result;
    } catch (error) {
      addNotification({ 
        type: 'error', 
        message: `Error adding route stop: ${error.message}` 
      });
      throw error;
    }
  };

  const updateRouteStop = async (routeData) => {
    try {
      const result = await ApiService.updateRouteStop(routeData);
      addNotification({ 
        type: 'success', 
        message: `Updated stop on route ${routeData.route}.` 
      });
      return result;
    } catch (error) {
      addNotification({ 
        type: 'error', 
        message: `Error updating route stop: ${error.message}` 
      });
      throw error;
    }
  };

  const deleteRouteStop = async (routeData) => {
    try {
      const result = await ApiService.deleteRouteStop(routeData);
      addNotification({ 
        type: 'success', 
        message: `Removed stop from route ${routeData.route}.` 
      });
      return result;
    } catch (error) {
      addNotification({ 
        type: 'error', 
        message: `Error deleting route stop: ${error.message}` 
      });
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{
      // API status
      apiStatus,
      checkApiHealth,

      // Notifications
      notifications,
      addNotification,

      // Customer data
      customers,
      addCustomer,
      updateCustomer,
      deleteCustomer,

      // Product data
      customerProducts,
      updateCustomerProducts,
      searchItems,

      // Route data
      routes,
      fetchRouteRequirements,
      fetchRouteCustomers, 
      addRouteStop,
      updateRouteStop,
      deleteRouteStop
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);