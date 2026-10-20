import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext.jsx";

function Header() {
    const { cantidadTotal } = useCarrito();
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="site-header">
            <div className="top-bar">
                <button
                    className="menu-toggle"
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    ☰
                </button>
                <nav className={menuAbierto ? "main-nav active" : "main-nav"}>
                    <div className="logo">
                        <img src="/logo.jpg" alt="Logo Veterinaria San Marcos" />
                        <span>Veterinaria San Marcos</span>
                    </div>
                    <ul onClick={() => setMenuAbierto(false)}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/productos">Productos</NavLink></li>
                        <li><NavLink to="/servicios">Servicios</NavLink></li>
                        <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                        <li><NavLink to="/blogs">Blogs</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>
                        <li>
                            <NavLink to="/carrito">
                                Carrito
                                {cantidadTotal > 0 && (
                                    <Badge pill bg="light" text="dark" className="ms-1">{cantidadTotal}</Badge>
                                )}
                            </NavLink>
                        </li>
                        <li><NavLink to="/login">Iniciar sesión</NavLink></li>
                        <li><NavLink to="/registro" className="nav-registro">Registrarse</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
