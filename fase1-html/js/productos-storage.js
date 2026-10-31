
function guardarProductosEnStorage() {
  localStorage.setItem("productosGuardados", JSON.stringify(productos));
}

function cargarProductosDesdeStorage() {
  const guardado = localStorage.getItem("productosGuardados");
  if (!guardado) return;

  const productosGuardados = JSON.parse(guardado);
  productos.length = 0;
  productos.push(...productosGuardados);
}

cargarProductosDesdeStorage();
