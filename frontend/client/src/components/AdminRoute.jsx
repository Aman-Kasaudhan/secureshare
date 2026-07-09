import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const isAdmin =
        localStorage.getItem("admin") === "true";

    return isAdmin
        ? children
        : <Navigate to="/login" />;

}

export default AdminRoute;