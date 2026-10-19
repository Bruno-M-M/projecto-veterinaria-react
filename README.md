# Veterinaria San Marcos (React)

Migración del sitio web de la **Veterinaria San Marcos** (originalmente HTML, CSS y JavaScript) a una aplicación de una sola página con **React**. Proyecto de la asignatura *DSY1104 Desarrollo FullStack II* (Duoc UC).

**Equipo:** Alfonso Pizarro, Bruno Mateluna y Benjamín Martínez.

## Tecnologías

| Herramienta | Uso |
|---|---|
| React 19 + Vite | Interfaz y servidor de desarrollo |
| React Router DOM 7 | Rutas (`Routes`, `Route`, `Outlet`, `NavLink`, `useParams`, `useNavigate`) |
| React Bootstrap 2 / Bootstrap 5 | Componentes y estilos responsivos |
| Context API | Estado compartido (carrito y productos) |
| Vitest + Testing Library + user-event | Pruebas unitarias y de componentes (entorno simulado con jsdom) |
| @vitest/coverage-v8 | Informe de cobertura |
| Oxlint | Análisis estático del código |

## Cómo ejecutarlo

Requisitos: **Node.js 20.19 o superior** (o 22.12 o superior).

```bash
npm install        # instala las dependencias
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # versión de producción en /dist
npm run lint       # análisis del código
npm test           # pruebas en modo observador (se repiten al guardar)
npm run test:run   # pruebas, una sola ejecución
npm run test:coverage # pruebas + informe de cobertura
```

Al terminar `npm run test:coverage`, el informe en HTML queda en `coverage/index.html`. El umbral mínimo configurado (en `vite.config.js`) es **90 %** en sentencias, ramas, funciones y líneas: si baja de ahí, el comando falla.

## Estructura del proyecto

```
src/
├── components/     Piezas reutilizables: Header, Footer, Layout, ProductoCard
├── context/        Estado compartido: CarritoContext, ProductosContext
├── data/           Datos y listas: productosPorDefecto, categorias
├── pages/          Pantallas de la tienda: Home, Productos, DetalleProducto, Carrito, NoEncontrado
│   └── admin/      Pantallas del administrador: AdminProductos, NuevoProducto
├── utils/          Funciones puras: formatoPrecio, esStockCritico, validarProducto
├── App.jsx         Tabla de rutas
├── main.jsx        Punto de entrada (monta los Providers)
├── setupTests.js   Configuración común de las pruebas (jest-dom)
└── index.css       Estilos globales
```

Cada archivo de prueba (`*.test.js` / `*.test.jsx`) está junto al código que prueba.

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo con filtro por categoría |
| `/producto/:codigo` | Detalle de un producto, con cantidad y productos recomendados |
| `/carrito` | Carrito de compras |
| `/admin/productos` | Administrar productos: tabla, eliminar y aviso de stock crítico |
| `/admin/productos/nuevo` | Formulario para crear un producto |
| `*` | Página 404 |

## Funcionalidades de esta rama

- **Catálogo** con filtro por categoría y botón "Agregar" en cada producto.
- **Detalle de producto** con selector de cantidad y productos recomendados de la misma categoría.
- **Carrito**: sumar, restar, eliminar y vaciar; total, cantidad de productos y contador en el encabezado. Se conserva al recargar la página.
- **Administración de productos**: listar, **crear** (con validaciones) y **eliminar** (con confirmación). Los cambios se reflejan en el catálogo.
- **Menú responsivo** con botón de hamburguesa.
- **Página 404** para rutas inexistentes.

## Datos y almacenamiento

No hay servidor: todo se guarda en el `localStorage` del navegador.

| Clave | Contenido |
|---|---|
| `carrito` | Productos agregados al carrito |
| `productosGuardados` | Lista de productos (si no existe, se parte de `src/data/productosPorDefecto.js`) |

Para volver a los datos originales, ejecuta en la consola del navegador `localStorage.clear()` y recarga la página.

## Pruebas

`npm run test:run` ejecuta todas las pruebas con Vitest (React Testing Library para renderizar y `user-event` para simular clics y escritura). Se prueban:

- **Contextos:** carrito y productos (agregar, quitar, persistencia, uso fuera del Provider).
- **Validaciones:** `validarProducto` (código repetido, límites de largo, números, categoría).
- **Funciones puras:** `formatoPrecio`, `esStockCritico`, `nombreCategoria`.
- **Componentes:** página del carrito, administración de productos, formulario de nuevo producto y página 404.

Se usan *mocks* (`vi.spyOn`) para `localStorage`, `console.error` y `window.confirm`, y `MemoryRouter` para probar componentes que usan rutas.

## Convenciones del equipo

- Carpetas y archivos de utilidades en **minúscula**; los componentes de React, en `PascalCase` (`Header.jsx`).
- Mensajes de commit con *Conventional Commits* (`feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `chore:`).
- Cada integrante trabaja en su propia rama y se integra a `main` mediante *pull request*.

## Pendiente

Las páginas de Servicios, Nosotros, Blogs, Contacto, Inicio de sesión y Registro se desarrollan en otras ramas del equipo y se integrarán a `main`. Mientras tanto, esas rutas y la de `/checkout` muestran una pantalla "Página por migrar".
