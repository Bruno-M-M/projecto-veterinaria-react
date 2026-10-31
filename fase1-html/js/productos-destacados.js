
function crearTarjetaDestacada(producto) {
  const col = document.createElement("div");
  col.className = "col-md-3 col-6";

  const card = document.createElement("div");
  card.className = "card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center p-3";

  const h3 = document.createElement("h3");
  h3.className = "h6 mb-1";
  h3.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.className = "text-muted small mb-2";
  precio.textContent = `$${producto.precio}`;

  const link = document.createElement("a");
  link.href = `detalle-producto.html?codigo=${producto.codigo}`;
  link.className = "btn btn-sm btn-outline-brand";
  link.textContent = "Ver más";

  card.append(h3, precio, link);
  col.appendChild(card);
  return col;
}

function renderizarProductosDestacados() {
  const grid = document.getElementById("productos-destacados-grid");
  if (!grid || typeof productos === "undefined") return;

  const destacados = productos.slice(0, 4);
  destacados.forEach((producto) => {
    grid.appendChild(crearTarjetaDestacada(producto));
  });
}

renderizarProductosDestacados();
