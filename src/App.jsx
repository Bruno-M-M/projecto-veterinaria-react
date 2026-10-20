import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Pendiente from "./pages/Pendiente.jsx";
import AdminProductos from "./pages/admin/AdminProductos.jsx";
import NuevoProducto from "./pages/admin/NuevoProducto.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

const paginas = [
    ["servicios", "Servicios"],
    ["nosotros", "Nosotros"],
    ["blogs", "Blogs"],
    ["contacto", "Contacto"],
    ["login", "Iniciar sesión"],
    ["registro", "Registrarse"],
    ["checkout", "Checkout"],
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
                    <Route path="admin/productos" element={<AdminProductos />} />
                    <Route path="admin/productos/nuevo" element={<NuevoProducto />} />
                    {paginas.map(([ruta, titulo]) => (
                        <Route key={ruta} path={ruta} element={<Pendiente titulo={titulo} />} />
                    ))}
                    <Route path="*" element={<NoEncontrado />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
