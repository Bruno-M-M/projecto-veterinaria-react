import React from "react";

export default function ListaComentarios({ comentarios = [] }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Comentarios</h3>
            {comentarios.length === 0 ? (
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {comentarios.map((comentario, index) => (
                        <li 
                            key={index} 
                            style={{
                                border: "1px solid #ccc", 
                                borderRadius: "8px", 
                                padding: "10px", 
                                marginBottom: "10px",
                                backgroundColor: "#f9f9f9"
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: "bold" }}>
                                {comentario.nombre || "Anónimo"}
                            </p>
                            <p style={{ margin: "5px 0 0 0" }}>
                                {comentario.texto || comentario.contenido || comentario}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}