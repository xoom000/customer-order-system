import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import BuildCustomerPage from "./pages/BuildCustomerPage";
import CustomerOrderPage from "./pages/CustomerOrderPage";
import CustomerCard from '../components/CustomerCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/build-customer/:customerName" element={<BuildCustomerPage />} />
        <Route path="/customer/:id" element={<CustomerOrderPage />} />
        <Route path="/test" element={<TestCustomerTiles />} /> {/* Test route */}
      </Routes>
    </Router>
  );
}

export default App;