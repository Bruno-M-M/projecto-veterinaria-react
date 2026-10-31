
const tbody = document.getElementById('admin-usuarios-items');
const searchInput = document.getElementById('buscar-usuario');

const modalEditar = document.getElementById('modalEditar');
const formEditar = document.getElementById('formEditarUsuario');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const btnCancelarEditar = document.getElementById('btnCancelarEditar');

const editIndexInput = document.getElementById('editUserIndex');
const editNombreInput = document.getElementById('editNombre');
const editRunInput = document.getElementById('editRun');
const editCorreoInput = document.getElementById('editCorreo');
const editRegionSelect = document.getElementById('editRegion');
const editComunaSelect = document.getElementById('editComuna');
const editTipoSelect = document.getElementById('editTipo');

function renderTable(data) {
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px; color: #6b7280;">No se encontraron usuarios.</td></tr>';
    return;
  }

  data.forEach((user) => {
    const realIndex = usuariosData.indexOf(user);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight: 500;">${user.nombre}</td>
      <td>${user.run}</td>
      <td>${user.correo}</td>
      <td>${user.region}</td>
      <td>${user.comuna}</td>
      <td>${user.tipoUsuario}</td>
      <td>
        <button class="btn-action-edit" onclick="abrirModalEditar(${realIndex})">Editar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function cargarRegionesEdit() {
  editRegionSelect.innerHTML = '';
  regionesYComunas.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.region;
    opt.textContent = item.region;
    editRegionSelect.appendChild(opt);
  });
}

function cargarComunasEdit(regionNombre, comunaSeleccionada = '') {
  editComunaSelect.innerHTML = '';
  const regionObj = regionesYComunas.find(r => r.region === regionNombre);
  if (regionObj) {
    regionObj.comunas.forEach(comuna => {
      const opt = document.createElement('option');
      opt.value = comuna;
      opt.textContent = comuna;
      if (comuna === comunaSeleccionada) opt.selected = true;
      editComunaSelect.appendChild(opt);
    });
  }
}

editRegionSelect.addEventListener('change', (e) => {
  cargarComunasEdit(e.target.value);
});

window.abrirModalEditar = function(index) {
  const user = usuariosData[index];
  if (!user) return;

  editIndexInput.value = index;
  editNombreInput.value = user.nombre;
  editRunInput.value = user.run;
  editCorreoInput.value = user.correo;
  editTipoSelect.value = user.tipoUsuario;

  cargarRegionesEdit();
  editRegionSelect.value = user.region;
  cargarComunasEdit(user.region, user.comuna);

  modalEditar.classList.add('active');
};

function cerrarModal() {
  modalEditar.classList.remove('active');
}

btnCerrarModal.addEventListener('click', cerrarModal);
btnCancelarEditar.addEventListener('click', cerrarModal);

formEditar.addEventListener('submit', (e) => {
  e.preventDefault();
  const index = parseInt(editIndexInput.value, 10);

  if (!isNaN(index) && usuariosData[index]) {
    usuariosData[index] = {
      nombre: editNombreInput.value.trim(),
      run: editRunInput.value.trim(),
      correo: editCorreoInput.value.trim(),
      region: editRegionSelect.value,
      comuna: editComunaSelect.value,
      tipoUsuario: editTipoSelect.value
    };

    guardarUsuariosEnStorage();
    renderTable(usuariosData);
    cerrarModal();
  }
});

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = usuariosData.filter(u =>
      u.nombre.toLowerCase().includes(query) ||
      u.run.toLowerCase().includes(query) ||
      u.correo.toLowerCase().includes(query) ||
      u.region.toLowerCase().includes(query) ||
      u.comuna.toLowerCase().includes(query) ||
      u.tipoUsuario.toLowerCase().includes(query)
    );
    renderTable(filtered);
  });
}

renderTable(usuariosData);
