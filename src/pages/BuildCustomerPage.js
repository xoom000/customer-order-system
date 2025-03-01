import React, { useState } from "react";

const BuildCustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addProduct = () => {
    setProducts([...products, { name: productName, price: productPrice }]);
    setProductName("");
    setProductPrice("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Build Customer Page</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {products.map((product, index) => (
          <div key={index} className="flex justify-between bg-gray-800 p-3 rounded-lg">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>
        ))}
        <div className="mt-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            placeholder="Product Name"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="ml-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            placeholder="Product Price"
          />
          <button
            onClick={addProduct}
            className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildCustomerPage;