import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_STORAGE = "carrito";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
    // Se lee localStorage en el inicializador de useState (no en un useEffect aparte):
    // con dos efectos, el de guardado pisaba lo guardado con [] antes de terminar la carga.
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem(CLAVE_STORAGE);
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
    }, [carrito]);

    function agregarAlCarrito(producto, cantidad = 1) {
        setCarrito((actual) => {
            const existe = actual.find((item) => item.producto === producto.codigo);
            if (existe) {
                return actual.map((item) =>
                    item.producto === producto.codigo
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            }
            return [
                ...actual,
                { producto: producto.codigo, nombre: producto.nombre, precio: producto.precio, cantidad },
            ];
        });
    }

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    const contexto = useContext(CarritoContext);
    if (!contexto) {
        throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
    }
    return contexto;
}
