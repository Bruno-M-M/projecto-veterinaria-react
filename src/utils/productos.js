export function formatoPrecio(valor) {
    return `$${Number(valor).toLocaleString("es-CL")}`;
}

export function esStockCritico(producto) {
    const stock = Number(producto.stock);
    const critico = Number(producto.stockCritico);
    if (Number.isNaN(stock)) return false;
    if (!Number.isNaN(critico) && critico > 0) return stock <= critico;
    return stock <= 5;
}

export function normalizarTexto(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
}