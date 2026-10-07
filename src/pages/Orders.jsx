import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

function Orders() {
  const { orderList, setOrderList } = useContext(AdminContext);

  const [status, setStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [adminStatus, setAdminStatus] = useState("");

  const [search, setSearch] = useState("");
  const filteredOrders = orderList.filter(function (order) {
    const matchesStatus = status === "all" || order.status === status;

    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      String(order.id).includes(search);

    return matchesStatus && matchesSearch;
  });

  function getAllowedStatuses(currentStatus) {
    if (currentStatus === "Pending") {
      return ["Processing", "Cancelled"];
    }

    if (currentStatus === "Processing") {
      return ["Delivered", "Cancelled"];
    }

    return [];
  }

  function handleStatusUpdate() {
    if (!adminStatus) {
      return;
    }

    const updatedOrders = orderList.map(function (order) {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          status: adminStatus,
        };
      }

      return order;
    });

    setOrderList(updatedOrders);

    setSelectedOrder({
      ...selectedOrder,
      status: adminStatus,
    });

    setAdminStatus("");
  }

  return (
    <main className="dashboard">
      <h1>Orders</h1>
      <p>Manage CODEE customer orders here.</p>

      <div className="order-search">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="order-filters">
        <button onClick={() => setStatus("all")}>All</button>
        <button onClick={() => setStatus("Pending")}>Pending</button>
        <button onClick={() => setStatus("Processing")}>Processing</button>
        <button onClick={() => setStatus("Delivered")}>Delivered</button>
        <button onClick={() => setStatus("Cancelled")}>Cancelled</button>
      </div>

      <div className="orders-table">
        <div className="orders-header">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span>Date</span>
          <span>Action</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <h3>No orders found</h3>
            <p>Try changing your search or status filter.</p>
          </div>
        ) : (
          filteredOrders.map(function (order) {
            return (
              <div className="orders-row" key={order.id}>
                <span>#{order.id}</span>

                <span>{order.customer}</span>

                <span>{order.items}</span>

                <span>₦{order.total.toLocaleString()}</span>

                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>

                <span>{order.date}</span>

                <button
                  className="view-order-button"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </div>
            );
          })
        )}
      </div>

      {selectedOrder && (
        <div className="order-details">
          <div className="order-details-header">
            <div>
              <p>Order Details</p>
              <h2>#{selectedOrder.id}</h2>
            </div>

            <button
              className="close-details-button"
              onClick={() => {
                setSelectedOrder(null);
                setAdminStatus("");
              }}
            >
              Close
            </button>
          </div>

          <div className="order-info-grid">
            <div className="order-info-card">
              <p>Customer</p>
              <h3>{selectedOrder.customer}</h3>
            </div>

            <div className="order-info-card">
              <p>Items</p>
              <h3>{selectedOrder.items}</h3>
            </div>

            <div className="order-info-card">
              <p>Total</p>
              <h3>₦{selectedOrder.total.toLocaleString()}</h3>
            </div>

            <div className="order-info-card">
              <p>Date</p>
              <h3>{selectedOrder.date}</h3>
            </div>
          </div>

          <div className="order-current-status">
            <p>Current Status</p>

            <span
              className={`order-status ${selectedOrder.status.toLowerCase()}`}
            >
              {selectedOrder.status}
            </span>
          </div>

          <div className="status-update">
            <select
              value={adminStatus}
              onChange={(event) => setAdminStatus(event.target.value)}
            >
              <option value="">Select next status</option>

              {getAllowedStatuses(selectedOrder.status).map(function (status) {
                return (
                  <option value={status} key={status}>
                    {status}
                  </option>
                );
              })}
            </select>

            <button onClick={handleStatusUpdate} disabled={!adminStatus}>
              Update Status
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Orders;
