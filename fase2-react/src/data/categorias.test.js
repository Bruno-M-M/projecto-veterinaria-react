import { describe, test, expect } from "vitest";
import { nombreCategoria } from "./categorias.js";

describe("nombreCategoria", () => {
    test("devuelve la etiqueta legible de una categoria conocida", () => {
        expect(nombreCategoria("vacunas")).toBe("Vacunas");
    });

    test("si la categoria no existe devuelve el mismo valor", () => {
        expect(nombreCategoria("inexistente")).toBe("inexistente");
    });
});