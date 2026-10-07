import Sidebar from "./Sidebar";
import ProtectedRoute from "./ProtectedRoute";

function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="admin-layout">
        <Sidebar />
        {children}
      </div>
    </ProtectedRoute>
  );
}

export default AdminLayout;
