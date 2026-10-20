import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FormularioComentario from "../Components/FormularioComentario";

const CLAVE_STORAGE = "comentarios_san_marcos";

function Home() {
    const [comentarios, setComentarios] = useState(() => {
        try {
            const guardados = localStorage.getItem(CLAVE_STORAGE);
            return guardados ? JSON.parse(guardados) : [];
        } catch {
            return [];
        }
    });

    // Cada vez que cambian, se guardan en el navegador.
    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(comentarios));
        } catch {
            // si localStorage no está disponible, simplemente no se guarda
        }
    }, [comentarios]);

    const agregarComentario = (datos) => {
        const nuevo = {
            id: Date.now(),
            fecha: new Date().toLocaleDateString("es-CL"),
            ...datos,
        };
        // el más nuevo primero
        setComentarios((prev) => [nuevo, ...prev]);
    };

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

            {/* POR QUÉ ELEGIR SAN MARCOS */}
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

            {/* FORMULARIO DE COMENTARIOS (SÓLO PARA VISITANTES) */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="section-title text-center mx-auto" style={{ maxWidth: 500 }}>
                        Déjanos tu Comentario
                    </h2>
                    <p className="text-center text-muted mx-auto mb-4" style={{ maxWidth: 700 }}>
                        Tu opinión es muy importante para nosotros. Escribe tu mensaje a continuación.
                    </p>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <FormularioComentario onEnviar={agregarComentario} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;