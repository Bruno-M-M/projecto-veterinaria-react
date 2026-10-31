import { Link } from "react-router-dom";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { useProductos } from "../../context/ProductosContext.jsx";
import { nombreCategoria } from "../../data/categorias.js";
import { esStockCritico, formatoPrecio } from "../../utils/productos.js";

function AdminProductos() {
    const { productos, eliminarProducto } = useProductos();

    function confirmarEliminar(producto) {
        if (window.confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)) {
            eliminarProducto(producto.codigo);
        }
    }

    return (
        <Container as="section" className="py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <h1 className="h2 mb-0">Administrar productos</h1>
                <Button as={Link} to="/admin/productos/nuevo" variant="success">+ Nuevo producto</Button>
            </div>

            {productos.length === 0 ? (
                <p className="text-muted">No hay productos registrados.</p>
            ) : (
                <Table responsive striped className="align-middle">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th><span className="visually-hidden">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.codigo}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{nombreCategoria(producto.categoria)}</td>
                                <td>{formatoPrecio(producto.precio)}</td>
                                <td>
                                    {producto.stock}
                                    {esStockCritico(producto) && (
                                        <Badge bg="danger" className="ms-2">Stock crítico</Badge>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        aria-label={`Eliminar ${producto.nombre}`}
                                        onClick={() => confirmarEliminar(producto)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default AdminProductos;
