

const formulario = document.getElementById("formulario-registro");
const nombreRegistro = document.getElementById("nombreRegistro");
const runRegistro = document.getElementById("runRegistro");
const correoRegistro = document.getElementById("correoRegistro");
const correoConfirmar = document.getElementById("correoConfirmar");
const regionRegistro = document.getElementById("regionRegistro");
const comunaRegistro = document.getElementById("comunaRegistro");
const tipoUsuarioRegistro = document.getElementById("tipoUsuario");
const passwordRegistro = document.getElementById("password");
const passwordConfirmar = document.getElementById("passwordConfirmar");
const mensajeResultado = document.getElementById("mensaje-resultado");


function cargarRegiones() {
    regionesYComunas.forEach(item => {
        const option = document.createElement("option");
        option.value = item.region;
        option.textContent = item.region;
        regionRegistro.appendChild(option);
    });
}

cargarRegiones();


regionRegistro.addEventListener("change", function() {
    const regionSeleccionada = this.value;
    const objetoRegion = regionesYComunas.find(item => item.region === regionSeleccionada);

    comunaRegistro.innerHTML = '<option value="" disabled selected>Seleccione una comuna</option>';

    if (objetoRegion) {
        comunaRegistro.disabled = false;
        objetoRegion.comunas.forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            comunaRegistro.appendChild(option);
        });
    } else {
        comunaRegistro.disabled = true;
    }
});


function validarRUN(run) {
    const regExp = /^[0-9]{7,8}[0-9kK]$/;
    if (!regExp.test(run)) return false;

    const cuerpo = run.slice(0, -1);
    let dv = run.slice(-1).toUpperCase();

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    let dvEsperado = 11 - resto;

    if (dvEsperado === 11) {
        dvEsperado = "0";
    } else if (dvEsperado === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = dvEsperado.toString();
    }

    return dv === dvEsperado;
}

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    const nombre = nombreRegistro.value.trim();
    const run = runRegistro.value.trim();
    const correoReg = correoRegistro.value.trim();
    const correoConf = correoConfirmar.value.trim();
    const region = regionRegistro ? regionRegistro.value : "";
    const comuna = comunaRegistro ? comunaRegistro.value : "";
    const tipoUsuario = tipoUsuarioRegistro ? tipoUsuarioRegistro.value : "";
    const pwdReg = passwordRegistro.value.trim();
    const pwdConf = passwordConfirmar.value.trim();

    if (
        nombre === "" || run === "" || correoReg === "" || correoConf === "" ||
        region === "" || comuna === "" || tipoUsuario === "" || pwdReg === "" || pwdConf === ""
    ) {
        mensajeResultado.textContent = "Debe completar todos los campos.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (!validarRUN(run)) {
        mensajeResultado.textContent = "El RUN ingresado no es válido. Ingréselo sin puntos ni guión (ej: 12345678K).";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (usuariosData.some((u) => u.run === run)) {
        mensajeResultado.textContent = "Ya existe un usuario registrado con ese RUN.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    const objetoRegion = regionesYComunas.find(item => item.region === region);
    if (!objetoRegion || !objetoRegion.comunas.includes(comuna)) {
        mensajeResultado.textContent = "Debe seleccionar una región y comuna válidas.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    const tiposValidos = ["Administrador", "Cliente", "Vendedor"];
    if (!tiposValidos.includes(tipoUsuario)) {
        mensajeResultado.textContent = "Debe seleccionar un tipo de usuario válido.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (nombre.length > 100){
        mensajeResultado.textContent = "El nombre debe contener menos de 100 caracteres.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetrasYEspacios.test(nombre)) {
        mensajeResultado.textContent = "El nombre solo debe contener caracteres alfabéticos y espacios.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (correoReg.length > 100){
        mensajeResultado.textContent = "El correo electrónico debe contener un máximo de 100 caracteres.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const esDominioValido = dominiosPermitidos.some(dominio => correoReg.toLowerCase().endsWith(dominio));

    if (!esDominioValido) {
        mensajeResultado.textContent = "El correo debe pertenecer a uno de los dominios permitidos: @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (correoReg !== correoConf) {
        mensajeResultado.textContent = "Los correos electrónicos no coinciden.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (pwdReg.length < 4 || pwdReg.length > 10){
        mensajeResultado.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (pwdReg !== pwdConf) {
        mensajeResultado.textContent = "Las contraseñas no coinciden.";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    usuariosData.push({
        nombre: nombre,
        run: run,
        correo: correoReg,
        region: region,
        comuna: comuna,
        tipoUsuario: tipoUsuario
    });
    guardarUsuariosEnStorage();

    mensajeResultado.textContent = "¡Usuario creado correctamente!";
    mensajeResultado.className = "alert alert-success mt-4";
    formulario.reset();
    comunaRegistro.disabled = true;
});
