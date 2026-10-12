import { nombreCategoria } from "./categorias.js";

describe("nombreCategoria", () => {
    it("devuelve la etiqueta legible de una categoria conocida", () => {
        expect(nombreCategoria("vacunas")).toBe("Vacunas");
    });

    it("si la categoria no existe devuelve el mismo valor", () => {
        expect(nombreCategoria("inexistente")).toBe("inexistente");
    });
});