import { Link, Navigate, useParams } from "react-router-dom";
import { blogs } from "../Data/BlogsData";

function BlogDetalle() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  const { alerta } = blog;

  return (
    <main>
      <section className="py-5">
        <div className="container" style={{ maxWidth: "800px" }}>
          <p className="mb-3">
            <Link to="/blogs" className="text-decoration-none">
              <i className="bi bi-arrow-left"></i> Volver a Blogs
            </Link>
          </p>

          <span className={`badge ${blog.colorBadge} mb-3`}>{blog.categoria}</span>
          <h1 className="mb-3">{blog.titulo}</h1>
          <p className="text-muted mb-4">
            Publicado por el equipo de Veterinaria San Marcos
          </p>

          <img
            src={blog.imagenDetalle}
            className="img-fluid rounded-4 mb-4"
            alt={blog.altDetalle}
          />

          <div className="blog-content">
            <p>{blog.intro}</p>

            {blog.secciones.map((sec) => (
              <div key={sec.titulo}>
                <h3 className="h5 mt-4">{sec.titulo}</h3>
                <p>{sec.texto}</p>
              </div>
            ))}

            <div className="alert alert-success mt-4">
              <strong>{alerta.titulo}</strong>{" "}
              {alerta.texto ? (
                alerta.texto
              ) : (
                <>
                  {alerta.antes}
                  <Link to={alerta.enlace.to}>{alerta.enlace.texto}</Link>
                  {alerta.despues}
                </>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-top">
            <Link to="/blogs" className="btn btn-outline-brand">
              <i className="bi bi-arrow-left"></i> Volver al listado de blogs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetalle;