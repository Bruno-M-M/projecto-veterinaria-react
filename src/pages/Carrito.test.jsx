import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
const clic = (t) => userEvent.click(screen.getByText(t));
const clicEtiqueta = (e) => userEvent.click(screen.getByLabelText(e));

describe("Carrito (página)", () => {
    beforeEach(() => localStorage.clear());

    test("muestra el total y la cantidad de productos", () => {
        montar([A, B]);
        expect(texto("total-carrito")).toBe("Total: $35.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 3");
    });

    test("el botón + aumenta la cantidad y el total", async () => {
        montar([A, B]);
        await clicEtiqueta("Aumentar cantidad de Amoxibay 250mg");
        expect(texto("total-carrito")).toBe("Total: $45.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 4");
    });

    test("con el carrito vacío muestra el mensaje y el enlace a productos", () => {
        montar([]);
        expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
        expect(screen.getByText("Ver productos")).toHaveAttribute("href", "/productos");
    });

    test("Comprar ahora lleva a la pantalla de checkout", async () => {
        montar([A]);
        await clic("Comprar ahora");
        expect(screen.getByText("Pantalla de checkout")).toBeInTheDocument();
    });

    test("el botón - disminuye la cantidad y el total", async () => {
        montar([A, B]);
        await clicEtiqueta("Disminuir cantidad de Amoxibay 250mg");
        expect(texto("total-carrito")).toBe("Total: $25.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 2");
    });

    test("el botón - disminuye la cantidad y el total", async () => {
        montar([A, B]);
        await clicEtiqueta("Disminuir cantidad de Amoxibay 250mg");
        expect(texto("total-carrito")).toBe("Total: $25.000");
        expect(texto("cantidad-carrito")).toBe("Cantidad de productos: 2");
    });

    test("el botón - con cantidad 1 elimina la fila", async () => {
        montar([A, B]);
        await clicEtiqueta("Disminuir cantidad de Enrox 50mg");
        expect(screen.queryByText("Enrox 50mg")).not.toBeInTheDocument();
        expect(texto("total-carrito")).toBe("Total: $20.000");
    });

    test("Eliminar quita solo ese producto", async () => {
        montar([A, B]);
        await userEvent.click(screen.getAllByText("Eliminar")[0]);
        expect(screen.queryByText("Amoxibay 250mg")).not.toBeInTheDocument();
        expect(screen.getByText("Enrox 50mg")).toBeInTheDocument();
        expect(texto("total-carrito")).toBe("Total: $15.000");
    });

    test("Limpiar carrito deja el carrito vacío", async () => {
        montar([A, B]);
        await clic("Limpiar carrito");
        expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
    });
});