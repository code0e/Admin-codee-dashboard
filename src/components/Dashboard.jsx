import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AdminContext } from "../context/AdminContext";

function Dashboard() {
  const { productList, orderList, customerList, resetAdminData } =
    useContext(AdminContext);

  const totalSales = orderList.reduce(function (total, order) {
    return total + order.total;
  }, 0);

  const totalOrders = orderList.length;
  const totalProducts = productList.length;
  const totalCustomers = customerList.length;

  const averageOrderValue = totalOrders === 0 ? 0 : totalSales / totalOrders;

  const pendingOrders = orderList.filter(function (order) {
    return order.status === "Pending";
  }).length;

  const processingOrders = orderList.filter(function (order) {
    return order.status === "Processing";
  }).length;

  const deliveredOrders = orderList.filter(function (order) {
    return order.status === "Delivered";
  }).length;

  const cancelledOrders = orderList.filter(function (order) {
    return order.status === "Cancelled";
  }).length;

  const lowStockProducts = productList.filter(function (product) {
    return product.stock > 0 && product.stock <= 3;
  }).length;

  const recentOrders = orderList.slice(-4);

  const salesData = orderList.map(function (order) {
    return {
      date: order.date,
      total: order.total,
    };
  });

  const categorySales = productList.reduce(function (categories, product) {
    const existingCategory = categories.find(function (category) {
      return category.category === product.category;
    });

    if (existingCategory) {
      existingCategory.sales += product.price;
    } else {
      categories.push({
        category: product.category,
        sales: product.price,
      });
    }

    return categories;
  }, []);

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome back to CODEE Admin.</p>

      <div className="stats">
        <div className="stat-card">
          <p>Total Sales</p>
          <h2>₦{totalSales.toLocaleString()}</h2>
        </div>

        <div className="stat-card">
          <p>Total Orders</p>
          <h2>{totalOrders}</h2>
        </div>

        <div className="stat-card">
          <p>Products</p>
          <h2>{totalProducts}</h2>
        </div>

        <div className="stat-card">
          <p>Customers</p>
          <h2>{totalCustomers}</h2>
        </div>
      </div>

      <div className="analytics-stats">
        <div className="analytics-card">
          <p>Average Order Value</p>
          <h2>₦{Math.round(averageOrderValue).toLocaleString()}</h2>
        </div>

        <div className="analytics-card">
          <p>Pending Orders</p>
          <h2>{pendingOrders}</h2>
        </div>

        <div className="analytics-card">
          <p>Low Stock Products</p>
          <h2>{lowStockProducts}</h2>
        </div>
      </div>

      <section className="recent-orders">
        <h2>Recent Orders</h2>

        <div className="recent-orders-list">
          {recentOrders.length === 0 ? (
            <p>No recent orders.</p>
          ) : (
            recentOrders.map(function (order) {
              return (
                <div className="recent-order" key={order.id}>
                  <span>#{order.id}</span>
                  <span>{order.customer}</span>
                  <span>₦{order.total.toLocaleString()}</span>
                  <span>{order.status}</span>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="sales-overview">
        <h2>Sales Overview</h2>

        <div className="sales-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid stroke="#222" />

              <XAxis dataKey="date" stroke="#777" />

              <YAxis stroke="#777" />

              <Tooltip
                contentStyle={{
                  background: "#151515",
                  border: "1px solid #333",
                  color: "white",
                }}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#39ff88"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="category-sales">
        <h2>Sales by Category</h2>

        <div className="category-sales-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categorySales}>
              <CartesianGrid stroke="#222" />

              <XAxis dataKey="category" stroke="#777" />

              <YAxis stroke="#777" />

              <Tooltip
                contentStyle={{
                  background: "#151515",
                  border: "1px solid #333",
                  color: "white",
                }}
              />

              <Legend />

              <Bar dataKey="sales" fill="#39ff88" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="order-summary">
        <h2>Order Status</h2>

        <div>
          <p>Pending: {pendingOrders}</p>
          <p>Processing: {processingOrders}</p>
          <p>Delivered: {deliveredOrders}</p>
          <p>Cancelled: {cancelledOrders}</p>
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="quick-actions-buttons">
          <Link to="/products">Manage Products</Link>
          <Link to="/orders">Manage Orders</Link>
          <Link to="/customers">View Customers</Link>

          <button
            className="reset-button"
            onClick={() => {
              const confirmed = window.confirm(
                "Reset all admin data to the original CODEE data?",
              );

              if (confirmed) {
                resetAdminData();
              }
            }}
          >
            Reset Data
          </button>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
