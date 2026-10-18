import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useProductos } from "../../context/ProductosContext.jsx";
import { CATEGORIAS } from "../../data/categorias.js";
import { validarProducto } from "../../utils/validarProducto.js";

const FORMULARIO_VACIO = {
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    stockCritico: "",
    categoria: "",
};

function NuevoProducto() {
    const { productos, agregarProducto } = useProductos();
    const navigate = useNavigate();
    const [datos, setDatos] = useState(FORMULARIO_VACIO);
    const [errores, setErrores] = useState({});

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setDatos((actual) => ({ ...actual, [name]: value }));
        setErrores((actual) => ({ ...actual, [name]: undefined }));
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const erroresEncontrados = validarProducto(datos, productos);
        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            return;
        }

        const producto = {
            codigo: datos.codigo.trim(),
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion.trim(),
            precio: Number(datos.precio),
            stock: Number(datos.stock),
            categoria: datos.categoria,
        };
        if (datos.stockCritico.trim() !== "") {
            producto.stockCritico = Number(datos.stockCritico);
        }

        agregarProducto(producto);
        navigate("/admin/productos");
    }

    function campo(etiqueta, nombre, props) {
        return (
            <Form.Group className="mb-3" controlId={`campo-${nombre}`}>
                <Form.Label>{etiqueta}</Form.Label>
                <Form.Control
                    name={nombre}
                    value={datos[nombre]}
                    onChange={manejarCambio}
                    isInvalid={Boolean(errores[nombre])}
                    {...props}
                />
                <Form.Control.Feedback type="invalid">{errores[nombre]}</Form.Control.Feedback>
            </Form.Group>
        );
    }

    return (
        <Container as="section" className="py-4" style={{ maxWidth: 640 }}>
            <h1 className="h2 mb-4">Nuevo producto</h1>

            <Form noValidate onSubmit={manejarEnvio}>
                {campo("Código", "codigo", { type: "text" })}
                {campo("Nombre", "nombre", { type: "text" })}
                {campo("Descripción (opcional)", "descripcion", { as: "textarea", rows: 3 })}
                {campo("Precio", "precio", { type: "number", step: 10 })}
                {campo("Stock", "stock", { type: "number", step: 1 })}
                {campo("Stock crítico (opcional)", "stockCritico", { type: "number", step: 1 })}

                <Form.Group className="mb-4" controlId="campo-categoria">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select
                        name="categoria"
                        value={datos.categoria}
                        onChange={manejarCambio}
                        isInvalid={Boolean(errores.categoria)}
                    >
                        <option value="">Seleccione una categoría</option>
                        {CATEGORIAS.map((c) => (
                            <option key={c.valor} value={c.valor}>{c.etiqueta}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                    <Button as={Link} to="/admin/productos" variant="outline-secondary">Cancelar</Button>
                    <Button type="submit" variant="success">Crear producto</Button>
                </div>
            </Form>
        </Container>
    );
}

export default NuevoProducto;
