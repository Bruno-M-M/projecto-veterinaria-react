import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="footer-brand mb-2"><i className="bi bi-heart-pulse-fill"></i> San Marcos</div>
                        <p className="text-white-50 small">Veterinaria y tienda especializada en el bienestar de tus mascotas desde 2015.</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-whatsapp"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-6">
                        <h5>Navegación</h5>
                        <ul className="list-unstyled">
                            <li><NavLink to="/">Inicio</NavLink></li>
                            <li><NavLink to="/productos">Productos</NavLink></li>
                            <li><NavLink to="/servicios">Servicios</NavLink></li>
                            <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                            <li><NavLink to="/blogs">Blogs</NavLink></li>
                            <li><NavLink to="/contacto">Contacto</NavLink></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <h5>Contacto</h5>
                        <ul className="list-unstyled small text-white-50">
                            <li className="mb-2"><i className="bi bi-geo-alt-fill"></i> Av. Los Aromos 1234, Santiago</li>
                            <li className="mb-2"><i className="bi bi-telephone-fill"></i> +56 9 1234 5678</li>
                            <li className="mb-2"><i className="bi bi-envelope-fill"></i> contacto@sanmarcos.cl</li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h5>Horario de atención</h5>
                        <p className="small text-white-50 mb-1">Lunes a Sábado: 9:00 - 20:00 hrs</p>
                        <p className="small text-white-50">Domingo: 10:00 - 14:00 hrs</p>
                    </div>
                </div>
                <hr />
                <div className="d-flex flex-column flex-md-row justify-content-between footer-bottom">
                    <span>&copy; 2026 San Marcos Veterinaria. Todos los derechos reservados.</span>
                    <span>Proyecto académico Bootstrap</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;