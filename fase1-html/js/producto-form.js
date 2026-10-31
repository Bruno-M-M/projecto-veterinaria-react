
function obtenerCodigoDesdeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("codigo");
}

function mostrarError(idCampo, mensaje) {
  document.getElementById(`error-${idCampo}`).textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll(".campo-error").forEach((el) => {
    el.textContent = "";
  });
}

function validarFormulario(datos, esEdicion) {
  limpiarErrores();
  let esValido = true;

  if (datos.codigo.length < 3) {
    mostrarError("codigo", "El código es requerido y debe tener al menos 3 caracteres.");
    esValido = false;
  } else if (!esEdicion && productos.some((p) => p.codigo === datos.codigo)) {
    mostrarError("codigo", "Ya existe un producto con ese código.");
    esValido = false;
  }

  if (datos.nombre.length === 0) {
    mostrarError("nombre", "El nombre es requerido.");
    esValido = false;
  } else if (datos.nombre.length > 100) {
    mostrarError("nombre", "El nombre no puede superar los 100 caracteres.");
    esValido = false;
  }

  if (datos.descripcion.length > 500) {
    mostrarError("descripcion", "La descripción no puede superar los 500 caracteres.");
    esValido = false;
  }

  if (datos.precio === "" || Number.isNaN(datos.precio)) {
    mostrarError("precio", "El precio es requerido.");
    esValido = false;
  } else if (datos.precio < 0) {
    mostrarError("precio", "El precio no puede ser negativo (0 se considera producto gratis).");
    esValido = false;
  }

  if (datos.stock === "" || Number.isNaN(datos.stock)) {
    mostrarError("stock", "El stock es requerido.");
    esValido = false;
  } else if (!Number.isInteger(datos.stock) || datos.stock < 0) {
    mostrarError("stock", "El stock debe ser un número entero mayor o igual a 0.");
    esValido = false;
  }

  if (datos.stockCritico !== "" && !Number.isNaN(datos.stockCritico)) {
    if (!Number.isInteger(datos.stockCritico) || datos.stockCritico < 0) {
      mostrarError("stock-critico", "El stock crítico debe ser un número entero mayor o igual a 0.");
      esValido = false;
    }
  }

  if (datos.categoria === "") {
    mostrarError("categoria", "Debe seleccionar una categoría.");
    esValido = false;
  }

  return esValido;
}

function precargarFormulario(producto) {
  document.getElementById("form-titulo").textContent = "Editar Producto";
  document.getElementById("btn-guardar").textContent = "Guardar cambios";

  document.getElementById("campo-codigo").value = producto.codigo;
  document.getElementById("campo-codigo").disabled = true;
  document.getElementById("campo-nombre").value = producto.nombre;
  document.getElementById("campo-descripcion").value = producto.descripcion || "";
  document.getElementById("campo-precio").value = producto.precio;
  document.getElementById("campo-stock").value = producto.stock;
  document.getElementById("campo-stock-critico").value = producto.stockCritico ?? "";
  document.getElementById("campo-categoria").value = producto.categoria;
}

function iniciarFormulario() {
  const codigo = obtenerCodigoDesdeUrl();

  if (codigo) {
    const producto = productos.find((p) => p.codigo === codigo);
    if (producto) {
      precargarFormulario(producto);
    }
  }

  document.getElementById("form-producto").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const datos = {
      codigo: document.getElementById("campo-codigo").value.trim(),
      nombre: document.getElementById("campo-nombre").value.trim(),
      descripcion: document.getElementById("campo-descripcion").value.trim(),
      precio: parseFloat(document.getElementById("campo-precio").value),
      stock: parseInt(document.getElementById("campo-stock").value, 10),
      stockCritico: document.getElementById("campo-stock-critico").value === ""
        ? ""
        : parseInt(document.getElementById("campo-stock-critico").value, 10),
      categoria: document.getElementById("campo-categoria").value,
    };

    const mensaje = document.getElementById("form-mensaje");
    const esEdicion = Boolean(codigo);

    if (!validarFormulario(datos, esEdicion)) {
      mensaje.textContent = "Revisa los campos marcados en rojo.";
      mensaje.className = "form-mensaje form-mensaje-error";
      mensaje.hidden = false;
      return;
    }

    const stockCriticoFinal = datos.stockCritico === "" ? undefined : datos.stockCritico;

    if (esEdicion) {
      const producto = productos.find((p) => p.codigo === codigo);
      producto.nombre = datos.nombre;
      producto.descripcion = datos.descripcion;
      producto.precio = datos.precio;
      producto.stock = datos.stock;
      producto.stockCritico = stockCriticoFinal;
      producto.categoria = datos.categoria;
    } else {
      productos.push({
        codigo: datos.codigo,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        precio: datos.precio,
        stock: datos.stock,
        stockCritico: stockCriticoFinal,
        categoria: datos.categoria,
      });
    }

    guardarProductosEnStorage();

    mensaje.textContent = esEdicion
      ? "Cambios guardados correctamente."
      : "Producto creado correctamente.";
    mensaje.className = "form-mensaje form-mensaje-exito";
    mensaje.hidden = false;
  });
}

iniciarFormulario();
