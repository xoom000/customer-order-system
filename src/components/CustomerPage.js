import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerPage = () => {
  const location = useLocation();
  const products = location.state?.products || [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Customer Page</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-lg font-bold">Products</h2>
        <div className="grid gap-4 mt-4">
          {products.map((product) => (
            <div key={product.sku} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="font-medium text-lg text-gray-100">{product.name}</h3>
              <p className="text-gray-400 text-sm">SKU: {product.sku}</p>
              <p className="text-gray-400 text-sm">Vendor: {product.vendor}</p>
              <p className="text-gray-400 text-sm">Price: ${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
