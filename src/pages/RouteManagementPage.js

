import React, { useState, useEffect } from 'react';
import { ArrowLeft, Truck, Calendar, Plus, Edit2, Trash2, Package, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const RouteManagementPage = () => {
  const navigate = useNavigate();
  const { 
    fetchRouteRequirements, 
    fetchRouteCustomers,
    addRouteStop,
    updateRouteStop,
    deleteRouteStop,
    addNotification
  } = useApp();

  // State
  const [routeNumber, setRouteNumber] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [routeData, setRouteData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newStop, setNewStop] = useState({
    route: '',
    day: 'Monday',
    customer_num: '',
    name: '',
    item_number: '',
    description: '',
    total: 1
  });

  // Days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Fetch route data when route number and day change
  useEffect(() => {
    if (routeNumber) {
      loadRouteData();
    }
  }, [routeNumber, dayOfWeek]);

  // Load route data
  const loadRouteData = async () => {
    if (!routeNumber) return;
    
    setLoading(true);
    try {
      const data = await fetchRouteRequirements(routeNumber, dayOfWeek);
      setRouteData(data);
      
      // Also fetch customer breakdown
      const customers = await fetchRouteCustomers(routeNumber, dayOfWeek);
      setCustomerData(customers);
    } catch (error) {
      console.error('Error loading route data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to load route
  const handleLoadRoute = (e) => {
    e.preventDefault();
    loadRouteData();
  };

  // Handle adding a new stop
  const handleAddStop = async () => {
    try {
      // Update the route number from the current view
      const stopData = {
        ...newStop,
        route: routeNumber,
        day: dayOfWeek
      };
      
      await addRouteStop(stopData);
      setIsAddingStop(false);
      setNewStop({
        route: '',
        day: 'Monday',
        customer_num: '',
        name: '',
        item_number: '',
        description: '',
        total: 1
      });
      
      // Reload route data
      loadRouteData();
    } catch (error) {
      console.error('Error adding stop:', error);
    }
  };

  // Handle updating a stop
  const handleUpdateStop = async () => {
    try {
      await updateRouteStop(editingItem);
      setEditingItem(null);
      loadRouteData();
    } catch (error) {
      console.error('Error updating stop:', error);
    }
  };

  // Handle deleting a stop
  const handleDeleteStop = async (customer_num, item_number) => {
    try {
      await deleteRouteStop({
        route: routeNumber,
        day: dayOfWeek,
        customer_num,
        item_number
      });
      loadRouteData();
    } catch (error) {
      console.error('Error deleting stop:', error);
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
              <h1 className="text-xl font-bold">Route Management</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Route Selection Form */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Select Route
          </h2>
          
          <form onSubmit={handleLoadRoute} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Route Number</label>
              <input
                type="number"
                value={routeNumber}
                onChange={(e) => setRouteNumber(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                placeholder="Enter route number"
                required
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Day of Week</label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load Route'}
              </button>
            </div>
          </form>
        </div>

        {/* Route Data */}
        {routeData && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Route {routeNumber} - {dayOfWeek}
              </h2>
              
              <button
                onClick={() => setIsAddingStop(true)}
                className="px-3 py-1 bg-green-600 rounded-lg text-sm flex items-center gap-1 hover:bg-green-500 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Stop
              </button>
            </div>
            
            {/* Route Items Summary */}
            {routeData.items && routeData.items.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-2">Route Totals:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {routeData.items.map((item, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.Description}</div>
                        <div className="text-sm text-gray-400">#{item.ItemNumber}</div>
                      </div>
                      <div className="font-bold text-lg">{item.TotalUnits}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 mb-6">No items on this route.</div>
            )}
            
            {/* Customer Breakdown */}
            {customerData && customerData.customers && customerData.customers.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Customer Breakdown:</h3>
                {customerData.customers.map((customer, index) => (
                  <div key={index} className="mb-4 bg-gray-700 p-3 rounded-lg">
                    <div className="font-medium mb-2">{customer.name} (ID: {customer.customer_num})</div>
                    
                    <div className="space-y-2">
                      {customer.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-gray-600 p-2 rounded flex justify-between items-center">
                          {editingItem && editingItem.customer_num === customer.customer_num && editingItem.item_number === item.item_number ? (
                            <div className="flex-1 flex items-center gap-2">
                              <div className="flex-1">
                                <div>{item.description}</div>
                                <div className="text-xs text-gray-400">#{item.item_number}</div>
                              </div>
                              <input
                                type="number"
                                value={editingItem.total}
                                onChange={(e) => setEditingItem({...editingItem, total: parseInt(e.target.value) || 1})}
                                className="w-20 px-2 py-1 bg-gray-500 border border-gray-400 rounded"
                                min="1"
                              />
                              <button
                                onClick={handleUpdateStop}
                                className="p-1 text-green-400 hover:bg-gray-500 rounded"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setEditingItem(null)}
                                className="p-1 text-red-400 hover:bg-gray-500 rounded"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex-1">
                                <div>{item.description}</div>
                                <div className="text-xs text-gray-400">#{item.item_number}</div>
                              </div>
                              <div className="font-semibold mr-4">{item.total} units</div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => setEditingItem({
                                    route: routeNumber,
                                    day: dayOfWeek,
                                    customer_num: customer.customer_num,
                                    item_number: item.item_number,
                                    total: item.total
                                  })}
                                  className="p-1 text-blue-400 hover:bg-gray-500 rounded mr-1"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStop(customer.customer_num, item.item_number)}
                                  className="p-1 text-red-400 hover:bg-gray-500 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add New Stop Form */}
        {isAddingStop && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Stop
              </h2>
              <button
                onClick={() => setIsAddingStop(false)}
                className="p-1 text-gray-400 hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Customer ID</label>
                <input
                  type="text"
                  value={newStop.customer_num}
                  onChange={(e) => setNewStop({...newStop, customer_num: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Customer ID number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={newStop.name}
                  onChange={(e) => setNewStop({...newStop, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Customer name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Item Number</label>
                <input
                  type="text"
                  value={newStop.item_number}
                  onChange={(e) => setNewStop({...newStop, item_number: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Item number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Item Description</label>
                <input
                  type="text"
                  value={newStop.description}
                  onChange={(e) => setNewStop({...newStop, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Item description"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Quantity</label>
                <input
                  type="number"
                  value={newStop.total}
                  onChange={(e) => setNewStop({...newStop, total: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Quantity"
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddStop}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors"
              >
                Add Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteManagementPage;