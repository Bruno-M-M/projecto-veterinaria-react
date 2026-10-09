import useComentarios from "../../hooks/useComentarios.js";

function AdminComentarios() {
    const { comentarios, eliminarComentario } = useComentarios();

    return (
        <>
            <h2 className="mb-4">Comentarios ({comentarios.length})</h2>

            {comentarios.length === 0 ? (
                <p className="text-muted">Todavía no hay comentarios.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle bg-white shadow-sm">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Comentario</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {comentarios.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.fecha}</td>
                                    <td>{c.nombre}</td>
                                    <td>{c.correo}</td>
                                    <td style={{ maxWidth: 350 }}>{c.comentario}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                if (window.confirm("¿Eliminar este comentario?")) {
                                                    eliminarComentario(c.id);
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default AdminComentarios;