import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("codee-auth");
    navigate("/login");
  }

  return (
    <>
      <header className="mobile-header">
        <h1 className="mobile-logo">CODEE</h1>

        <button
          className="hamburger-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {menuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <h1 className="sidebar-logo">CODEE</h1>

          <button className="mobile-close-button" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className="sidebar-link" onClick={closeMenu}>
            Dashboard
          </NavLink>

          <NavLink to="/products" className="sidebar-link" onClick={closeMenu}>
            Products
          </NavLink>

          <NavLink to="/orders" className="sidebar-link" onClick={closeMenu}>
            Orders
          </NavLink>

          <NavLink to="/customers" className="sidebar-link" onClick={closeMenu}>
            Customers
          </NavLink>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
