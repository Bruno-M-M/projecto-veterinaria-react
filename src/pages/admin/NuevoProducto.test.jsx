import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

async function escribir(etiqueta, valor) {
    const campo = screen.getByLabelText(etiqueta);
    if (campo.tagName === "SELECT") {
        await userEvent.selectOptions(campo, valor);
        return;
    }
    await userEvent.clear(campo);
    if (valor !== "") await userEvent.type(campo, valor);
}
const crear = () => userEvent.click(screen.getByText("Crear producto"));
const guardados = () => JSON.parse(localStorage.getItem("productosGuardados"));

async function llenarFormularioValido() {
    await escribir("Código", "ZZ999");
    await escribir("Nombre", "Producto de prueba");
    await escribir("Precio", "12000");
    await escribir("Stock", "5");
    await escribir("Categoría", "vacunas");
}

describe("NuevoProducto", () => {
    beforeEach(() => localStorage.clear());

    test("enviar el formulario vacío muestra los errores y no guarda nada", async () => {
        montar();
        await crear();
        expect(screen.getByText("Debe seleccionar una categoría.")).toBeInTheDocument();
        expect(screen.getByText("El nombre es requerido.")).toBeInTheDocument();
        expect(screen.getByText("El stock es requerido.")).toBeInTheDocument();
        expect(screen.queryByText("Lista de productos")).not.toBeInTheDocument();
        expect(guardados().length).toBe(1);
    });

    test("un código que ya existe muestra el error bajo el campo", async () => {
        montar();
        await llenarFormularioValido();
        await escribir("Código", "me001");
        await crear();
        expect(screen.getByText("Ya existe un producto con ese código.")).toBeInTheDocument();
        expect(guardados().length).toBe(1);
    });

    test("un precio negativo muestra el error", async () => {
        montar();
        await llenarFormularioValido();
        await escribir("Precio", "-5");
        await crear();
        expect(screen.getByText("El precio no puede ser negativo.")).toBeInTheDocument();
    });

    test("al escribir en un campo con error, ese error desaparece", async () => {
        montar();
        await crear();
        expect(screen.getByText("El nombre es requerido.")).toBeInTheDocument();
        await escribir("Nombre", "Algo");
        expect(screen.queryByText("El nombre es requerido.")).not.toBeInTheDocument();
    });

    test("con datos válidos guarda el producto con números y vuelve a la lista", async () => {
        montar();
        await llenarFormularioValido();
        await crear();
        expect(screen.getByText("Lista de productos")).toBeInTheDocument();
        const nuevo = guardados().find((p) => p.codigo === "ZZ999");
        expect(nuevo.precio).toBe(12000);
        expect(nuevo.stock).toBe(5);
        expect(nuevo.categoria).toBe("vacunas");
    });

    test("el stock crítico es opcional: si se deja vacío no se guarda", async () => {
        montar();
        await llenarFormularioValido();
        await crear();
        const nuevo = guardados().find((p) => p.codigo === "ZZ999");
        expect("stockCritico" in nuevo).toBe(false);
    });

    test("si se escribe el stock crítico se guarda como número", async () => {
        montar();
        await llenarFormularioValido();
        await escribir("Stock crítico (opcional)", "2");
        await crear();
        expect(guardados().find((p) => p.codigo === "ZZ999").stockCritico).toBe(2);
    });

    test("Cancelar vuelve a la lista sin guardar", () => {
        montar();
        expect(screen.getByText("Cancelar")).toHaveAttribute("href", "/admin/productos");
    });
});
