import React, { useState } from 'react';
import { Upload, ChevronDown, Users, Package, Calendar, Settings, Plus, X } from 'lucide-react';
import CustomerCard from '../components/CustomerCard';

// CustomerEditModal Component with accessibility and validation
const CustomerEditModal = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^\+?\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSave({ id: customer.id, ...formData });
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  // Focus trap setup would go here in a full implementation

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-100">
            Edit Customer Details
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Business Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                       text-gray-100 focus:outline-none focus:border-blue-500"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400" role="alert">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                       text-gray-100 focus:outline-none focus:border-blue-500"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400" role="alert">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: e.target.value }));
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                       text-gray-100 focus:outline-none focus:border-blue-500"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400" role="alert">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                       text-gray-100 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 
                       text-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 
                       text-white rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Customer Card Component
const CustomerCard = ({ customer, onCustomerUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-6 cursor-pointer"
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            {customer?.name || 'Unnamed Customer'}
          </h3>
          <div className="text-sm text-gray-400 space-y-1">
            <div>Products: {customer?.productCount || '--'}</div>
            <div>Last Order: {customer?.lastOrder || '--'}</div>
          </div>

          <div className="mt-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white 
                       rounded-md text-sm transition-colors"
            >
              Quick Order
            </button>
          </div>
        </div>

        <div 
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 border-t border-gray-700">
            <h4 className="text-lg font-medium text-gray-100 mb-2">
              Contact Information
            </h4>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Email: {customer?.email || '--'}</div>
              <div>Phone: {customer?.phone || '--'}</div>
              <div>Address: {customer?.address || '--'}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {['Edit Details', 'Manage Products', 'View Schedule', 'Contact List'].map(action => (
                <button
                  key={action}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (action === 'Edit Details') {
                      setShowEditModal(true);
                    }
                  }}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 
                           rounded-md text-sm transition-colors flex items-center 
                           justify-center gap-2"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <CustomerEditModal
          customer={customer}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedData) => {
            onCustomerUpdate(updatedData.id, updatedData);
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [customers, setCustomers] = useState([
    {
      id: '1', // Changed to string ID for better uniqueness
      name: "Huffs @ Bridge Bay",
      productCount: 24,
      lastOrder: "2/1/24",
      email: "huffs@example.com",
      phone: "(555) 123-4567",
      address: "123 Bridge Bay Rd"
    },
    {
      id: '2',
      name: "Fusion Lounge",
      productCount: 12,
      email: "fusion@example.com",
      phone: "(555) 987-6543",
      address: "456 Main St"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-black text-blue-400 select-none">
            33
          </div>
          <h1 className="text-xl font-semibold text-gray-100">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <main className="p-6">
        <section className="mb-12">
          {/* DatabaseUploader component will go here */}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100 mb-6">
            Customers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map(customer => (
              <CustomerCard 
                key={customer.id}
                customer={customer}
                onCustomerUpdate={(id, updatedData) => {
                  setCustomers(prevCustomers => 
                    prevCustomers.map(c => 
                      c.id === id ? { ...c, ...updatedData } : c
                    )
                  );
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;