import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

function Customers() {
  const { customerList } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customerList.filter(function (customer) {
    const searchValue = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue)
    );
  });

  return (
    <main className="dashboard">
      <h1>Customers</h1>
      <p>Manage CODEE customers here.</p>

      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="customers-table">
        <div className="customers-header">
          <span>Name</span>
          <span>Email</span>
          <span>Orders</span>
          <span>Total Spent</span>
          <span>Action</span>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="empty-state">
            <h3>No customers found</h3>
            <p>Try changing your search.</p>
          </div>
        ) : (
          filteredCustomers.map(function (customer) {
            return (
              <div className="customer-row" key={customer.id}>
                <span>{customer.name}</span>
                <span>{customer.email}</span>
                <span>{customer.orders}</span>
                <span>₦{customer.totalSpent.toLocaleString()}</span>

                <button onClick={() => setSelectedCustomer(customer)}>
                  View
                </button>
              </div>
            );
          })
        )}
      </div>

      {selectedCustomer && (
        <div className="customer-details">
          <div className="customer-details-header">
            <div>
              <p>Customer Profile</p>
              <h2>{selectedCustomer.name}</h2>
            </div>

            <button
              className="close-details-button"
              onClick={() => setSelectedCustomer(null)}
            >
              Close
            </button>
          </div>

          <div className="customer-info-grid">
            <div className="customer-info-card">
              <p>Email</p>
              <h3>{selectedCustomer.email}</h3>
            </div>

            <div className="customer-info-card">
              <p>Total Orders</p>
              <h3>{selectedCustomer.orders}</h3>
            </div>

            <div className="customer-info-card">
              <p>Total Spent</p>
              <h3>₦{selectedCustomer.totalSpent.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Customers;
