import React, { useState } from 'react';
import { User, AlertCircle, ArrowRight } from 'lucide-react';

const CustomerCreationFlow = () => {
  const [formData, setFormData] = useState({
    customerNumber: '',
    customerName: '',
    phone: '',
    address: '',
    deliveryDay: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validate customer number
    if (!formData.customerNumber) {
      newErrors.customerNumber = 'Customer number is required';
    } else if (formData.customerNumber.length !== 6 || !/^\d+$/.test(formData.customerNumber)) {
      newErrors.customerNumber = 'Customer number must be 6 digits';
    }

    // Validate customer name
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.deliveryDay) {
      newErrors.deliveryDay = 'Delivery day is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Proceed to next step
      console.log('Form is valid, proceeding...');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-gray-100">Add New Customer</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
              <span className="text-white font-semibold">1</span>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-100">Customer Information</h2>
              <p className="text-sm text-gray-400">Basic details to create customer page</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Number */}
            <div>
              <label 
                htmlFor="customerNumber" 
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Customer Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="customerNumber"
                  value={formData.customerNumber}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      customerNumber: e.target.value 
                    }));
                    if (errors.customerNumber) {
                      setErrors(prev => ({
                        ...prev,
                        customerNumber: ''
                      }));
                    }
                  }}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.customerNumber ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-gray-100 focus:outline-none focus:border-blue-500`}
                  placeholder="Enter 6-digit number"
                  maxLength={6}
                />
                {errors.customerNumber && (
                  <div className="absolute top-0 right-0 pr-3 flex items-center h-full">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.customerNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.customerNumber}</p>
              )}
              <p className="mt-1 text-sm text-gray-400">
                This number will be used in the customer's URL
              </p>
            </div>

            {/* Customer Name */}
            {/* Adding the new fields after Customer Name */}
            
            {/* Phone Number */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      phone: e.target.value 
                    }));
                    if (errors.phone) {
                      setErrors(prev => ({
                        ...prev,
                        phone: ''
                      }));
                    }
                  }}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-gray-100 focus:outline-none focus:border-blue-500`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <div className="absolute top-0 right-0 pr-3 flex items-center h-full">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label 
                htmlFor="address" 
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Delivery Address
              </label>
              <div className="mt-1 relative">
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      address: e.target.value 
                    }));
                    if (errors.address) {
                      setErrors(prev => ({
                        ...prev,
                        address: ''
                      }));
                    }
                  }}
                  rows={3}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.address ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 resize-none`}
                  placeholder="Enter delivery address"
                />
                {errors.address && (
                  <div className="absolute top-0 right-0 pr-3 flex items-center h-full">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            {/* Delivery Day */}
            <div>
              <label 
                htmlFor="deliveryDay" 
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Delivery Day
              </label>
              <div className="mt-1 relative">
                <select
                  id="deliveryDay"
                  value={formData.deliveryDay}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      deliveryDay: e.target.value 
                    }));
                    if (errors.deliveryDay) {
                      setErrors(prev => ({
                        ...prev,
                        deliveryDay: ''
                      }));
                    }
                  }}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.deliveryDay ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-gray-100 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Select delivery day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                {errors.deliveryDay && (
                  <div className="absolute top-0 right-0 pr-3 flex items-center h-full">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.deliveryDay && (
                <p className="mt-1 text-sm text-red-500">{errors.deliveryDay}</p>
              )}
            </div>

            {/* Customer Name */}
            <div>
              <label 
                htmlFor="customerName" 
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Customer Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      customerName: e.target.value 
                    }));
                    if (errors.customerName) {
                      setErrors(prev => ({
                        ...prev,
                        customerName: ''
                      }));
                    }
                  }}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.customerName ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-gray-100 focus:outline-none focus:border-blue-500`}
                  placeholder="Enter business name"
                />
                {errors.customerName && (
                  <div className="absolute top-0 right-0 pr-3 flex items-center h-full">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
              )}
              <p className="mt-1 text-sm text-gray-400">
                This name will appear as the page title
              </p>
            </div>

            {/* Preview */}
            {(formData.customerNumber || formData.customerName) && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Preview:</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">
                    URL: /customer/{formData.customerNumber || '------'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Title: {formData.customerName || 'Customer Name'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Phone: {formData.phone || '--'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Address: {formData.address || '--'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Delivery Day: {formData.deliveryDay || '--'}
                  </p>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 
                         bg-blue-600 hover:bg-blue-500 text-white rounded-lg
                         transition-colors gap-2"
              >
                Continue to Product Selection
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreationFlow;