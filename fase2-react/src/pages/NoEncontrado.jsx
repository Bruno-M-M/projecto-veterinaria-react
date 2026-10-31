import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function NoEncontrado() {
    return (
        <Container className="py-5 text-center" id="pagina-no-encontrada">
            <h1 className="display-4">404</h1>
            <p className="lead">No encontramos la página que buscas.</p>
            <Button as={Link} to="/" variant="success">Volver al inicio</Button>
        </Container>
    );
}

export default NoEncontrado;
