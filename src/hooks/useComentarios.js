import { useState, useEffect } from "react";

const CLAVE_STORAGE = "comentarios_san_marcos";

export function useComentarios() {
    const [comentarios, setComentarios] = useState(() => {
        try {
            const guardados = localStorage.getItem(CLAVE_STORAGE);
            return guardados ? JSON.parse(guardados) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(comentarios));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [comentarios]);

    const agregarComentario = (nuevoComentario) => {
        const comentarioConMeta = {
            id: Date.now(),
            fecha: new Date().toLocaleDateString("es-CL"),
            ...nuevoComentario,
        };
        setComentarios((prev) => [comentarioConMeta, ...prev]);
    };

    const eliminarComentario = (id) => {
        setComentarios((prev) => prev.filter((c) => c.id !== id));
    };

    return {
        comentarios,
        agregarComentario,
        eliminarComentario,
    };
}

// Agregar esta línea al final:
export default useComentarios;