// API configuration
const API_BASE_URL = 'https://route33.app/api';

/**
 * API Service for interacting with the Linen Service API
 */
const ApiService = {
  /**
   * Fetch route requirements for a specific route and day
   * @param {number} routeNum - Route number
   * @param {string} dayOfWeek - Day of the week (e.g., "Monday")
   * @returns {Promise} Promise resolving to route data
   */
  async getRouteRequirements(routeNum, dayOfWeek) {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/${routeNum}/${dayOfWeek}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching route requirements:', error);
      throw error;
    }
  },

  /**
   * Fetch customer breakdown for a specific route and day
   * @param {number} routeNum - Route number
   * @param {string} dayOfWeek - Day of the week (e.g., "Monday")
   * @returns {Promise} Promise resolving to customer breakdown data
   */
  async getRouteCustomerBreakdown(routeNum, dayOfWeek) {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/${routeNum}/${dayOfWeek}/customers`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching route customer breakdown:', error);
      throw error;
    }
  },

  /**
   * Search for customers
   * @param {string} query - Search term
   * @param {number} page - Page number for pagination
   * @returns {Promise} Promise resolving to customer search results
   */
  async searchCustomers(query, page = 1) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/customers/search?q=${encodeURIComponent(query)}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  },

  /**
   * Search for items
   * @param {string} query - Search term
   * @returns {Promise} Promise resolving to item search results
   */
  async searchItems(query) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/items/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching items:', error);
      throw error;
    }
  },

  /**
   * Get details for a specific item
   * @param {number} itemNumber - Item ID number
   * @returns {Promise} Promise resolving to item details
   */
  async getItemDetails(itemNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemNumber}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching item details:', error);
      throw error;
    }
  },
  
  /**
   * Add a new route stop
   * @param {Object} routeData - Route data object
   * @returns {Promise} Promise resolving to response data
   */
  async addRouteStop(routeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding route stop:', error);
      throw error;
    }
  },

  /**
   * Update an existing route stop
   * @param {Object} routeData - Route data object
   * @returns {Promise} Promise resolving to response data
   */
  async updateRouteStop(routeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating route stop:', error);
      throw error;
    }
  },

  /**
   * Delete a route stop
   * @param {Object} routeData - Route data for the stop to delete
   * @returns {Promise} Promise resolving to response data
   */
  async deleteRouteStop(routeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting route stop:', error);
      throw error;
    }
  },
  
  /**
   * Check the health status of the API
   * @returns {Promise} Promise resolving to health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
};

export default ApiService;