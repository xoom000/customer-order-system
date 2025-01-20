import React, { useState } from 'react';

const CustomerCard = ({ customer, onCustomerUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold text-gray-100">{customer.name}</h3>
        <p className="text-gray-400">{customer.email}</p>
      </div>

      {isExpanded && (
        <div className="p-6">
          <p className="text-gray-400">Phone: {customer.phone}</p>
          <p className="text-gray-400">Address: {customer.address}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;