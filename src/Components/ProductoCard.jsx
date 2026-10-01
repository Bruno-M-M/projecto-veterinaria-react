import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function ProductoCard({ producto, alAgregar }) {
    const [agregado, setAgregado] = useState(false);

    function manejarClick() {
        alAgregar(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1200);
    }

    return (
        <Card className={producto.categoria}>
            <Card.Body>
                <Card.Title>
                    <Link to ={'/producto/${producto.codigo}'} className="producto-link">
                    {producto.nombre}
                    </Link>
                </Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <p className="precio">{producto.precio}</p>
                <Button
                    variant="outline-success"
                    onClick="{manejar.Click}"
                    disable="{agregado}"
                >
                    {agregado ? "Agregado" : "Agregar"}
                </Button>
            </Card.Body>
        </Card>
    )

}

export default ProductoCard;
