import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="site-header">
            <div className="top-bar">
                <button className="menu-toggle" aria-label="Abrir menú">☰</button>
                <nav className="main-nav">
                    <div className="logo">
                        <img src="/public/logo.jpg" alt="Logo Veterinaria San Marcos" />
                        <span>Veterinaria San Marcos</span>
                    </div>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/productos">Productos</NavLink></li>
                        <li><NavLink to="/servicios">Servicios</NavLink></li>
                        <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                        <li><NavLink to="/blogs">Blogs</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>
                        <li><NavLink to="/carrito">Carrito</NavLink></li>
                        <li><NavLink to="/login">Iniciar sesión</NavLink></li>
                        <li><NavLink to="/registro">Registrarse</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;