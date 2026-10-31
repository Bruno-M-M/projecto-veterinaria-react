
const NOMBRE_CATEGORIA = {
  antibioticos: "Antibióticos",
  antiparasitarios: "Antiparasitarios",
  antiinflamatorios: "Antiinflamatorios",
  dermatologia: "Dermatología",
  digestivo: "Digestivo",
  cardiaco: "Cardíaco",
  analgesicos: "Analgésicos",
  vacunas: "Vacunas",
  suplementos: "Suplementos",
};

function obtenerCodigoDesdeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("codigo");
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

let cantidadSeleccionada = 1;

function actualizarCantidadEnPantalla() {
  document.getElementById("cantidad-valor").textContent = cantidadSeleccionada;
}

function agregarAlCarritoConCantidad(producto) {
  const carrito = obtenerCarrito();
  const item = carrito.find((p) => p.producto === producto.codigo);

  if (item) {
    item.cantidad += cantidadSeleccionada;
  } else {
    carrito.push({
      producto: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidadSeleccionada,
    });
  }

  guardarCarrito(carrito);
  mostrarConfirmacion();
}

function mostrarConfirmacion() {
  const boton = document.getElementById("btn-agregar-detalle");
  const textoOriginal = boton.textContent;
  boton.textContent = "Agregado";
  boton.disabled = true;

  setTimeout(() => {
    boton.textContent = textoOriginal;
    boton.disabled = false;
  }, 1200);
}

function mostrarDetalle(producto) {
  document.title = `${producto.nombre} - Veterinaria San Marcos`;

  document.getElementById("detalle-categoria").textContent =
    NOMBRE_CATEGORIA[producto.categoria] || producto.categoria;
  document.getElementById("detalle-nombre").textContent = producto.nombre;
  document.getElementById("detalle-descripcion").textContent = producto.descripcion;
  document.getElementById("detalle-precio").textContent = `$${producto.precio}`;

  const contenedor = document.getElementById("detalle-contenido");
  contenedor.style.setProperty("--color-servicio", `var(--color-${producto.categoria})`);
  contenedor.hidden = false;

  document.getElementById("btn-restar").addEventListener("click", () => {
    if (cantidadSeleccionada > 1) {
      cantidadSeleccionada--;
      actualizarCantidadEnPantalla();
    }
  });

  document.getElementById("btn-sumar").addEventListener("click", () => {
    cantidadSeleccionada++;
    actualizarCantidadEnPantalla();
  });

  document.getElementById("btn-agregar-detalle").addEventListener("click", () => {
    agregarAlCarritoConCantidad(producto);
  });

  mostrarRecomendados(producto);
}

function crearTarjetaRecomendada(producto) {
  const tarjeta = document.createElement("a");
  tarjeta.className = `recomendado-item ${producto.categoria}`;
  tarjeta.href = `detalle-producto.html?codigo=${producto.codigo}`;

  const nombre = document.createElement("span");
  nombre.className = "recomendado-nombre";
  nombre.textContent = producto.nombre;

  const precio = document.createElement("span");
  precio.className = "recomendado-precio";
  precio.textContent = `$${producto.precio}`;

  tarjeta.append(nombre, precio);
  return tarjeta;
}

function mostrarRecomendados(producto) {
  const recomendados = productos
    .filter((p) => p.categoria === producto.categoria && p.codigo !== producto.codigo)
    .slice(0, 3);

  if (recomendados.length === 0) {
    return;
  }

  const grid = document.getElementById("recomendados-grid");
  recomendados.forEach((item) => {
    grid.appendChild(crearTarjetaRecomendada(item));
  });

  document.getElementById("recomendados").hidden = false;
}

function mostrarMensajeNoEncontrado(mensaje) {
  document.getElementById("mensaje-no-encontrado").textContent = mensaje;
  document.getElementById("detalle-no-encontrado").hidden = false;
}

function iniciar() {
  const codigo = obtenerCodigoDesdeUrl();

  if (!codigo) {
    mostrarMensajeNoEncontrado("No hay ningún producto seleccionado. Vuelve al catálogo y elige uno para ver su detalle.");
    return;
  }

  const producto = productos.find((p) => p.codigo === codigo);

  if (!producto) {
    mostrarMensajeNoEncontrado("No encontramos el producto que buscabas. Puede que el enlace esté roto o incompleto.");
    return;
  }

  mostrarDetalle(producto);
}

iniciar();
