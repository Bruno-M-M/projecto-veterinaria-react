import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProductosProvider } from "../../context/ProductosContext.jsx";
import AdminProductos from "./AdminProductos.jsx";

const AMOXIBAY = { codigo: "ME001", nombre: "Amoxibay 250mg", categoria: "antibioticos", precio: 10000, stock: 45, stockCritico: 10 };
const BRAVECTO = { codigo: "ME005", nombre: "Bravecto", categoria: "antiparasitarios", precio: 18900, stock: 4, stockCritico: 10 };

function montar(productos) {
    localStorage.setItem("productosGuardados", JSON.stringify(productos));
    return render(
        <MemoryRouter>
            <ProductosProvider>
                <AdminProductos />
            </ProductosProvider>
        </MemoryRouter>
    );
}

describe("AdminProductos", () => {
    beforeEach(() => localStorage.clear());

    test("muestra una fila por producto con categoría y precio formateados", () => {
        montar([AMOXIBAY, BRAVECTO]);
        const fila = screen.getByText("Amoxibay 250mg").closest("tr");
        expect(within(fila).getByText("Antibióticos")).toBeInTheDocument();
        expect(within(fila).getByText("$10.000")).toBeInTheDocument();
        expect(screen.getByText("Bravecto")).toBeInTheDocument();
    });

    test("marca Stock crítico solo en los productos con stock bajo", () => {
        montar([AMOXIBAY, BRAVECTO]);
        expect(screen.getAllByText("Stock crítico").length).toBe(1);
        const fila = screen.getByText("Bravecto").closest("tr");
        expect(within(fila).getByText("Stock crítico")).toBeInTheDocument();
    });

    test("Eliminar con confirmación quita el producto de la tabla", async () => {
        vi.spyOn(window, "confirm").mockReturnValue(true);
        montar([AMOXIBAY, BRAVECTO]);
        await userEvent.click(screen.getByLabelText("Eliminar Bravecto"));
        expect(screen.queryByText("Bravecto")).not.toBeInTheDocument();
        expect(screen.getByText("Amoxibay 250mg")).toBeInTheDocument();
    });

    test("Eliminar cancelado deja el producto en la tabla", async () => {
        vi.spyOn(window, "confirm").mockReturnValue(false);
        montar([AMOXIBAY, BRAVECTO]);
        await userEvent.click(screen.getByLabelText("Eliminar Bravecto"));
        expect(window.confirm).toHaveBeenCalled();
        expect(screen.getByText("Bravecto")).toBeInTheDocument();
    });

    test("el botón Nuevo producto lleva al formulario", () => {
        montar([AMOXIBAY]);
        expect(screen.getByText("+ Nuevo producto")).toHaveAttribute("href", "/admin/productos/nuevo");
    });

    test("sin productos muestra un mensaje en lugar de la tabla", () => {
        montar([]);
        expect(screen.getByText("No hay productos registrados.")).toBeInTheDocument();
    });
});
