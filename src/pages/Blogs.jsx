import { Link } from "react-router-dom";
import { blogs } from "../data/BlogsData.js";

function Blogs() {
  return (
    <main>
      <section className="py-5 bg-light-suave">
        <div className="container text-center">
          <h1 className="section-title mx-auto" style={{ maxWidth: "500px" }}>
            Nuestro Blog
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "650px" }}>
            Consejos, novedades y casos reales para el cuidado de tus mascotas.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {blogs.map((blog) => (
              <div className="col-md-6" key={blog.id}>
                <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <img
                    src={blog.imagen}
                    className="card-img-top"
                    alt={blog.altListado}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body p-4">
                    <span className={`badge ${blog.colorBadge} mb-2`}>
                      {blog.categoria}
                    </span>
                    <h2 className="h5 card-title">{blog.titulo}</h2>
                    <p className="card-text text-muted">{blog.resumen}</p>
                    <Link to={`/blogs/${blog.id}`} className="btn btn-brand btn-sm">
                      Leer más <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blogs;