# MissionData Web App Installation Guide

This guide will help you set up the MissionData web application, which connects to your existing MissionData API.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Your MissionData API running on your server (already set up)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/customer-order-system.git
cd customer-order-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

Open the file `src/services/api.js` and update the `API_BASE_URL` to point to your API server:



### 4. Start the Development Server

```bash
npm start
```

This will start the web application on http://localhost:3000

## Building for Production

When you're ready to deploy your application to production:

```bash
npm run build
```

This will create a `build` directory with optimized production files.

## Deployment Options

### Option 1: Host on Your Server

You can host the built web app on the same server where your API is running:

1. Build the app as described above
2. Copy the contents of the `build` directory to your web server
3. Configure your server to serve the web app

### Option 2: Deploy to a Static Hosting Service

You can deploy the web app to services like Vercel, Netlify, or GitHub Pages:

1. Create an account on your preferred service
2. Follow their instructions for deploying a React application
3. Make sure to configure the API endpoint correctly for production

## Usage Guide

### Main Features

1. **Landing Page**
   - Enter customer number to access customer-specific order page
   - Special admin access through customer code '171936'

2. **Admin Dashboard**
   - View all customers
   - Add, edit, and delete customers
   - Access route management

3. **Route Management**
   - View route requirements by route number and day
   - See detailed customer breakdown for routes
   - Add, edit, and remove items from routes

4. **Customer Order Page**
   - View all customer products
   - Add items to cart and adjust quantities
   - Submit orders

## Troubleshooting

### API Connection Issues

If you're having trouble connecting to the API:

1. Make sure the API server is running
2. Check that the API URL is correctly configured in `src/services/api.js`
3. Check for any firewall or CORS issues
4. Verify that your API endpoints match the expected format

### Browser Console Errors

If you see errors in the browser console:

1. Check the browser console (F12) for specific error messages
2. Verify that your API responses match the expected format
3. Look for any JavaScript errors in your application code

## Need Help?

If you encounter issues not covered by this guide, please:

1. Check the GitHub repository for known issues
2. Open a new issue with detailed information about your problem
3. Contact the development team for support