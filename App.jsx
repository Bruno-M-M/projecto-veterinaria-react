import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Contacto from "./Pages/Contacto.jsx";
import Pendiente from "./Pages/Nosotros.jsx";
import AdminLayout from "./Components/Admin/Adminlayout.jsx";
import RutaAdmin from "./Components/RutaAdmin.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminComentarios from "./Pages/Admin/AdminComentarios.jsx";
import Login from "./Pages/Login.jsx";
import Nosotros from "./Pages/Nosotros.jsx";
import Blogs from "./Pages/Blogs.jsx";
import BlogDetalle from "./Pages/BlogDetalle.jsx";



const paginasPendientes = [
    ["productos", "Productos"],
    ["servicios", "Servicios"],
    ["carrito", "Carrito"],
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="login" element={<Login />} />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="blogs/:id" element={<BlogDetalle />} />

                    {paginasPendientes.map(([ruta, titulo]) => (
                        <Route key={ruta} path={ruta} element={<Pendiente titulo={titulo} />} />
                    ))}
                </Route>

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