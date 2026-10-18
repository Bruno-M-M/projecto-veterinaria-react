import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ProductosProvider } from "../../context/ProductosContext.jsx";
import NuevoProducto from "./NuevoProducto.jsx";

const AMOXIBAY = { codigo: "ME001", nombre: "Amoxibay 250mg", categoria: "antibioticos", precio: 10000, stock: 45, stockCritico: 10 };

function montar() {
    localStorage.setItem("productosGuardados", JSON.stringify([AMOXIBAY]));
    return render(
        <MemoryRouter initialEntries={["/admin/productos/nuevo"]}>
            <ProductosProvider>
                <Routes>
                    <Route path="/admin/productos/nuevo" element={<NuevoProducto />} />
                    <Route path="/admin/productos" element={<p>Lista de productos</p>} />
                </Routes>
            </ProductosProvider>
        </MemoryRouter>
    );
}

const escribir = (etiqueta, valor) =>
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const crear = () => fireEvent.click(screen.getByText("Crear producto"));
const guardados = () => JSON.parse(localStorage.getItem("productosGuardados"));

function llenarFormularioValido() {
    escribir("Código", "ZZ999");
    escribir("Nombre", "Producto de prueba");
    escribir("Precio", "12000");
    escribir("Stock", "5");
    escribir("Categoría", "vacunas");
}

describe("NuevoProducto", () => {
    beforeEach(() => localStorage.clear());

    it("enviar el formulario vacío muestra los errores y no guarda nada", () => {
        montar();
        crear();
        expect(screen.getByText("Debe seleccionar una categoría.")).toBeTruthy();
        expect(screen.getByText("El nombre es requerido.")).toBeTruthy();
        expect(screen.getByText("El stock es requerido.")).toBeTruthy();
        expect(screen.queryByText("Lista de productos")).toBeNull();
        expect(guardados().length).toBe(1);
    });

    it("un código que ya existe muestra el error bajo el campo", () => {
        montar();
        llenarFormularioValido();
        escribir("Código", "me001");
        crear();
        expect(screen.getByText("Ya existe un producto con ese código.")).toBeTruthy();
        expect(guardados().length).toBe(1);
    });

    it("un precio negativo muestra el error", () => {
        montar();
        llenarFormularioValido();
        escribir("Precio", "-5");
        crear();
        expect(screen.getByText("El precio no puede ser negativo.")).toBeTruthy();
    });

    it("al escribir en un campo con error, ese error desaparece", () => {
        montar();
        crear();
        expect(screen.getByText("El nombre es requerido.")).toBeTruthy();
        escribir("Nombre", "Algo");
        expect(screen.queryByText("El nombre es requerido.")).toBeNull();
    });

    it("con datos válidos guarda el producto con números y vuelve a la lista", () => {
        montar();
        llenarFormularioValido();
        crear();
        expect(screen.getByText("Lista de productos")).toBeTruthy();
        const nuevo = guardados().find((p) => p.codigo === "ZZ999");
        expect(nuevo.precio).toBe(12000);
        expect(nuevo.stock).toBe(5);
        expect(nuevo.categoria).toBe("vacunas");
    });

    it("el stock crítico es opcional: si se deja vacío no se guarda", () => {
        montar();
        llenarFormularioValido();
        crear();
        const nuevo = guardados().find((p) => p.codigo === "ZZ999");
        expect("stockCritico" in nuevo).toBe(false);
    });

    it("si se escribe el stock crítico se guarda como número", () => {
        montar();
        llenarFormularioValido();
        escribir("Stock crítico (opcional)", "2");
        crear();
        expect(guardados().find((p) => p.codigo === "ZZ999").stockCritico).toBe(2);
    });

    it("Cancelar vuelve a la lista sin guardar", () => {
        montar();
        expect(screen.getByText("Cancelar").getAttribute("href")).toBe("/admin/productos");
    });
});
