export const CATEGORIAS = [
    { valor: "antibioticos", etiqueta: "Antibióticos" },
    { valor: "antiparasitarios", etiqueta: "Antiparasitarios" },
    { valor: "antiinflamatorios", etiqueta: "Antiinflamatorios" },
    { valor: "dermatologia", etiqueta: "Dermatología" },
    { valor: "digestivo", etiqueta: "Digestivo" },
    { valor: "cardiaco", etiqueta: "Cardíaco" },
    { valor: "analgesicos", etiqueta: "Analgésicos" },
    { valor: "vacunas", etiqueta: "Vacunas" },
    { valor: "suplementos", etiqueta: "Suplementos" },
];

export function nombreCategoria(valor) {
    const encontrada = CATEGORIAS.find((c) => c.valor === valor);
    return encontrada ? encontrada.etiqueta : valor;
}
