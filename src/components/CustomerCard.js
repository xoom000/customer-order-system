import React, { useState } from 'react';
import { Edit2, Trash2, ShoppingBag, X, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CustomerCard = ({ 
  customer = {},
  onDelete = () => {},
  onUpdate = () => {},
  onViewOrders = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleSave = () => {
    onUpdate(editedCustomer);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(customer.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-200">
        {/* Header Section */}
        <div
          onClick={() => !isEditing && setIsExpanded(!isExpanded)}
          className="p-6 cursor-pointer hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedCustomer.name}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-100">
                    {customer.name || "Unnamed Customer"}
                  </h3>
                </div>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-400 space-y-1 mt-2">
            <div>Products: {customer.productCount || "--"}</div>
            <div>Last Order: {customer.lastOrder || "--"}</div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-100 mb-2">Contact Details</h4>
                <div className="space-y-2">
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        value={editedCustomer.email}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={editedCustomer.phone}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                        placeholder="Phone"
                      />
                      <textarea
                        value={editedCustomer.address}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, address: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                        placeholder="Address"
                        rows={3}
                      />
                    </>
                  ) : (
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>Email: {customer.email || "--"}</div>
                      <div>Phone: {customer.phone || "--"}</div>
                      <div>Address: {customer.address || "--"}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => onViewOrders(customer.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md text-sm transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  View Orders
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md text-sm transition-colors"
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </>
                  )}
                </button>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Alert */}
      {showDeleteConfirm && (
        <Alert className="bg-gray-800 border-red-600">
          <AlertTitle className="text-red-500">
            Delete Customer?
          </AlertTitle>
          <AlertDescription>
            <div className="mt-2 text-gray-300">
              Are you sure you want to delete {customer.name}? This action cannot be undone.
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-2 bg-gray-700 text-gray-200 rounded-md text-sm hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CustomerCard;