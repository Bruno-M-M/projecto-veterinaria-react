import { render, screen, fireEvent } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "./CarritoContext.jsx";

const PRODUCTO = { codigo: "ME001", nombre: "Amoxibay 250mg", precio: 4200 };
const OTRO = { codigo: "ME002", nombre: "Enrox 50mg", precio: 6800 };

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
            <button onClick={() => agregarAlCarrito(OTRO)}>agregar otro</button>
            <button onClick={() => agregarAlCarrito(PRODUCTO, 3)}>agregar tres</button>
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

    it("agregar dos veces el mismo producto suma la cantidad en una sola línea", () => {
        montar();
        clic("agregar");
        clic("agregar");
        expect(ver("lineas")).toBe("1");
        expect(ver("cantidad")).toBe("2");
        expect(ver("total")).toBe("8400");
    });

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

    it("al iniciar recupera el carrito guardado en localStorage", () => {
        localStorage.setItem("carrito", JSON.stringify([
            { producto: "ME001", nombre: "Amoxibay 250mg", precio: 4200, cantidad: 2 },
        ]));
        montar();
        expect(ver("cantidad")).toBe("2");
    });

    it("guarda el carrito en localStorage cada vez que cambia", () => {
        const espia = spyOn(Storage.prototype, "setItem").and.callThrough();
        montar();
        clic("agregar");
        expect(espia).toHaveBeenCalledWith("carrito", jasmine.stringMatching("ME001"));
    });

    it("useCarrito fuera del CarritoProvider lanza un error claro", async () => {
        spyOn(console, "error");
        await jasmine.spyOnGlobalErrorsAsync(async () => {
            expect(() => render(<Sonda />)).toThrowError(/CarritoProvider/);
        });
    });

    it("quitar elimina solo ese producto", () => {
        montar();
        clic("agregar");
        clic("agregar otro");
        clic("quitar");
        expect(ver("lineas")).toBe("1");
        expect(ver("total")).toBe("6800");
    });

    it("vaciar deja el carrito sin productos", () => {
        montar();
        clic("agregar");
        clic("agregar otro");
        clic("vaciar");
        expect(ver("lineas")).toBe("0");
    });

    it("sumar cambia solo la cantidad de su producto", () => {
        montar();
        clic("agregar");
        clic("agregar otro");
        clic("sumar");
        expect(ver("cantidad")).toBe("3");
        expect(ver("total")).toBe("15200");
    });

    it("agregar con una cantidad distinta de 1", () => {
        montar();
        clic("agregar tres");
        expect(ver("cantidad")).toBe("3");
        expect(ver("total")).toBe("12600");
    });

    it("agregar un producto repetido no toca a los demás", () => {
        montar();
        clic("agregar");
        clic("agregar otro");
        clic("agregar");
        expect(ver("lineas")).toBe("2");
        expect(ver("total")).toBe("15200");
    });
});