import { useState } from "react";

const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
const MAX_COMENTARIO = 500;

function correoValido(correo) {
    const partes = correo.trim().toLowerCase().split("@");
    return partes.length === 2 && partes[0] !== "" && DOMINIOS_PERMITIDOS.includes(partes[1]);
}

function Contacto() {
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
            <section className="py-5 bg-light-suave">
                <div className="container text-center">
                    <h1 className="section-title mx-auto" style={{ maxWidth: 500 }}>
                        Contáctanos
                    </h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: 650 }}>
                        ¿Tienes dudas sobre nuestros productos o servicios? Escríbenos y te responderemos a la
                        brevedad.
                    </p>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-4">
                            <div className="p-4 rounded-4 bg-light-suave h-100">
                                <h2 className="h5 mb-4">Información de contacto</h2>

                                <div className="d-flex align-items-start mb-3">
                                    <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                                    <div>
                                        <strong>Dirección</strong>
                                        <p className="mb-0 text-muted small">Av. San Marcos 1234, Santiago</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start mb-3">
                                    <i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                                    <div>
                                        <strong>Teléfono</strong>
                                        <p className="mb-0 text-muted small">+56 9 1234 5678</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start mb-3">
                                    <i className="bi bi-envelope-fill text-primary me-3 fs-5"></i>
                                    <div>
                                        <strong>Correo</strong>
                                        <p className="mb-0 text-muted small">contacto@sanmarcos.cl</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start">
                                    <i className="bi bi-clock-fill text-primary me-3 fs-5"></i>
                                    <div>
                                        <strong>Horario</strong>
                                        <p className="mb-0 text-muted small">
                                            Lunes a Viernes: 9:00 - 19:00
                                            <br />
                                            Sábados: 10:00 - 14:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm">
                                {enviado && (
                                    <div className="alert alert-success" role="alert">
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                        ¡Gracias! Tu mensaje fue enviado correctamente. Te contactaremos pronto.
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
                                            El nombre es obligatorio (máximo 100 caracteres).
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
                                            Ingresa un correo válido de un dominio permitido (máximo 100
                                            caracteres).
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
                                            maxLength={MAX_COMENTARIO}
                                            placeholder="Cuéntanos en qué podemos ayudarte..."
                                            value={form.comentario}
                                            onChange={handleChange}
                                        ></textarea>
                                        <div className="d-flex justify-content-between mt-1">
                                            <div className="invalid-feedback">
                                                El comentario es obligatorio (máximo {MAX_COMENTARIO} caracteres).
                                            </div>
                                            <small className="text-muted ms-auto">
                                                {form.comentario.length} / {MAX_COMENTARIO} caracteres
                                            </small>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-brand w-100">
                                        <i className="bi bi-send-fill me-1"></i> Enviar mensaje
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

export default Contacto;