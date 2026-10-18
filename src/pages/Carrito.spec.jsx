import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext.jsx";
import Carrito from "./Carrito.jsx";

const A = { producto: "ME001", nombre: "Amoxibay 250mg", precio: 10000, cantidad: 2 };
const B = { producto: "ME002", nombre: "Enrox 50mg", precio: 15000, cantidad: 1 };

function montar(items = []) {
    localStorage.setItem("carrito", JSON.stringify(items));
    return render(
        <MemoryRouter initialEntries={["/carrito"]}>
            <CarritoProvider>
                <Routes>
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/checkout" element={<p>Pantalla de checkout</p>} />
                </Routes>
            </CarritoProvider>
        </MemoryRouter>
    );
}

const texto = (id) => screen.getByTestId(id).textContent;
const clic = (t) => fireEvent.click(screen.getByText(t));
const clicEtiqueta = (e) => fireEvent.click(screen.getByLabelText(e));

describe("Carrito (página)", () => {
    beforeEach(() => localStorage.clear());

    it("muestra el total y la cantidad de productos", () => {
        montar([A, B]);
        expect(texto("total-carrito")).toBe("Total: $35.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 3");
    });

    it("el botón + aumenta la cantidad y el total", () => {
        montar([A, B]);
        clicEtiqueta("Aumentar cantidad de Amoxibay 250mg");
        expect(texto("total-carrito")).toBe("Total: $45.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 4");
    });

    it("con el carrito vacío muestra el mensaje y el enlace a productos", () => {
        montar([]);
        expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
        expect(screen.getByText("Ver productos").getAttribute("href")).toBe("/productos");
    });

    it("Comprar ahora lleva a la pantalla de checkout", () => {
        montar([A]);
        clic("Comprar ahora");
        expect(screen.getByText("Pantalla de checkout")).toBeTruthy();
    });

    it("el botón - disminuye la cantidad y el total", () => {
        montar([A, B]);
        clicEtiqueta("Disminuir cantidad de Amoxibay 250mg");
        expect(texto("total-carrito")).toBe("Total: $25.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 2");
    });

    it("el botón - disminuye la cantidad y el total", () => {
        montar([A, B]);
        clicEtiqueta("Disminuir cantidad de Amoxibay 250mg");
        expect(texto("total-carrito")).toBe("Total: $25.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 2");
    });

    it("el botón - con cantidad 1 elimina la fila", () => {
        montar([A, B]);
        clicEtiqueta("Disminuir cantidad de Enrox 50mg");
        expect(screen.queryByText("Enrox 50mg")).toBeNull();
        expect(texto("total-carrito")).toBe("Total: $20.000");
    });

    it("Eliminar quita solo ese producto", () => {
        montar([A, B]);
        fireEvent.click(screen.getAllByText("Eliminar")[0]);
        expect(screen.queryByText("Amoxibay 250mg")).toBeNull();
        expect(screen.getByText("Enrox 50mg")).toBeTruthy();
        expect(texto("total-carrito")).toBe("Total: $15.000");
    });

    it("Limpiar carrito deja el carrito vacío", () => {
        montar([A, B]);
        clic("Limpiar carrito");
        expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
    });
});