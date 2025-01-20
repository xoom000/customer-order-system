import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Check, X, Upload } from 'lucide-react';

const AdminCustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleProductEdit = (product) => {
    setEditingProduct(product);
  };

  const saveProductEdit = () => {
    setProducts(prev => 
      prev.map(p => p.sku === editingProduct.sku ? editingProduct : p)
    );
    setEditingProduct(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Add CSV processing logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-700 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Customer #{id}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Products</span>
                </div>
              </label>
              
              <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                Preview Customer View
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid gap-4">
          {products.map(product => (
            <div key={product.sku} className="bg-gray-800 rounded-lg shadow-lg p-4">
              {editingProduct?.sku === product.sku ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value)
                    })}
                    className="w-32 px-3 py-2 bg-gray-700 rounded border border-gray-600"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={saveProductEdit}
                      className="p-2 text-green-500 hover:text-green-400"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="p-2 text-red-500 hover:text-red-400"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-400">SKU: {product.sku}</p>
                    <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleProductEdit(product)}
                    className="p-2 text-gray-400 hover:text-gray-300"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerView;