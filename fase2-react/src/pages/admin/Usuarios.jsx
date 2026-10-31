import { useState } from 'react';
import { Table, Button, Form, Modal, Alert, Badge, Row, Col, InputGroup, Card } from 'react-bootstrap';

// Algoritmo Módulo 11 para validación de RUN chileno
const validarRUN = (run) => {
  const regExp = /^[0-9]{7,8}[0-9kK]$/;
  if (!regExp.test(run)) return false;

  const cuerpo = run.slice(0, -1);
  let dv = run.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  let dvEsperado = 11 - resto;

  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
};

// Datos iniciales de ejemplo
const usuariosIniciales = [
  { id: 1, nombre: 'Juan Pérez', run: '19123456K', correo: 'juan.perez@duoc.cl', rol: 'Administrador', activo: true },
  { id: 2, nombre: 'María González', run: '182345671', correo: 'm.gonzalez@gmail.com', rol: 'Cliente', activo: true },
  { id: 3, nombre: 'Carlos Silva', run: '173456782', correo: 'csilva@profesor.duoc.cl', rol: 'Veterinario', activo: false },
];

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    run: '',
    correo: '',
    rol: 'Cliente',
    password: '',
    passwordConfirmar: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Abrir modal para crear o editar
  const handleOpenModal = (usuario = null) => {
    setMensaje({ tipo: '', texto: '' });
    if (usuario) {
      setUsuarioEditar(usuario);
      setFormData({
        nombre: usuario.nombre,
        run: usuario.run,
        correo: usuario.correo,
        rol: usuario.rol,
        password: '',
        passwordConfirmar: ''
      });
    } else {
      setUsuarioEditar(null);
      setFormData({
        nombre: '',
        run: '',
        correo: '',
        rol: 'Cliente',
        password: '',
        passwordConfirmar: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioEditar(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones y Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = formData.nombre.trim();
    const run = formData.run.trim();
    const correo = formData.correo.trim();
    const rol = formData.rol;
    const pwd = formData.password.trim();
    const pwdConf = formData.passwordConfirmar.trim();

    // 1. Campos obligatorios base
    if (!nombre || !run || !correo || !rol) {
      setMensaje({ tipo: 'danger', texto: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    // 2. Validación de RUN chileno[cite: 3]
    if (!validarRUN(run)) {
      setMensaje({
        tipo: 'danger',
        texto: 'El RUN ingresado no es válido. Ingréselo sin puntos ni guión (ej: 12345678K).'
      });
      return;
    }

    // 3. Formato de Nombre (letras y espacios, máx 100 caracteres)[cite: 3]
    if (nombre.length > 100) {
      setMensaje({ tipo: 'danger', texto: 'El nombre no puede exceder los 100 caracteres.' });
      return;
    }

    const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetrasYEspacios.test(nombre)) {
      setMensaje({ tipo: 'danger', texto: 'El nombre solo debe contener caracteres alfabéticos y espacios.' });
      return;
    }

    // 4. Correo electrónico y dominio permitido[cite: 3]
    if (correo.length > 100) {
      setMensaje({ tipo: 'danger', texto: 'El correo electrónico debe contener un máximo de 100 caracteres.' });
      return;
    }

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const esDominioValido = dominiosPermitidos.some((dom) => correo.toLowerCase().endsWith(dom));

    if (!esDominioValido) {
      setMensaje({
        tipo: 'danger',
        texto: 'El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.'
      });
      return;
    }

    // 5. Validar contraseña si se está creando usuario o cambiando clave[cite: 3]
    if (!usuarioEditar || pwd.length > 0) {
      if (pwd.length < 4 || pwd.length > 10) {
        setMensaje({ tipo: 'danger', texto: 'La contraseña debe tener entre 4 y 10 caracteres.' });
        return;
      }
      if (pwd !== pwdConf) {
        setMensaje({ tipo: 'danger', texto: 'Las contraseñas no coinciden.' });
        return;
      }
    }

    // Guardar (Crear o Editar)
    if (usuarioEditar) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioEditar.id ? { ...u, nombre, run, correo, rol } : u
        )
      );
    } else {
      const nuevo = {
        id: Date.now(),
        nombre,
        run,
        correo,
        rol,
        activo: true
      };
      setUsuarios((prev) => [...prev, nuevo]);
    }

    handleCloseModal();
  };

  // Alternar estado activo/inactivo
  const toggleEstado = (id) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u))
    );
  };

  // Eliminar usuario
  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Filtrado de la tabla por nombre, RUN o correo
  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.run.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container my-5">
      <Card className="shadow p-4">
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <h2>Gestión de Usuarios</h2>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <Button variant="success" onClick={() => handleOpenModal()}>
              + Nuevo Usuario
            </Button>
          </Col>
        </Row>

        {/* Buscador */}
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre, RUN o correo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Tabla de Usuarios */}
        <div className="table-responsive">
          <Table striped bordered hover responsive align="middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>RUN</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.run}</td>
                    <td>{u.correo}</td>
                    <td>
                      <Badge bg={u.rol === 'Administrador' ? 'primary' : u.rol === 'Veterinario' ? 'info' : 'secondary'}>
                        {u.rol}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={u.activo ? 'success' : 'danger'}>
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenModal(u)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant={u.activo ? 'secondary' : 'info'}
                        size="sm"
                        className="me-2"
                        onClick={() => toggleEstado(u.id)}
                      >
                        {u.activo ? 'Desactivar' : 'Activar'}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(u.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No se encontraron usuarios registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Modal de Formulario de Creación / Edición */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{usuarioEditar ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} noValidate>
          <Modal.Body>
            {mensaje.texto && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>RUN (sin puntos ni guión)</Form.Label>
                  <Form.Control
                    type="text"
                    name="run"
                    placeholder="12345678K"
                    maxLength={9}
                    value={formData.run}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select name="rol" value={formData.rol} onChange={handleChange}>
                    <option value="Cliente">Cliente</option>
                    <option value="Veterinario">Veterinario</option>
                    <option value="Administrador">Administrador</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                placeholder="nombre@duoc.cl"
                value={formData.correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    {usuarioEditar ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirmar"
                    placeholder="Confirmar Contraseña"
                    value={formData.passwordConfirmar}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {usuarioEditar ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}