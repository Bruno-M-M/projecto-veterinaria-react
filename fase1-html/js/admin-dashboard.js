(function () {
  function leerProductos() {
    return (typeof productos !== 'undefined' && Array.isArray(productos)) ? productos : null;
  }

  function leerUsuarios() {
    return (typeof usuariosData !== 'undefined' && Array.isArray(usuariosData)) ? usuariosData : null;
  }

  function esStockBajo(producto) {
    const stock = Number(producto.stock);
    const critico = Number(producto.stockCritico);
    if (Number.isNaN(stock)) return false;
    if (!Number.isNaN(critico) && critico > 0) return stock <= critico;
    return stock <= 5; // valor por defecto si el producto no define stock crítico
  }

  function pintarNumero(id, valor) {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  }

  function render() {
    const productos = leerProductos();
    const usuarios = leerUsuarios();

    pintarNumero('stat-productos', productos ? productos.length : '—');
    pintarNumero('stat-usuarios', usuarios ? usuarios.length : '—');

    const bajos = productos ? productos.filter(esStockBajo) : [];
    pintarNumero('stat-stock-bajo', productos ? bajos.length : '—');

    const porTipo = { Administrador: 0, Cliente: 0, Vendedor: 0 };
    if (usuarios) {
      usuarios.forEach(function (u) {
        const tipo = u.tipo || u.tipoUsuario;
        if (tipo && Object.prototype.hasOwnProperty.call(porTipo, tipo)) {
          porTipo[tipo]++;
        }
      });
    }
    pintarNumero('stat-admins', usuarios ? porTipo.Administrador : '—');
    pintarNumero('stat-clientes', usuarios ? porTipo.Cliente : '—');
    pintarNumero('stat-vendedores', usuarios ? porTipo.Vendedor : '—');
    pintarNumero('stat-vendedores-2', usuarios ? porTipo.Vendedor : '—');

    const lista = document.getElementById('lista-stock-bajo');
    if (lista) {
      lista.innerHTML = '';
      if (!productos) {
        lista.innerHTML = '<li class="list-group-item text-muted">No se pudo leer el inventario.</li>';
      } else if (bajos.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-muted">Sin alertas de stock por el momento.</li>';
      } else {
        bajos.slice(0, 5).forEach(function (p) {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML =
            (p.nombre || 'Producto sin nombre') +
            ' <span class="stock-alerta">Stock: ' + p.stock + '</span>';
          lista.appendChild(li);
        });
      }
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();
