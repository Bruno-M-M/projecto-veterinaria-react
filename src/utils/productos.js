export function formatoPrecio(valor) {
    return `$${Number(valor).toLocaleString("es-CL")}`;
}

export function enOferta(producto) {
    return typeof producto.precioOferta === "number" && producto.precioOferta < producto.precio;
}

export function precioFinal(producto) {
    return enOferta(producto) ? producto.precioOferta : producto.precio;
}

export function porcentajeDescuento(producto) {
    if (!enOferta(producto)) return 0;
    return Math.round((1 - producto.precioOferta / producto.precio) * 100);
}

export function esStockCritico(producto) {
    const stock = Number(producto.stock);
    const critico = Number(producto.stockCritico);
    if (Number.isNaN(stock)) return false;
    if (!Number.isNaN(critico) && critico > 0) return stock <= critico;
    return stock <= 5;
}

export function nombreCategoria(valor, categorias) {
    const encontrada = categorias.find((c) => c.valor === valor);
    return encontrada ? encontrada.etiqueta : valor;
}

export function normalizarTexto(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
}

export function filtrarProductos(productos, { texto = "", categoria = "todas", soloOfertas = false, orden = "" }) {
    const consulta = normalizarTexto(texto.trim());

    let resultado = productos.filter((p) => {
        if (categoria !== "todas" && p.categoria !== categoria) return false;
        if (soloOfertas && !enOferta(p)) return false;
        if (consulta === "") return true;
        return (
            normalizarTexto(p.nombre).includes(consulta) ||
            normalizarTexto(p.descripcion).includes(consulta) ||
            normalizarTexto(p.codigo).includes(consulta)
        );
    });

    if (orden === "precio-asc") {
        resultado = [...resultado].sort((a, b) => precioFinal(a) - precioFinal(b));
    } else if (orden === "precio-desc") {
        resultado = [...resultado].sort((a, b) => precioFinal(b) - precioFinal(a));
    } else if (orden === "nombre") {
        resultado = [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    }

    return resultado;
}
