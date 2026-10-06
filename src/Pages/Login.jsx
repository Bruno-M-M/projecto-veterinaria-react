import React, { useState } from 'react';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo || !password) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }
    setMensaje(`Sesión iniciada con éxito para ${correo}`);
  };

  return (
    <>


      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <form
                id="formulario-login"
                className="border rounded p-4 shadow bg-white"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className="form-control"
                    placeholder="nombre@correo.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Ingrese contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Iniciar sesión
                </button>
              </form>

              {mensaje && (
                <div id="mensaje-resultado" className="mt-3 alert alert-info">
                  {mensaje}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-brand mb-2">
                <i className="bi bi-heart-pulse-fill"></i> San Marcos
              </div>
              <p className="text-white-50 small">
                Veterinaria y tienda especializada en el bienestar de tus mascotas desde 2015.
              </p>
              <div className="social-icons">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-whatsapp"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <h5>Navegación</h5>
              <ul className="list-unstyled">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="productos.html">Productos</a></li>
                <li><a href="servicios.html">Servicios</a></li>
                <li><a href="nosotros.html">Nosotros</a></li>
                <li><a href="blogs.html">Blogs</a></li>
                <li><a href="contacto.html">Contacto</a></li>
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
            <span>Proyecto académico DSY1104</span>
          </div>
        </div>
      </footer>
    </>
  );
}