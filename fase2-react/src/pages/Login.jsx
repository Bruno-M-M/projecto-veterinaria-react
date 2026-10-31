import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const ADMIN_EMAIL = "admin@admin.cl";
    const USER_EMAIL = "usuario@gmail.com";
    const CLAVE_COMUN = "123456";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const emailLimpio = email.trim().toLowerCase();

        // 1. Caso Administrador
        if (emailLimpio === ADMIN_EMAIL && password === CLAVE_COMUN) {
            localStorage.setItem("esAdmin", "true");
            localStorage.setItem("usuario", JSON.stringify({ email: emailLimpio, rol: "admin" }));
            
            // Navegación fluida por React Router
            navigate("/admin");
            return;
        }

        // 2. Caso Usuario Normal
        if (emailLimpio === USER_EMAIL && password === CLAVE_COMUN) {
            localStorage.setItem("esAdmin", "false");
            localStorage.setItem("usuario", JSON.stringify({ email: emailLimpio, rol: "usuario" }));
            
            navigate("/");
            return;
        }

        setError("Correo o contraseña incorrectos.");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm p-4">
                        <h2 className="text-center mb-3">Iniciar Sesión</h2>
                        
                        <div className="alert alert-info small mb-3">
                            <strong>Datos de prueba para ingresar:</strong>
                            <br />
                            <strong>Admin:</strong> <code>admin@admin.cl</code> / <code>123456</code>
                            <br />
                            <strong>Usuario:</strong> <code>usuario@gmail.com</code> / <code>123456</code>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Iniciar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}