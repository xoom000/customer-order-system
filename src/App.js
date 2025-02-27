import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import BuildCustomerPage from "./pages/BuildCustomerPage";
import CustomerOrderPage from "./pages/CustomerOrderPage";
import RouteManagementPage from "./pages/RouteManagementPage";
import NotificationToast from "./components/NotificationToast";
import ApiStatusIndicator from "./components/ApiStatusIndicator";

function App() {
  return (
    <AppProvider>
      <Router>
        <NotificationToast />
        <ApiStatusIndicator />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/routes" element={<RouteManagementPage />} />
          <Route path="/build-customer/:customerName" element={<BuildCustomerPage />} />
          <Route path="/customer/:id" element={<CustomerOrderPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;