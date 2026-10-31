
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* aca se contruye el resumen del carrito */

function crearFilaCarrito(item, indice) {
  const fila = document.createElement("tr");

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = item.nombre;

  const celdaPrecio = document.createElement("td");
  celdaPrecio.textContent = `$${item.precio}`;

  const celdaCantidad = document.createElement("td");
  const controlCantidad = document.createElement("div");
  controlCantidad.className = "cantidad-control";

  const btnMenos = document.createElement("button");
  btnMenos.className = "btn btn-sm btn-outline-secondary";
  btnMenos.type = "button";
  btnMenos.textContent = "-";
  btnMenos.dataset.accion = "restar";
  btnMenos.dataset.indice = indice;

  const spanCantidad = document.createElement("span");
  spanCantidad.className = "carrito-cantidad";
  spanCantidad.textContent = item.cantidad;

  const btnMas = document.createElement("button");
  btnMas.className = "btn btn-sm btn-outline-secondary";
  btnMas.type = "button";
  btnMas.textContent = "+";
  btnMas.dataset.accion = "sumar";
  btnMas.dataset.indice = indice;

  controlCantidad.append(btnMenos, spanCantidad, btnMas);
  celdaCantidad.appendChild(controlCantidad);

  const celdaSubtotal = document.createElement("td");
  celdaSubtotal.textContent = `$${item.precio * item.cantidad}`;

  const celdaQuitar = document.createElement("td");
  const btnQuitar = document.createElement("button");
  btnQuitar.className = "btn btn-sm btn-outline-danger";
  btnQuitar.type = "button";
  btnQuitar.textContent = "Quitar";
  btnQuitar.dataset.accion = "quitar";
  btnQuitar.dataset.indice = indice;
  celdaQuitar.appendChild(btnQuitar);

  fila.append(celdaNombre, celdaPrecio, celdaCantidad, celdaSubtotal, celdaQuitar);
  return fila;
}

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const tbody = document.getElementById("carrito-items");
  const mensajeVacio = document.getElementById("carrito-vacio");
  const totalSpan = document.getElementById("carrito-total");
  const btnPagar = document.getElementById("btn-pagar");

  tbody.innerHTML = "";

  if (carrito.length === 0) {
    mensajeVacio.hidden = false;
    btnPagar.disabled = true;
  } else {
    mensajeVacio.hidden = true;
    btnPagar.disabled = false;
    carrito.forEach((item, indice) => {
      tbody.appendChild(crearFilaCarrito(item, indice));
    });
  }

  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  totalSpan.textContent = `$${total}`;
}

document.getElementById("carrito-items").addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const carrito = obtenerCarrito();
  const indice = Number(boton.dataset.indice);
  const accion = boton.dataset.accion;

  if (accion === "sumar") {
    carrito[indice].cantidad++;
  } else if (accion === "restar") {
    carrito[indice].cantidad--;
    if (carrito[indice].cantidad <= 0) {
      carrito.splice(indice, 1);
    }
  } else if (accion === "quitar") {
    carrito.splice(indice, 1);
  }

  guardarCarrito(carrito);
  renderizarCarrito();
});

document.getElementById("btn-vaciar").addEventListener("click", () => {
  guardarCarrito([]);
  renderizarCarrito();
});

document.getElementById("btn-pagar").addEventListener("click", () => {
  alert("¡Gracias por tu compra! Te contactaremos para confirmar el despacho de tu pedido.");
  guardarCarrito([]);
  renderizarCarrito();
});

renderizarCarrito();
