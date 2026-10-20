import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
    const claseLink = ({ isActive }) =>
        `nav-link text-white ${isActive ? "fw-bold bg-secondary rounded" : ""}`;

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            {/* Menú lateral */}
            <aside className="bg-dark p-3" style={{ width: 240 }}>
                <h5 className="text-white mb-4">
                    <i className="bi bi-gear-fill me-2"></i>Panel Admin
                </h5>

                <nav className="nav flex-column gap-1">
                    <NavLink to="/admin" end className={claseLink}>
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </NavLink>
                    <NavLink to="/admin/comentarios" className={claseLink}>
                        <i className="bi bi-chat-left-text me-2"></i>Comentarios
                    </NavLink>

                    <NavLink to="/admin/productos" className={claseLink}>
                        <i className="bi bi-box-seam me-2"></i>Productos
                    </NavLink>
                    <NavLink to="/admin/usuarios" className={claseLink}>
                        <i className="bi bi-people me-2"></i>Usuarios
                    </NavLink>

                    <hr className="text-secondary" />

                    <NavLink to="/" className="nav-link text-white">
                        <i className="bi bi-house-door me-2"></i>Ver Home
                    </NavLink>
                </nav>
            </aside>

            {/* Zona donde se muestra cada apartado */}
            <main className="flex-grow-1 p-4 bg-light">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;