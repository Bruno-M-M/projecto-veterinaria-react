
function crearTarjetaProducto(producto) {
  const article = document.createElement("article");
  article.className = producto.categoria;

  const h3 = document.createElement("h3");
  const link = document.createElement("a");
  link.href = `detalle-producto.html?codigo=${producto.codigo}`;
  link.className = "producto-link";
  link.textContent = producto.nombre;
  h3.appendChild(link);

  const p = document.createElement("p");
  p.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.className = "precio";
  precio.textContent = `$${producto.precio}`;

  const boton = document.createElement("button");
  boton.className = "btn btn-outline-success boton-agregar";
  boton.dataset.producto = producto.codigo;
  boton.dataset.precio = producto.precio;
  boton.textContent = "Agregar";

  article.append(h3, p, precio, boton);
  return article;
}

function renderizarProductos(categoria) {
  const contenedor = document.querySelector(".servicios");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const productosAMostrar =
    !categoria || categoria === "todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  productosAMostrar.forEach((producto) => {
    contenedor.appendChild(crearTarjetaProducto(producto));
  });
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(boton) {
  const producto = boton.dataset.producto;
  const precio = Number(boton.dataset.precio);
  const nombre = boton.closest("article").querySelector("h3").textContent;

  const item = carrito.find((p) => p.producto === producto);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ producto, nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  mostrarConfirmacion(boton);
}

function mostrarConfirmacion(boton) {
  const textoOriginal = boton.textContent;
  boton.textContent = "Agregado";
  boton.disabled = true;

  setTimeout(() => {
    boton.textContent = textoOriginal;
    boton.disabled = false;
  }, 1200);
}

renderizarProductos();

document.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".boton-agregar");
  if (boton) {
    agregarAlCarrito(boton);
  }
});

const selectCategoria = document.getElementById("categoria-select");
if (selectCategoria) {
  selectCategoria.addEventListener("change", () => {
    renderizarProductos(selectCategoria.value);
  });
}
