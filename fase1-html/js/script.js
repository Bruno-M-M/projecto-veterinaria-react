document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContacto");
  if (!form) return; 

  const DOMINIOS_PERMITIDOS = [
    "duoc.cl",
    "profesor.duoc.cl",
    "gmail.com",
  ];

  const inputNombre = document.getElementById("nombre");
  const inputCorreo = document.getElementById("correo");
  const inputComentario = document.getElementById("comentario");
  const contadorComentario = document.getElementById("contadorComentario");
  const alertaExito = document.getElementById("alertaExitoContacto");

  const LIMITE_NOMBRE = 100;
  const LIMITE_CORREO = 100;
  const LIMITE_COMENTARIO = 500;

  function marcarInvalido(input, mensaje) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    const feedback = input.closest(".mb-3, .mb-4").querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = mensaje;
  }

  function marcarValido(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  function validarNombre() {
    const valor = inputNombre.value.trim();

    if (valor.length === 0) {
      marcarInvalido(inputNombre, "El nombre es obligatorio.");
      return false;
    }
    if (valor.length > LIMITE_NOMBRE) {
      marcarInvalido(inputNombre, `El nombre no puede superar los ${LIMITE_NOMBRE} caracteres.`);
      return false;
    }
    marcarValido(inputNombre);
    return true;
  }

  function obtenerDominio(correo) {
    const partes = correo.split("@");
    return partes.length === 2 ? partes[1].toLowerCase() : "";
  }

  function validarCorreo() {
    const valor = inputCorreo.value.trim();
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor.length === 0) {
      marcarInvalido(inputCorreo, "El correo es obligatorio.");
      return false;
    }
    if (valor.length > LIMITE_CORREO) {
      marcarInvalido(inputCorreo, `El correo no puede superar los ${LIMITE_CORREO} caracteres.`);
      return false;
    }
    if (!regexCorreo.test(valor)) {
      marcarInvalido(inputCorreo, "Ingresa un correo con un formato válido.");
      return false;
    }
    const dominio = obtenerDominio(valor);
    if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
      marcarInvalido(
        inputCorreo,
        `Dominio no permitido. Dominios válidos: ${DOMINIOS_PERMITIDOS.join(", ")}.`
      );
      return false;
    }
    marcarValido(inputCorreo);
    return true;
  }

  function validarComentario() {
    const valor = inputComentario.value.trim();

    if (valor.length === 0) {
      marcarInvalido(inputComentario, "El comentario es obligatorio.");
      return false;
    }
    if (valor.length > LIMITE_COMENTARIO) {
      marcarInvalido(inputComentario, `El comentario no puede superar los ${LIMITE_COMENTARIO} caracteres.`);
      return false;
    }
    marcarValido(inputComentario);
    return true;
  }

  if (inputComentario && contadorComentario) {
    inputComentario.addEventListener("input", function () {
      const restantes = LIMITE_COMENTARIO - inputComentario.value.length;
      contadorComentario.textContent = `${inputComentario.value.length} / ${LIMITE_COMENTARIO} caracteres`;
      contadorComentario.classList.toggle("text-danger", restantes < 0);
    });
  }

  inputNombre.addEventListener("blur", validarNombre);
  inputCorreo.addEventListener("blur", validarCorreo);
  inputComentario.addEventListener("blur", validarComentario);

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    evento.stopPropagation();

    const nombreOk = validarNombre();
    const correoOk = validarCorreo();
    const comentarioOk = validarComentario();

    if (nombreOk && correoOk && comentarioOk) {
      if (alertaExito) {
        alertaExito.classList.remove("d-none");
      }
      form.reset();
      form.classList.remove("was-validated");
      [inputNombre, inputCorreo, inputComentario].forEach((el) =>
        el.classList.remove("is-valid")
      );
      if (contadorComentario) {
        contadorComentario.textContent = `0 / ${LIMITE_COMENTARIO} caracteres`;
      }
    } else {
      if (alertaExito) alertaExito.classList.add("d-none");
      form.classList.add("was-validated");
    }
  });
});