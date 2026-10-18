import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Pendiente from "./pages/Pendiente.jsx";

const paginas = [
    ["servicios", "Servicios"],
    ["nosotros", "Nosotros"],
    ["blogs", "Blogs"],
    ["contacto", "Contacto"],
    ["login", "Iniciar sesión"],
    ["registro", "Registrarse"],
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="productos" element={<Productos />} />
                    <Route path="producto/:codigo" element={<DetalleProducto />} />
                    <Route path="carrito" element={<Carrito />} />
                    {paginas.map(([ruta, titulo]) => (
                        <Route key={ruta} path={ruta} element={<Pendiente titulo={titulo} />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
