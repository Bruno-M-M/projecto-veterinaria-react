import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_STORAGE = "carrito";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {

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

    function cambiarCantidad(codigo, delta) {
        setCarrito((actual) =>
            actual
                .map((item) =>
                    item.producto === codigo
                        ? { ...item, cantidad: item.cantidad + delta }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }

    function quitarDelCarrito(codigo) {
        setCarrito((actual) => actual.filter((item) => item.producto !== codigo));
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                cambiarCantidad,
                quitarDelCarrito,
                vaciarCarrito,
                total,
                cantidadTotal,
            }}
        >
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
