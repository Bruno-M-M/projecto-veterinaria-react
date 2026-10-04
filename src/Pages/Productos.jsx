import { useState } from "react";
import { ProductosPorDefecto } from "../data/productosPorDefecto.js";
import ProductoCard from "../Components/ProductoCard.jsx";


const CATEGORIAS = [
    { valor: "todas", etiqueta: "Todas las categorías" },
    { valor: "antibioticos", etiqueta: "Antibióticos" },
    { valor: "antiparasitarios", etiqueta: "Antiparasitarios" },
    { valor: "antiinflamatorios", etiqueta: "Antiinflamatorios" },
    { valor: "dermatologia", etiqueta: "Dermatología" },
    { valor: "digestivo", etiqueta: "Digestivo" },
    { valor: "cardiaco", etiqueta: "Cardíaco" },
    { valor: "analgesicos", etiqueta: "Analgésicos" },
    { valor: "vacunas", etiqueta: "Vacunas" },
    { valor: "suplementos", etiqueta: "Suplementos" }
];

function Productos() {
    const [categoria, setCategoria] = useState("todas");

    const productosAMostrar = 
        categoria === "todas"
        ? ProductosPorDefecto
        : ProductosPorDefecto.filter((p) => p.categoria === categoria);

    return (
        <section id="productos">
            <div className="select-categoria">
                <h2 className="servicios-nombre">Nuestros Productos</h2>

                <select 
                    className="categoria-select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    >
                        {CATEGORIAS.map((c) => (
                            <option key={c.valor} value={c.valor}>
                                {c.etiqueta}
                            </option>
                        ))}
                    </select>
            </div>

            <div className="servicios">
                {productosAMostrar.map((producto) => (
                    <ProductoCard key={producto.codigo} producto={producto}/>
                ))}
            </div>
        </section>
    )
}

export default Productos;