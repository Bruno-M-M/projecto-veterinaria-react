import { Navigate } from "react-router-dom";

export default function RutaAdmin({ children }) {
    const esAdmin = localStorage.getItem("esAdmin") === "true";

    if (!esAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}