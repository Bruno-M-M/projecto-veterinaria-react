import { render, screen, fireEvent, within } from "@testing-library/react";
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

    it("muestra una fila por producto con categoría y precio formateados", () => {
        montar([AMOXIBAY, BRAVECTO]);
        const fila = screen.getByText("Amoxibay 250mg").closest("tr");
        expect(within(fila).getByText("Antibióticos")).toBeTruthy();
        expect(within(fila).getByText("$10.000")).toBeTruthy();
        expect(screen.getByText("Bravecto")).toBeTruthy();
    });

    it("marca Stock crítico solo en los productos con stock bajo", () => {
        montar([AMOXIBAY, BRAVECTO]);
        expect(screen.getAllByText("Stock crítico").length).toBe(1);
        const fila = screen.getByText("Bravecto").closest("tr");
        expect(within(fila).getByText("Stock crítico")).toBeTruthy();
    });

    it("Eliminar con confirmación quita el producto de la tabla", () => {
        spyOn(window, "confirm").and.returnValue(true);
        montar([AMOXIBAY, BRAVECTO]);
        fireEvent.click(screen.getByLabelText("Eliminar Bravecto"));
        expect(screen.queryByText("Bravecto")).toBeNull();
        expect(screen.getByText("Amoxibay 250mg")).toBeTruthy();
    });

    it("Eliminar cancelado deja el producto en la tabla", () => {
        spyOn(window, "confirm").and.returnValue(false);
        montar([AMOXIBAY, BRAVECTO]);
        fireEvent.click(screen.getByLabelText("Eliminar Bravecto"));
        expect(window.confirm).toHaveBeenCalled();
        expect(screen.getByText("Bravecto")).toBeTruthy();
    });

    it("el botón Nuevo producto lleva al formulario", () => {
        montar([AMOXIBAY]);
        expect(screen.getByText("+ Nuevo producto").getAttribute("href")).toBe("/admin/productos/nuevo");
    });

    it("sin productos muestra un mensaje en lugar de la tabla", () => {
        montar([]);
        expect(screen.getByText("No hay productos registrados.")).toBeTruthy();
    });
});
