import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const CustomerOrderPage = () => {
  const [cart, setCart] = useState({});

  // Sample product data - this would come from your database later
  const products = [
    {
      id: 1,
      name: "Polycoated Hot Paper Cups, 20 oz, White, 600/Carton",
      brand: "Dart",
      vendor: "Essendant",
      mpn: "420W-2050",
      sku: "99532689",
      price: 89.10,
      image: "/api/placeholder/200/200"
    },
    // Add more products here as needed
  ];

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
          price: products.find(p => p.id === productId).price
        }
      };
    });
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((total, item) => 
      total + (item.quantity * item.price), 0
    ).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Customer Name</h1>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Product List */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {products.map(product => (
          <div key={product.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md bg-gray-700"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {product.brand} • {product.mpn}
                  </p>
                  <div className="mt-2 text-xl font-bold text-gray-200">
                    ${product.price.toFixed(2)}
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
                  Total: ${(cart[product.id].quantity * product.price).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Total */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Order Total:</span>
              <span className="text-xl font-bold">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderPage;