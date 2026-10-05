import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Contacto from "./Pages/Contacto.jsx";
import Pendiente from "./Pages/Pendiente.jsx";

const paginas = [
    ["productos", "Productos"],
    ["servicios", "Servicios"],
    ["nosotros", "Nosotros"],
    ["blogs", "Blogs"],
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
                    <Route path="contacto" element={<Contacto />} />
                    {paginas.map(([ruta, titulo]) => (
                        <Route key={ruta} path={ruta} element={<Pendiente titulo={titulo} />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;