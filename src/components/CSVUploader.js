import React from 'react';
import Papa from 'papaparse';
import { Upload } from 'lucide-react';

const CSVUploader = ({ onUpload }) => {
  const processCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const processedProducts = results.data
          .filter(product => product.SKU && product.Description)
          .map(product => {
            const totalRev = parseFloat(product['Total 2024 Rev']?.replace('$', '').replace(',', '')) || 0;
            const quantity = parseInt(product.Quantity) || 1;
            return {
              sku: product.SKU,
              name: product.Description.replace(/^"+|"+$/g, ''),
              vendor: product.Vendor,
              price: totalRev / quantity
            };
          });
        onUpload(processedProducts);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error.message);
      }
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) processCSV(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
      <label className="flex flex-col items-center justify-center w-full h-full">
        <Upload className="w-10 h-10 mb-3 text-gray-400" />
        <p className="mb-2 text-sm text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400">CSV file with product data</p>
        <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
      </label>
    </div>
  );
};

export default CSVUploader;
