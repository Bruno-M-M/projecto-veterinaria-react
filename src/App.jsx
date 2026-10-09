import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Contacto from "./Pages/Contacto.jsx";
import Pendiente from "./Pages/Pendiente.jsx";
import AdminLayout from "./Components/Admin/Adminlayout.jsx";
import RutaAdmin from "./Components/RutaAdmin.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminComentarios from "./Pages/Admin/adminComentarios.jsx";
import Login from "./Pages/Login.jsx";

const paginasPendientes = [
    ["productos", "Productos"],
    ["servicios", "Servicios"],
    ["nosotros", "Nosotros"],
    ["blogs", "Blogs"],
    ["carrito", "Carrito"],
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* --- Vistas del VISITANTE --- */}
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="login" element={<Login />} />
                    
                    {paginasPendientes.map(([ruta, titulo]) => (
                        <Route key={ruta} path={ruta} element={<Pendiente titulo={titulo} />} />
                    ))}
                </Route>

                {/* --- Vistas del ADMINISTRADOR --- */}
                <Route
                    path="admin"
                    element={
                        <RutaAdmin>
                            <AdminLayout />
                        </RutaAdmin>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="comentarios" element={<AdminComentarios />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;