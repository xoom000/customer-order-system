import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Users, Package, PlusCircle } from "lucide-react";
import CustomerCard from '../components/CustomerCard';
import { useApp } from '../context/AppContext';

const AdminPage = () => {
  const navigate = useNavigate();
  const { 
    searchCustomers, 
    apiStatus, 
    addNotification,
  } = useApp();
  
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch customers on initial load
  useEffect(() => {
    if (!apiStatus.isError) {
      fetchCustomers();
    }
  }, [apiStatus]);

  // Fetch customers when search term or page changes
  useEffect(() => {
    if (searchTerm || currentPage > 1) {
      fetchCustomers();
    }
  }, [searchTerm, currentPage]);

  // Fetch customers from API
  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await searchCustomers(searchTerm, currentPage);
      
      if (data.customers) {
        // Map API data to match CustomerCard properties
        const formattedCustomers = data.customers.map((customer) => ({
          id: customer.customer_num,
          name: customer.customer_name || "Unnamed Customer",
          email: customer.email || "--",
          phone: customer.phone || "--",
          address: customer.address || "--",
          productCount: customer.items?.length || 0,
          lastOrder: customer.service_day || "--"
        }));

        setCustomers(formattedCustomers);
        setTotalPages(data.total_pages || 1);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      addNotification({
        type: "error",
        message: "Failed to load customer data."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle customer update
  const handleCustomerUpdate = async (updatedCustomer) => {
    // Here you would implement the API call to update a customer
    // For now, we'll just update the local state
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    
    addNotification({
      type: "success",
      message: `Customer ${updatedCustomer.name} updated successfully.`
    });
  };

  // Handle customer deletion
  const handleCustomerDelete = async (customerId) => {
    // Here you would implement the API call to delete a customer
    // For now, we'll just update the local state
    setCustomers(prevCustomers =>
      prevCustomers.filter(customer => customer.id !== customerId)
    );
    
    addNotification({
      type: "success",
      message: "Customer deleted successfully."
    });
  };

  // Handle viewing customer orders
  const handleViewOrders = (customerId) => {
    navigate(`/customer/${customerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-black text-blue-400 select-none">33</div>
            <h1 className="text-xl font-semibold text-gray-100">
              Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/routes")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <Truck className="h-4 w-4" />
              <span className="hidden md:inline">Manage Routes</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden md:inline">Add Customer</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="p-6">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Customer List */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Customers {customers.length > 0 ? `(${customers.length})` : ''}
          </h2>

          {isLoading ? (
            <div className="text-gray-400 text-center p-8">Loading customers...</div>
          ) : customers.length > 0 ? (
            <>
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
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1 
                          ? 'bg-gray-700 text-gray-500' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <span className="text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages 
                          ? 'bg-gray-700 text-gray-500' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No customers found</h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? `No customers match "${searchTerm}"`
                  : "No customers have been added yet"
                }
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;