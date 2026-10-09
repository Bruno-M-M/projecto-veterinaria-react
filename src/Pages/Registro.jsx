import React, { useState } from 'react';

// Datos de ejemplo para las regiones y sus comunas dinámicas
const regionesData = {
  'Región Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Concón', 'Quilpué'],
  'Biobío': ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles']
};

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    run: '',
    correo: '',
    correoConfirmar: '',
    region: '',
    comuna: '',
    password: '',
    passwordConfirmar: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Si cambia la región, reiniciamos el valor de la comuna
      if (name === 'region') {
        updated.comuna = '';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, run, correo, correoConfirmar, region, comuna, password, passwordConfirmar } = formData;

    // Validación simple de campos vacíos
    if (!nombre || !run || !correo || !correoConfirmar || !region || !comuna || !password || !passwordConfirmar) {
      setMensaje({ tipo: 'danger', texto: 'Por favor, completa todos los campos.' });
      return;
    }

    // Validación de coincidencia de correos
    if (correo !== correoConfirmar) {
      setMensaje({ tipo: 'danger', texto: 'Los correos electrónicos no coinciden.' });
      return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== passwordConfirmar) {
      setMensaje({ tipo: 'danger', texto: 'Las contraseñas no coinciden.' });
      return;
    }

    setMensaje({ tipo: 'success', texto: `¡Usuario ${nombre} registrado con éxito!` });
  };

  const comunasDisponibles = formData.region ? regionesData[formData.region] || [] : [];

  return (
    <>
  
      <main className="flex-grow-1">
        <section id="registro" className="bg-light py-5 min-vh-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <h2 className="text-center mb-4">Registro de usuario</h2>

                <form
                  id="formulario-registro"
                  className="border rounded p-4 shadow bg-white"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="nombreRegistro" className="form-label">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombreRegistro"
                      name="nombre"
                      className="form-control"
                      placeholder="Ingrese su nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="runRegistro" className="form-label">
                      RUN (sin puntos ni guión)
                    </label>
                    <input
                      type="text"
                      id="runRegistro"
                      name="run"
                      className="form-control"
                      placeholder="12345678K"
                      maxLength={9}
                      value={formData.run}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="correoRegistro" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="correoRegistro"
                      name="correo"
                      className="form-control"
                      placeholder="nombre@duoc.cl"
                      maxLength={100}
                      value={formData.correo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="correoConfirmar" className="form-label">
                      Confirmar Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="correoConfirmar"
                      name="correoConfirmar"
                      className="form-control"
                      placeholder="nombre@duoc.cl"
                      maxLength={100}
                      value={formData.correoConfirmar}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="regionRegistro" className="form-label">
                      Región
                    </label>
                    <select
                      id="regionRegistro"
                      name="region"
                      className="form-select"
                      value={formData.region}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione una región
                      </option>
                      {Object.keys(regionesData).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="comunaRegistro" className="form-label">
                      Comuna
                    </label>
                    <select
                      id="comunaRegistro"
                      name="comuna"
                      className="form-select"
                      disabled={!formData.region}
                      value={formData.comuna}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        {formData.region ? 'Seleccione una comuna' : 'Seleccione primero una región'}
                      </option>
                      {comunasDisponibles.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="passwordConfirmar" className="form-label">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      id="passwordConfirmar"
                      name="passwordConfirmar"
                      className="form-control"
                      placeholder="Contraseña"
                      value={formData.passwordConfirmar}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Registrar
                  </button>
                </form>

                {mensaje.texto && (
                  <div
                    id="mensaje-resultado"
                    className={`mt-4 alert alert-${mensaje.tipo}`}
                    role="alert"
                  >
                    {mensaje.texto}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}