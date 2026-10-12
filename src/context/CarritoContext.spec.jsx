import { render, screen, fireEvent } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "./CarritoContext.jsx";

const PRODUCTO = { codigo: "ME001", nombre: "Amoxibay 250mg", precio: 4200 };

function Sonda() {
    const { carrito, total, cantidadTotal, agregarAlCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito } = useCarrito();
    return (
        <div>
            <span data-testid="total">{total}</span>
            <span data-testid="cantidad">{cantidadTotal}</span>
            <span data-testid="lineas">{carrito.length}</span>
            <button onClick={() => agregarAlCarrito(PRODUCTO)}>agregar</button>
            <button onClick={() => cambiarCantidad("ME001", 1)}>sumar</button>
            <button onClick={() => cambiarCantidad("ME001", -1)}>restar</button>
            <button onClick={() => quitarDelCarrito("ME001")}>quitar</button>
            <button onClick={vaciarCarrito}>vaciar</button>
        </div>
    );
}

const montar = () => render(<CarritoProvider><Sonda /></CarritoProvider>);
const ver = (id) => screen.getByTestId(id).textContent;
const clic = (texto) => fireEvent.click(screen.getByText(texto));

describe("CarritoContext", () => {
    beforeEach(() => localStorage.clear());

    it("agregar un producto actualiza líneas, cantidad y total", () => {
        montar();
        clic("agregar");
        expect(ver("lineas")).toBe("1");
        expect(ver("total")).toBe("4200");
    });

    it("agregar dos veces el mismo producto suma la cantidad en una sola linea", () => {
        montar();
        clic("agregar");
        clic("agregar");
        expect(ver("lineas")).toBe("1");
        expect(ver("cantidad")).toBe("2");
        expect(ver("total")).toBe("8400");
    })

    it("sumar aumenta la cantidad y el total", () => {
        montar();
        clic("agregar");
        clic("sumar");
        expect(ver("cantidad")).toBe("2");
        expect(ver("total")).toBe("8400");
    });

    it("restar cuando la cantidad es 1 elimina el producto", () => {
        montar();
        clic("agregar");
        clic("restar");
        expect(ver("lineas")).toBe("0");
        expect(ver("total")).toBe("0");
});
});