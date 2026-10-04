import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Productos from "./Pages/Productos.jsx";
import Pendiente from "./Pages/Pendiente.jsx";

const paginas = [
    ["servicios", "Servicios"],
    ["nosotros", "Nosotros"],
    ["blogs", "Blogs"],
    ["contacto", "Contacto"],
    ["carrito", "Carrito"],
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
                    {paginas.map(([ruta, titulo]) => (
                        <Route key={ruta} path={ruta} element={<Pendiente titulo={titulo} />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
