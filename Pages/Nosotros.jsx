import { Link } from "react-router-dom";

const valores = [
  {
    icono: "bi-bullseye",
    titulo: "Misión",
    texto:
      "Brindar atención veterinaria integral y productos de calidad que mejoren la calidad de vida de las mascotas y den tranquilidad a sus familias.",
  },
  {
    icono: "bi-eye",
    titulo: "Visión",
    texto:
      "Ser la veterinaria de referencia en la zona, reconocida por su excelencia profesional, innovación y el cariño con el que tratamos a cada paciente.",
  },
  {
    icono: "bi-heart-fill",
    titulo: "Valores",
    texto:
      "Empatía, profesionalismo, honestidad, respeto por los animales y compromiso con la comunidad.",
  },
];

const equipo = [
  {
    nombre: "Alfonso Pizarro",
    modulo: "Módulo Usuarios y Autenticación",
    descripcion: "Responsable de login, registro y administración de usuarios.",
  },
  {
    nombre: "Bruno",
    modulo: "Módulo Catálogo y Carrito",
    descripcion:
      "Productos, detalle, carrito de compras y administración de productos.",
  },
  {
    nombre: "Benjamin Martinez",
    modulo: "Módulo Contenido y Contacto",
    descripcion:
      "Home, Nosotros, Blogs, Contacto y panel de administración principal.",
  },
];

function Nosotros() {
  return (
    <main>
      <section className="py-5 bg-light-suave">
        <div className="container text-center">
          <h1 className="section-title mx-auto" style={{ maxWidth: "600px" }}>
            Quiénes somos
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            En Veterinaria San Marcos cuidamos a tus mascotas con
            profesionalismo, cariño y la mejor tecnología. Conoce nuestra
            historia y al equipo que hace posible este proyecto.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="section-title text-center">Nuestra historia</h2>
              <p>
                Veterinaria San Marcos nació con una idea simple pero poderosa:
                ofrecer atención veterinaria de calidad, cercana y accesible
                para todas las familias que consideran a sus mascotas parte del
                hogar.
              </p>
              <p>
                Desde nuestros inicios nos hemos enfocado en la prevención, el
                bienestar animal y un trato humano tanto para las mascotas como
                para sus tutores. Hoy contamos con un equipo multidisciplinario
                y un catálogo de productos seleccionados para el cuidado diario.
              </p>
              <p className="mb-0">
                Este sitio web es parte de nuestro compromiso por acercar
                nuestros servicios y productos a más personas, de forma clara,
                segura y fácil de usar.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="/img/nosotros-equipo.png"
                className="img-fluid rounded-4 shadow"
                alt="Equipo veterinario con mascotas"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light-suave">
        <div className="container">
          <h2
            className="section-title text-center mx-auto mb-5"
            style={{ maxWidth: "500px" }}
          >
            Misión, Visión y Valores
          </h2>

          <div className="row g-4">
            {valores.map((item) => (
              <div className="col-md-4" key={item.titulo}>
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body p-4 text-center">
                    <div className="mb-3">
                      <i className={`bi ${item.icono} display-5 text-primary`}></i>
                    </div>
                    <h3 className="h5">{item.titulo}</h3>
                    <p className="text-muted mb-0">{item.texto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2
            className="section-title text-center mx-auto mb-3"
            style={{ maxWidth: "500px" }}
          >
            Nuestro equipo de desarrollo
          </h2>
          <p
            className="text-center text-muted mb-5 mx-auto"
            style={{ maxWidth: "650px" }}
          >
            Este sitio web fue desarrollado como proyecto académico por un
            equipo de estudiantes comprometidos con crear una experiencia
            clara, útil y bien diseñada.
          </p>

          <div className="row g-4 justify-content-center">
            {equipo.map((persona) => (
              <div className="col-md-6 col-lg-4" key={persona.nombre}>
                <div className="card border-0 shadow-sm rounded-4 h-100 text-center">
                  <div className="card-body p-4">
                    <div
                      className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "90px", height: "90px" }}
                    >
                      <i className="bi bi-person-fill display-6 text-secondary"></i>
                    </div>
                    <h3 className="h5 mb-1">{persona.nombre}</h3>
                    <p className="text-muted small mb-2">{persona.modulo}</p>
                    <p className="small text-muted mb-0">{persona.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light-suave">
        <div className="container text-center">
          <h2 className="h3 mb-3">¿Quieres saber más o agendar una hora?</h2>
          <p className="text-muted mb-4">
            Estamos para ayudarte a ti y a tu mascota.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/contacto" className="btn btn-brand">
              <i className="bi bi-envelope-fill me-1"></i> Contáctanos
            </Link>
            <Link to="/productos" className="btn btn-outline-brand">
              Ver productos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;