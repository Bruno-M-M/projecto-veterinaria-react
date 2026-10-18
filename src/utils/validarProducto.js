import { CATEGORIAS } from "../data/categorias.js";

const MAX_NOMBRE = 100;
const MAX_DESCRIPCION = 500;
const MIN_CODIGO = 3;

const limpiar = (valor) => String(valor ?? "").trim();

function esEnteroNoNegativo(texto) {
    const numero = Number(texto);
    return Number.isInteger(numero) && numero >= 0;
}

// Recibe los valores tal como salen del formulario (texto) y la lista de productos
// que ya existen. Devuelve un objeto { campo: "mensaje" } solo con los campos
// que tienen error; si no hay errores, devuelve {}.
export function validarProducto(datos, productosExistentes = []) {
    const errores = {};

    const codigo = limpiar(datos.codigo);
    if (codigo.length < MIN_CODIGO) {
        errores.codigo = `El código es requerido y debe tener al menos ${MIN_CODIGO} caracteres.`;
    } else if (productosExistentes.some((p) => p.codigo.toUpperCase() === codigo.toUpperCase())) {
        errores.codigo = "Ya existe un producto con ese código.";
    }

    const nombre = limpiar(datos.nombre);
    if (nombre === "") {
        errores.nombre = "El nombre es requerido.";
    } else if (nombre.length > MAX_NOMBRE) {
        errores.nombre = `El nombre no puede superar los ${MAX_NOMBRE} caracteres.`;
    }

    if (limpiar(datos.descripcion).length > MAX_DESCRIPCION) {
        errores.descripcion = `La descripción no puede superar los ${MAX_DESCRIPCION} caracteres.`;
    }

    const precio = limpiar(datos.precio);
    if (precio === "" || Number.isNaN(Number(precio))) {
        errores.precio = "El precio es requerido y debe ser un número.";
    } else if (Number(precio) < 0) {
        errores.precio = "El precio no puede ser negativo.";
    }

    const stock = limpiar(datos.stock);
    if (stock === "") {
        errores.stock = "El stock es requerido.";
    } else if (!esEnteroNoNegativo(stock)) {
        errores.stock = "El stock debe ser un número entero mayor o igual a 0.";
    }

    const stockCritico = limpiar(datos.stockCritico);
    if (stockCritico !== "" && !esEnteroNoNegativo(stockCritico)) {
        errores.stockCritico = "El stock crítico debe ser un número entero mayor o igual a 0.";
    }

    if (!CATEGORIAS.some((c) => c.valor === datos.categoria)) {
        errores.categoria = "Debe seleccionar una categoría.";
    }

    return errores;
}
