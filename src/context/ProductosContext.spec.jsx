import { render, screen, fireEvent } from "@testing-library/react";
import { ProductosProvider, useProductos } from "./ProductosContext.jsx";
import { ProductosPorDefecto } from "../data/productosPorDefecto.js";

const NUEVO = { codigo: "ZZ999", nombre: "Producto de prueba", precio: 12000, stock: 5, categoria: "vacunas" };

function Sonda() {
    const { productos, agregarProducto, eliminarProducto } = useProductos();
    const existe = (codigo) => productos.some((p) => p.codigo === codigo);
    return (
        <div>
            <span data-testid="cantidad">{productos.length}</span>
            <span data-testid="hay-nuevo">{String(existe("ZZ999"))}</span>
            <span data-testid="hay-me001">{String(existe("ME001"))}</span>
            <button onClick={() => agregarProducto(NUEVO)}>agregar</button>
            <button onClick={() => eliminarProducto("ME001")}>eliminar ME001</button>
            <button onClick={() => eliminarProducto("NO-EXISTE")}>eliminar inexistente</button>
        </div>
    );
}

const montar = () => render(<ProductosProvider><Sonda /></ProductosProvider>);
const ver = (id) => screen.getByTestId(id).textContent;
const clic = (texto) => fireEvent.click(screen.getByText(texto));

describe("ProductosContext", () => {
    beforeEach(() => localStorage.clear());

    it("sin datos guardados parte con los productos por defecto", () => {
        montar();
        expect(ver("cantidad")).toBe(String(ProductosPorDefecto.length));
    });

    it("agregarProducto suma el producto a la lista", () => {
        montar();
        clic("agregar");
        expect(ver("cantidad")).toBe(String(ProductosPorDefecto.length + 1));
        expect(ver("hay-nuevo")).toBe("true");
    });

    it("eliminarProducto quita solo el producto con ese código", () => {
        montar();
        clic("eliminar ME001");
        expect(ver("hay-me001")).toBe("false");
        expect(ver("cantidad")).toBe(String(ProductosPorDefecto.length - 1));
    });

    it("eliminar un código que no existe no cambia la lista", () => {
        montar();
        clic("eliminar inexistente");
        expect(ver("cantidad")).toBe(String(ProductosPorDefecto.length));
    });

    it("al iniciar recupera la lista guardada en localStorage", () => {
        localStorage.setItem("productosGuardados", JSON.stringify([NUEVO]));
        montar();
        expect(ver("cantidad")).toBe("1");
        expect(ver("hay-nuevo")).toBe("true");
    });

    it("guarda la lista en localStorage cada vez que cambia", () => {
        const espia = spyOn(Storage.prototype, "setItem").and.callThrough();
        montar();
        clic("agregar");
        expect(espia).toHaveBeenCalledWith("productosGuardados", jasmine.stringMatching("ZZ999"));
    });

    it("useProductos fuera del ProductosProvider lanza un error claro", async () => {
        spyOn(console, "error");
        await jasmine.spyOnGlobalErrorsAsync(async () => {
            expect(() => render(<Sonda />)).toThrowError(/ProductosProvider/);
        });
    });
});
