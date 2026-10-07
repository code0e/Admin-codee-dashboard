import AdminLayout from "./components/AdminLayout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

import Login from "./pages/Login";

import { AdminProvider } from "./context/AdminProvider";

import "./App.css";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/products"
            element={
              <AdminLayout>
                <Products />
              </AdminLayout>
            }
          />

          <Route
            path="/orders"
            element={
              <AdminLayout>
                <Orders />
              </AdminLayout>
            }
          />

          <Route
            path="/customers"
            element={
              <AdminLayout>
                <Customers />
              </AdminLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
