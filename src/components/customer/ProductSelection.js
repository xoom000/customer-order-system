import React, { useState } from 'react';
import { Search, Plus, Package, ChevronDown } from 'lucide-react';

const CustomerProductSelection = ({ customerData = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const categories = [
    { id: 1, name: 'Paper Products' },
    { id: 2, name: 'Food Service' },
    { id: 3, name: 'Food Packaging/Togo' },
    { id: 4, name: 'Can Liners' },
    { id: 5, name: 'Gloves' },
    { id: 6, name: 'Cups and Lids' },
    { id: 7, name: 'Chemicals' },
    { id: 8, name: 'Supplies' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Mobile Categories Dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          className="w-full px-4 py-3 bg-gray-800 flex items-center justify-between text-gray-100"
        >
          <span className="text-lg">Categories</span>
          <ChevronDown className={`h-5 w-5 transform transition-transform ${
            isCategoryMenuOpen ? 'rotate-180' : ''
          }`} />
        </button>
        
        {isCategoryMenuOpen && (
          <div className="bg-gray-800 border-t border-gray-700">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setIsCategoryMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex lg:flex-row flex-col">
        {/* Desktop Sidebar - Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-52 lg:flex-col bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-100 mb-4">Categories</h2>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample Product Card */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-100">4 LB KRAFT GROCERY BAG</h3>
                    <p className="text-sm text-gray-400 mt-1">SKU: 99350583</p>
                    <p className="text-sm text-gray-400">$16.95</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Category: Food Service • Vendor: R3 San Francisco
                    </p>
                  </div>
                  <button className="ml-4 p-2 text-blue-400 hover:bg-gray-700 rounded-lg">
                    <Package className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Fixed on Mobile */}
      <div className="border-t border-gray-700 bg-gray-800">
        {/* Selected Products Counter */}
        <div className="px-4 py-2 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">
              {selectedProducts.length} products selected
            </span>
            <button className="text-sm text-blue-400">
              View Selected
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex gap-4">
          <button className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg">
            Back
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Continue
          </button>
        </div>
      </div>

      {/* Add New Product Button - Fixed on Mobile */}
      <button className="lg:hidden fixed right-4 bottom-24 p-3 bg-blue-600 text-white rounded-full shadow-lg">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default CustomerProductSelection;