import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [customerProducts, setCustomerProducts] = useState({});

  const addCustomer = (customer) => {
    setCustomers(prev => [...prev, customer]);
    setCustomerProducts(prev => ({ ...prev, [customer.id]: [] }));
  };

  const updateCustomerProducts = (customerId, products) => {
    setCustomerProducts(prev => ({ ...prev, [customerId]: products }));
  };

  return (
    <AppContext.Provider value={{
      customers,
      customerProducts,
      addCustomer,
      updateCustomerProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);