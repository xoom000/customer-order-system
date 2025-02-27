import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Package, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ApiService from '../services/api';

const CustomerOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useApp();
  
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  // Load customer data on component mount
  useEffect(() => {
    fetchCustomerData();
  }, [id]);

  // Fetch customer data and products
  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      // For a real implementation, you'd have an endpoint to get customer details
      // For now, we'll use the search endpoint and filter for the customer ID
      const searchResult = await ApiService.searchCustomers(id);
      
      if (searchResult.customers && searchResult.customers.length > 0) {
        const customerData = searchResult.customers.find(c => c.customer_num === id);
        
        if (customerData) {
          setCustomer(customerData);
          
          // Convert customer items to products format
          const customerProducts = customerData.items.map(item => ({
            id: item.ItemNumber,
            name: item.Description,
            sku: item.ItemNumber,
            price: 0, // We don't have pricing in our API yet
            total: item.Total
          }));
          
          setProducts(customerProducts);
        } else {
          addNotification({
            type: 'error',
            message: 'Customer not found'
          });
          navigate('/admin');
        }
      } else {
        // If no customer is found, we could also try to load items by searching
        try {
          const itemsResult = await ApiService.searchItems('');
          if (itemsResult.items && itemsResult.items.length > 0) {
            const sampleProducts = itemsResult.items.slice(0, 5).map(item => ({
              id: item.item_number,
              name: item.description,
              sku: item.item_number,
              price: 10.99, // Sample price
              brand: 'Sample Brand'
            }));
            setProducts(sampleProducts);
          }
        } catch (itemError) {
          console.error('Error fetching items:', itemError);
        }
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      addNotification({
        type: 'error',
        message: 'Failed to load customer data'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update cart quantities
  const updateQuantity = (productId, increment) => {
    setCart(prevCart => {
      const currentQty = prevCart[productId]?.quantity || 0;
      const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);

      if (newQty === 0) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      }

      return {
        ...prevCart,
        [productId]: {
          quantity: newQty,
          price: products.find(p => p.id === productId)?.price || 0
        }
      };
    });
  };

  // Calculate order total
  const calculateTotal = () => {
    return Object.values(cart).reduce((total, item) => 
      total + (item.quantity * item.price), 0
    ).toFixed(2);
  };

  // Submit order
  const submitOrder = async () => {
    try {
      // Here you would implement the API call to submit the order
      // For now, we'll just show a success notification
      
      addNotification({
        type: 'success',
        message: 'Order submitted successfully'
      });
      
      // Clear cart
      setCart({});
    } catch (error) {
      console.error('Error submitting order:', error);
      addNotification({
        type: 'error',
        message: 'Failed to submit order'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-700 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">
                {customer ? customer.customer_name : `Customer #${id}`}
              </h1>
            </div>
            
            {Object.keys(cart).length > 0 && (
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6" />
                <span>${calculateTotal()}</span>
                <button 
                  onClick={submitOrder}
                  className="ml-4 px-3 py-1 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-1"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Order</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Product List */}
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {loading ? (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading customer products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 flex items-center justify-center bg-gray-700 rounded-md">
                      <Package className="h-8 w-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {product.brand || 'No brand'} • SKU: {product.sku}
                      </p>
                      <div className="mt-2 text-xl font-bold text-gray-200">
                        ${product.price?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="mt-4 flex items-center justify-end space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(product.id, false)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <Minus className="h-5 w-5" />
                      </button>

                      <span className="w-12 text-center font-medium text-lg">
                        {cart[product.id]?.quantity || 0}
                      </span>

                      <button
                        onClick={() => updateQuantity(product.id, true)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  {cart[product.id] && (
                    <div className="mt-2 text-right text-gray-400">
                      Total: ${(cart[product.id].quantity * (product.price || 0)).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-400">
              This customer doesn't have any products assigned yet.
            </p>
          </div>
        )}
      </div>

      {/* Order Total */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg border-t border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Order Total:</span>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold">${calculateTotal()}</span>
                <button
                  onClick={submitOrder}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-1"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderPage;