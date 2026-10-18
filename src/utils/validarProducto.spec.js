import { validarProducto } from "./validarProducto.js";

const VALIDO = {
    codigo: "ZZ999",
    nombre: "Producto de prueba",
    descripcion: "Una descripción corta",
    precio: "12000",
    stock: "5",
    stockCritico: "2",
    categoria: "vacunas",
};

const EXISTENTES = [{ codigo: "ME001" }, { codigo: "ME002" }];

const con = (cambios) => ({ ...VALIDO, ...cambios });

describe("validarProducto", () => {
    it("un producto con todos los datos correctos no tiene errores", () => {
        expect(validarProducto(VALIDO, EXISTENTES)).toEqual({});
    });

    it("con todos los campos vacíos marca los cinco obligatorios", () => {
        const vacio = { codigo: "", nombre: "", descripcion: "", precio: "", stock: "", stockCritico: "", categoria: "" };
        expect(Object.keys(validarProducto(vacio, EXISTENTES)).sort())
            .toEqual(["categoria", "codigo", "nombre", "precio", "stock"]);
    });

    describe("código", () => {
        it("rechaza un código de menos de 3 caracteres", () => {
            expect(validarProducto(con({ codigo: "ab" }), EXISTENTES).codigo).toContain("al menos 3");
        });

        it("rechaza un código que ya existe", () => {
            expect(validarProducto(con({ codigo: "ME001" }), EXISTENTES).codigo).toBe("Ya existe un producto con ese código.");
        });

        it("rechaza un código repetido aunque cambien mayúsculas y espacios", () => {
            expect(validarProducto(con({ codigo: " me001 " }), EXISTENTES).codigo).toBe("Ya existe un producto con ese código.");
        });
    });

    describe("nombre y descripción", () => {
        it("rechaza un nombre de más de 100 caracteres", () => {
            expect(validarProducto(con({ nombre: "a".repeat(101) }), EXISTENTES).nombre).toContain("100");
        });

        it("acepta un nombre de exactamente 100 caracteres", () => {
            expect(validarProducto(con({ nombre: "a".repeat(100) }), EXISTENTES).nombre).toBeUndefined();
        });

        it("rechaza una descripción de más de 500 caracteres", () => {
            expect(validarProducto(con({ descripcion: "a".repeat(501) }), EXISTENTES).descripcion).toContain("500");
        });

        it("la descripción es opcional", () => {
            expect(validarProducto(con({ descripcion: "" }), EXISTENTES).descripcion).toBeUndefined();
        });
    });

    describe("precio", () => {
        it("rechaza un precio negativo", () => {
            expect(validarProducto(con({ precio: "-1" }), EXISTENTES).precio).toBe("El precio no puede ser negativo.");
        });

        it("rechaza un precio que no es número", () => {
            expect(validarProducto(con({ precio: "abc" }), EXISTENTES).precio).toContain("debe ser un número");
        });

        it("acepta el precio 0", () => {
            expect(validarProducto(con({ precio: "0" }), EXISTENTES).precio).toBeUndefined();
        });
    });

    describe("stock", () => {
        it("rechaza un stock con decimales", () => {
            expect(validarProducto(con({ stock: "2.5" }), EXISTENTES).stock).toContain("entero");
        });

        it("rechaza un stock negativo", () => {
            expect(validarProducto(con({ stock: "-3" }), EXISTENTES).stock).toContain("entero");
        });

        it("el stock crítico es opcional", () => {
            expect(validarProducto(con({ stockCritico: "" }), EXISTENTES).stockCritico).toBeUndefined();
        });

        it("rechaza un stock crítico inválido", () => {
            expect(validarProducto(con({ stockCritico: "-1" }), EXISTENTES).stockCritico).toContain("entero");
        });
    });

    describe("categoría", () => {
        it("rechaza una categoría que no está en la lista", () => {
            expect(validarProducto(con({ categoria: "juguetes" }), EXISTENTES).categoria).toBe("Debe seleccionar una categoría.");
        });
    });

    it("si faltan campos en los datos no falla: los marca como obligatorios", () => {
        expect(Object.keys(validarProducto({})).sort())
            .toEqual(["categoria", "codigo", "nombre", "precio", "stock"]);
    });

    it("sin lista de productos existentes solo valida el formato del código", () => {
        expect(validarProducto(VALIDO)).toEqual({});
    });
});
