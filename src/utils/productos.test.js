import { describe, test, expect } from "vitest";
import { formatoPrecio, esStockCritico } from "./productos.js";

describe("esStockCritico", () => {
    test("es crítico si el stock es menor o igual al crítico", () => {
        expect(esStockCritico({ stock: 4, stockCritico: 10 })).toBe(true);
    });

    test("no es crítico si el stock supera al crítico", () => {
        expect(esStockCritico({ stock: 45, stockCritico: 10 })).toBe(false);
    });

    test("sin stockCritico usa 5 como límite", () => {
        expect(esStockCritico({ stock: 5 })).toBe(true);
        expect(esStockCritico({ stock: 6 })).toBe(false);
    });

    test("con stock inválido devuelve falso", () => {
        expect(esStockCritico({ stock: "abc", stockCritico: 10 })).toBe(false);
    });
});

describe("formatoPrecio", () => {
    test("agrega el signo peso y el separador de miles", () => {
        expect(formatoPrecio(15000)).toBe("$15.000");
    });

    test("muestra el cero sin separadores", () => {
        expect(formatoPrecio(0)).toBe("$0");
    });

    test("acepta un número escrito como texto", () => {
        expect(formatoPrecio("8400")).toBe("$8.400");
    });
});
