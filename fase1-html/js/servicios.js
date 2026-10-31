
function crearTarjetaServicio(servicio) {
  const article = document.createElement("article");
  article.className = servicio.categoria;

  const h3 = document.createElement("h3");
  h3.textContent = servicio.nombre;

  const info = document.createElement("p");
  info.textContent = `${servicio.especie} — ${servicio.duracion} min`;

  const precio = document.createElement("p");
  precio.className = "precio";
  precio.textContent = `$${servicio.precio}`;

  const boton = document.createElement("button");
  boton.className = "btn btn-outline-success boton-agendar";
  boton.dataset.servicio = servicio.codigo;
  boton.textContent = "Agendar";

  article.append(h3, info);

  if (servicio.observaciones) {
    const observaciones = document.createElement("p");
    observaciones.className = "observaciones";
    observaciones.textContent = servicio.observaciones;
    article.appendChild(observaciones);
  }

  article.append(precio, boton);
  return article;
}

function renderizarServicios(categoria) {
  const contenedor = document.querySelector(".servicios");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const serviciosAMostrar = !categoria
    ? servicios
    : servicios.filter((servicio) => servicio.categoria === categoria);

  serviciosAMostrar.forEach((servicio) => {
    contenedor.appendChild(crearTarjetaServicio(servicio));
  });
}

const citasAgendadas = JSON.parse(localStorage.getItem("citasAgendadas")) || [];

function guardarCitas() {
  localStorage.setItem("citasAgendadas", JSON.stringify(citasAgendadas));
}

let servicioSeleccionado = null;
let botonSeleccionado = null;

function limpiarErroresCita() {
  document.querySelectorAll("#form-cita .campo-error").forEach((el) => {
    el.textContent = "";
  });
  const mensaje = document.getElementById("modal-mensaje");
  mensaje.hidden = true;
}

function mostrarErrorCita(idCampo, mensaje) {
  document.getElementById(`error-${idCampo}`).textContent = mensaje;
}

function abrirModalCita(boton) {
  const codigo = boton.dataset.servicio;
  const servicio = servicios.find((s) => s.codigo === codigo);
  if (!servicio) return;

  servicioSeleccionado = servicio;
  botonSeleccionado = boton;

  document.getElementById("modal-titulo").textContent = `Agendar: ${servicio.nombre}`;
  document.getElementById("form-cita").reset();
  limpiarErroresCita();

  const especieWrap = document.getElementById("campo-especie-wrap");
  especieWrap.hidden = servicio.especie !== "Todas";

  document.getElementById("modal-cita").hidden = false;
}

function cerrarModalCita() {
  document.getElementById("modal-cita").hidden = true;
  servicioSeleccionado = null;
  botonSeleccionado = null;
}

function validarFormularioCita(datos) {
  let esValido = true;

  if (datos.nombreDueno.length === 0) {
    mostrarErrorCita("nombre-dueno", "El nombre es requerido.");
    esValido = false;
  } else if (datos.nombreDueno.length > 100) {
    mostrarErrorCita("nombre-dueno", "El nombre no puede superar los 100 caracteres.");
    esValido = false;
  }

  const esCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.contacto);
  const esTelefono = /^[0-9+\-\s]{7,15}$/.test(datos.contacto);
  if (datos.contacto.length === 0) {
    mostrarErrorCita("contacto", "El correo o teléfono es requerido.");
    esValido = false;
  } else if (!esCorreo && !esTelefono) {
    mostrarErrorCita("contacto", "Ingresa un correo o teléfono válido.");
    esValido = false;
  }

  if (datos.mascota.length === 0) {
    mostrarErrorCita("mascota", "El nombre de la mascota es requerido.");
    esValido = false;
  }

  if (datos.requiereEspecie && datos.especie.length === 0) {
    mostrarErrorCita("especie", "Indica la especie de tu mascota.");
    esValido = false;
  }

  if (datos.fecha.length === 0) {
    mostrarErrorCita("fecha", "Selecciona una fecha.");
    esValido = false;
  } else {
    const hoy = new Date().toISOString().split("T")[0];
    if (datos.fecha < hoy) {
      mostrarErrorCita("fecha", "La fecha no puede ser anterior a hoy.");
      esValido = false;
    }
  }

  if (datos.hora.length === 0) {
    mostrarErrorCita("hora", "Selecciona una hora.");
    esValido = false;
  }

  return esValido;
}

function mostrarConfirmacionBoton(boton) {
  const textoOriginal = boton.textContent;
  boton.textContent = "Agendado";
  boton.disabled = true;

  setTimeout(() => {
    boton.textContent = textoOriginal;
    boton.disabled = false;
  }, 1200);
}

function confirmarCita(evento) {
  evento.preventDefault();
  if (!servicioSeleccionado) return;

  limpiarErroresCita();

  const requiereEspecie = servicioSeleccionado.especie === "Todas";

  const datos = {
    nombreDueno: document.getElementById("campo-nombre-dueno").value.trim(),
    contacto: document.getElementById("campo-contacto").value.trim(),
    mascota: document.getElementById("campo-mascota").value.trim(),
    especie: requiereEspecie
      ? document.getElementById("campo-especie").value.trim()
      : servicioSeleccionado.especie,
    requiereEspecie,
    fecha: document.getElementById("campo-fecha").value,
    hora: document.getElementById("campo-hora").value,
    observaciones: document.getElementById("campo-observaciones").value.trim(),
  };

  if (!validarFormularioCita(datos)) {
    const mensaje = document.getElementById("modal-mensaje");
    mensaje.textContent = "Revisa los campos marcados en rojo.";
    mensaje.className = "form-mensaje form-mensaje-error";
    mensaje.hidden = false;
    return;
  }

  citasAgendadas.push({
    servicio: servicioSeleccionado.codigo,
    nombreServicio: servicioSeleccionado.nombre,
    precio: servicioSeleccionado.precio,
    nombreDueno: datos.nombreDueno,
    contacto: datos.contacto,
    mascota: datos.mascota,
    especie: datos.especie,
    fecha: datos.fecha,
    hora: datos.hora,
    observaciones: datos.observaciones,
  });
  guardarCitas();

  if (botonSeleccionado) {
    mostrarConfirmacionBoton(botonSeleccionado);
  }

  cerrarModalCita();
}

renderizarServicios();

document.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".boton-agendar");
  if (boton) {
    abrirModalCita(boton);
    return;
  }

  if (evento.target.id === "modal-cerrar" || evento.target.id === "modal-cita") {
    cerrarModalCita();
  }
});

const formCita = document.getElementById("form-cita");
if (formCita) {
  formCita.addEventListener("submit", confirmarCita);
}

const selectCita = document.getElementById("select-cita");
if (selectCita) {
  selectCita.addEventListener("change", () => {
    renderizarServicios(selectCita.value);
  });
}
