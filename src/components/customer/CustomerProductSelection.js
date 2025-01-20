import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Package, ChevronDown } from 'lucide-react';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/your-api-id'; // Replace with your SheetDB API URL

const CustomerProductSelection = ({ customerData = {} }) => {
  const [products, setProducts] = useState([]); // Dynamic products from Google Sheets
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const categories = [
    { id: 1, name: 'Bags' },
    { id: 2, name: 'Containers' },
    { id: 3, name: 'Cutlery' },
  ];

  // Fetch products from Google Sheets on component mount
  useEffect(() => {
    fetch(SHEETDB_URL)
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Set fetched products
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Filter products based on category and search term
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return (
        (!selectedCategory || product.category_id === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [products, selectedCategory, searchTerm]);

  const handleProductSelect = product => {
    setSelectedProducts([...selectedProducts, product]);
  };

  return (
    <div className="product-selection">
      <div className="filters">
        <div>
          <button onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}>
            Categories <ChevronDown />
          </button>
          {isCategoryMenuOpen && (
            <ul>
              {categories.map(category => (
                <li key={category.id} onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search />
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.sku} className="product-tile">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.base_price}</p>
            <button onClick={() => handleProductSelect(product)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProductSelection;