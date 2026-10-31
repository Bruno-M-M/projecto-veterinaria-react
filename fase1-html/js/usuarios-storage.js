
function guardarUsuariosEnStorage() {
  localStorage.setItem("usuariosGuardados", JSON.stringify(usuariosData));
}

function cargarUsuariosDesdeStorage() {
  const guardado = localStorage.getItem("usuariosGuardados");
  if (!guardado) return;

  const usuariosGuardados = JSON.parse(guardado);
  usuariosData.length = 0;
  usuariosData.push(...usuariosGuardados);
}

cargarUsuariosDesdeStorage();
