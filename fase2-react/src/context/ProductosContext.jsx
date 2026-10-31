import { createContext, useContext, useEffect, useState } from "react";
import { ProductosPorDefecto } from "../data/productosPorDefecto.js";

const CLAVE_STORAGE = "productosGuardados";

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {

    const [productos, setProductos] = useState(() => {
        const guardado = localStorage.getItem(CLAVE_STORAGE);
        return guardado ? JSON.parse(guardado) : ProductosPorDefecto;
    });

    useEffect(() => {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
    }, [productos]);

    function agregarProducto(producto) {
        setProductos((actual) => [...actual, producto]);
    }

    function eliminarProducto(codigo) {
        setProductos((actual) => actual.filter((p) => p.codigo !== codigo));
    }

    return (
        <ProductosContext.Provider value={{ productos, agregarProducto, eliminarProducto }}>
            {children}
        </ProductosContext.Provider>
    );
}

export function useProductos() {
    const contexto = useContext(ProductosContext);
    if (!contexto) {
        throw new Error("useProductos debe usarse dentro de <ProductosProvider>");
    }
    return contexto;
}
