import { useState } from "react";
import { Link } from "react-router-dom";

const Dominios_permitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
const max_comentario = 500;

function correoValido(correo) {
    const partes = correo.trim().toLowerCase().split("@");
    return partes.length === 2 && partes[0] !== "" && Dominios_permitidos.includes(partes[1]);
}

function Home() {
    const [form, setForm] = useState({ nombre: "", correo: "", comentario: "" });
    const [intento, setIntento] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const errores = {
        nombre: form.nombre.trim() === "",
        correo: !correoValido(form.correo),
        comentario: form.comentario.trim() === "",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIntento(true);
        if (errores.nombre || errores.correo || errores.comentario) return;
        setEnviado(true);
        setForm({ nombre: "", correo: "", comentario: "" });
        setIntento(false);
    };

    const claseCampo = (campo) =>
        `form-control ${intento ? (errores[campo] ? "is-invalid" : "is-valid") : ""}`;

    return (
        <>
            {/* HERO */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h1>
                                Cuidamos a tu mejor amigo{" "}
                                <span style={{ color: "var(--color-accent)" }}>
                                    como se lo merece
                                </span>
                            </h1>
                            <p className="lead">
                                Nuestro trabajo es hacer que tu amigo peludo se sienta como en casa. Contamos con un
                                equipo de profesionales altamente capacitados y un ambiente acogedor para garantizar
                                la salud y felicidad de tus mascotas.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link to="/servicios" className="btn btn-accent">
                                    Agendar una hora
                                </Link>
                                <Link to="/blogs" className="btn btn-outline-brand">
                                    <i className="bi bi-journal-richtext"></i> Ver Blogs
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 hero-img-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80"
                                className="img-fluid w-100"
                                alt="Veterinaria atendiendo a un perro"
                            />
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="py-5">
                <div className="container">
                    <h2 className="section-title text-center mx-auto" style={{ maxWidth: 500 }}>
                        ¿Por qué elegir San Marcos?
                    </h2>
                    <div className="row g-4">
                        <div className="col-md-3 col-6">
                            <div className="info-tienda-item flex-column text-center">
                                <div className="icon-box mx-auto">
                                    <i className="bi bi-clock-fill"></i>
                                </div>
                                <div>
                                    <h6 className="mb-1">Horario</h6>
                                    <p className="text-muted small mb-0">Lun a Sáb, 9:00 - 20:00 hrs</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="info-tienda-item flex-column text-center">
                                <div className="icon-box mx-auto">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </div>
                                <div>
                                    <h6 className="mb-1">Ubicación</h6>
                                    <p className="text-muted small mb-0">Av. Los Aromos 1234, Santiago</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="info-tienda-item flex-column text-center">
                                <div className="icon-box mx-auto">
                                    <i className="bi bi-truck"></i>
                                </div>
                                <div>
                                    <h6 className="mb-1">Despacho</h6>
                                    <p className="text-muted small mb-0">Envíos a todo Santiago</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="info-tienda-item flex-column text-center">
                                <div className="icon-box mx-auto">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <div>
                                    <h6 className="mb-1">Garantía</h6>
                                    <p className="text-muted small mb-0">Productos 100% originales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-5">
                <div className="container">
                    <h2 className="section-title text-center mx-auto" style={{ maxWidth: 500 }}>
                        Veterinaria San Marcos
                    </h2>
                    <p className="text-center text-muted mx-auto mb-5" style={{ maxWidth: 700 }}>
                        Nuestro trabajo es hacer que tu amigo peludo se sienta como en casa. Contamos con un
                        equipo de profesionales altamente capacitados y un ambiente acogedor para garantizar
                        la salud y felicidad de tus mascotas.
                    </p>

                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="p-4 p-md-5 bg-light-suave rounded-4">
                                {enviado && (
                                    <div className="alert alert-success" role="alert">
                                        <i className="bi bi-check-circle-fill"></i> ¡Gracias! Tu mensaje fue enviado
                                        correctamente.
                                    </div>
                                )}

                                <form id="formContacto" className="form-brand" onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">
                                            Nombre completo *
                                        </label>
                                        <input
                                            type="text"
                                            className={claseCampo("nombre")}
                                            id="nombre"
                                            name="nombre"
                                            maxLength={100}
                                            placeholder="Ej: María Pérez"
                                            value={form.nombre}
                                            onChange={handleChange}
                                        />
                                        <div className="invalid-feedback">
                                            El nombre es obligatorio (máx. 100 caracteres).
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="correo" className="form-label">
                                            Correo electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            className={claseCampo("correo")}
                                            id="correo"
                                            name="correo"
                                            maxLength={100}
                                            placeholder="Ej: maria@gmail.com"
                                            value={form.correo}
                                            onChange={handleChange}
                                        />
                                        <div className="form-text">
                                            Dominios permitidos: duoc.cl, profesor.duoc.cl, gmail.com
                                        </div>
                                        <div className="invalid-feedback">
                                            Ingresa un correo válido de un dominio permitido (máx. 100 caracteres).
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="comentario" className="form-label">
                                            Comentario / Mensaje *
                                        </label>
                                        <textarea
                                            className={claseCampo("comentario")}
                                            id="comentario"
                                            name="comentario"
                                            rows={5}
                                            maxLength={max_comentario}
                                            placeholder="Cuéntanos en qué podemos ayudarte..."
                                            value={form.comentario}
                                            onChange={handleChange}
                                        ></textarea>
                                        <div className="d-flex justify-content-between">
                                            <div className="invalid-feedback">
                                                El comentario es obligatorio (máx. {max_comentario} caracteres).
                                            </div>
                                            <small className="text-muted ms-auto">
                                                {form.comentario.length} / {max_comentario} caracteres
                                            </small>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-brand w-100">
                                        <i className="bi bi-send-fill"></i> Enviar mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
