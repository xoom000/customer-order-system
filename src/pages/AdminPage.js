import React, { useState, useEffect } from "react";
import CustomerCard from '../components/CustomerCard';

const SHEETDB_URL = "https://sheetdb.io/api/v1/61cdria7qz41x";

const AdminPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(SHEETDB_URL);
      const data = await response.json();
      
      // Filter for specific territory
      const filteredData = data.filter(
        (customer) => customer.Territory === "2502-33"
      );

      // Map API fields to match CustomerCard properties
      const formattedCustomers = filteredData.map((customer) => ({
        id: customer.id,
        name: customer.dlvr_name || "Unnamed Customer",
        email: customer.dlvr_email || "--",
        phone: customer.dlvr_phone || "--",
        address: customer.dlvr_Addr || "--",
        productCount: customer.WeeksVisited || "--",
        lastOrder: customer.DaysVisited || "--"
      }));

      setCustomers(formattedCustomers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customer data.");
      setIsLoading(false);
    }
  };

  // Handle customer update
  const handleCustomerUpdate = async (updatedCustomer) => {
    try {
      const response = await fetch(`${SHEETDB_URL}/id/${updatedCustomer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            dlvr_name: updatedCustomer.name,
            dlvr_email: updatedCustomer.email,
            dlvr_phone: updatedCustomer.phone,
            dlvr_Addr: updatedCustomer.address
          }
        })
      });

      if (response.ok) {
        // Update local state
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
          )
        );
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // Handle customer deletion
  const handleCustomerDelete = async (customerId) => {
    try {
      const response = await fetch(`${SHEETDB_URL}/id/${customerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove from local state
        setCustomers(prevCustomers =>
          prevCustomers.filter(customer => customer.id !== customerId)
        );
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Handle viewing customer orders
  const handleViewOrders = (customerId) => {
    window.location.href = `/customer/${customerId}/orders`;
  };

  if (isLoading) {
    return <div className="text-gray-100 text-center p-6">Loading customers...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-black text-blue-400 select-none">33</div>
          <h1 className="text-xl font-semibold text-gray-100">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <main className="p-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-100 mb-6">
            Customers ({customers.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onDelete={handleCustomerDelete}
                onUpdate={handleCustomerUpdate}
                onViewOrders={handleViewOrders}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;