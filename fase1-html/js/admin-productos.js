
function crearFilaProducto(producto) {
  const fila = document.createElement("tr");

  const celdaCodigo = document.createElement("td");
  celdaCodigo.textContent = producto.codigo;

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = producto.nombre;

  const celdaCategoria = document.createElement("td");
  celdaCategoria.textContent = producto.categoria;

  const celdaPrecio = document.createElement("td");
  celdaPrecio.textContent = `$${producto.precio}`;

  const celdaStock = document.createElement("td");
  celdaStock.textContent = producto.stock;
  if (producto.stock <= producto.stockCritico) {
    const alerta = document.createElement("span");
    alerta.className = "stock-alerta";
    alerta.textContent = "Stock crítico";
    celdaStock.appendChild(document.createElement("br"));
    celdaStock.appendChild(alerta);
  }


  const celdaAcciones = document.createElement("td");
  const linkEditar = document.createElement("a");
  linkEditar.href = `producto-form.html?codigo=${producto.codigo}`;
  linkEditar.className = "btn btn-sm btn-outline-secondary";
  linkEditar.textContent = "Editar";
  celdaAcciones.appendChild(linkEditar);

  fila.append(celdaCodigo, celdaNombre, celdaCategoria, celdaPrecio, celdaStock, celdaAcciones);
  return fila;
}

function renderizarTablaProductos() {
  const tbody = document.getElementById("admin-productos-items");
  if (!tbody) return;

  tbody.innerHTML = "";
  productos.forEach((producto) => {
    tbody.appendChild(crearFilaProducto(producto));
  });
}

renderizarTablaProductos();
