# Veterinaria San Marcos (React)

Migración del sitio web de la **Veterinaria San Marcos** (originalmente HTML, CSS y JavaScript) a una aplicación de una sola página con **React**. Proyecto de la asignatura *DSY1104 Desarrollo FullStack II* (Duoc UC).

**Equipo:** Alfonso Pizarro, Bruno Mateluna y Benjamín Martínez.

## Tecnologías

| Herramienta | Uso |
|---|---|
| React 19 + Vite | Interfaz y servidor de desarrollo |
| React Router DOM 7 | Rutas (`Routes`, `Route`, `Outlet`, `NavLink`, `Navigate`, `useParams`, `useNavigate`) |
| React Bootstrap 2 / Bootstrap 5 | Componentes y estilos responsivos |
| Context API | Estado compartido (carrito y productos) |
| Vitest + Testing Library + user-event | Pruebas unitarias y de componentes (entorno simulado con jsdom) |
| @vitest/coverage-v8 | Informe de cobertura |
| Oxlint | Análisis estático del código |

## Cómo ejecutarlo

Requisitos: **Node.js 20.19 o superior** (o 22.12 o superior).

```bash
npm install            # instala las dependencias
npm run dev            # servidor de desarrollo en http://localhost:5173
npm run build          # versión de producción en /dist
npm run lint           # análisis del código
npm test               # pruebas en modo observador (se repiten al guardar)
npm run test:run       # pruebas, una sola ejecución
npm run test:coverage  # pruebas + informe de cobertura
```

Al terminar `npm run test:coverage`, el informe en HTML queda en `coverage/index.html`. El umbral mínimo configurado (en `vite.config.js`) es **90 %** en sentencias, ramas, funciones y líneas: si baja de ahí, el comando falla.

## Estructura del proyecto

```
src/
├── components/        Piezas reutilizables
│   ├── admin/         Menú lateral del panel (Adminlayout) y lista de comentarios
│   └── ...            Header, Footer, Layout, ProductoCard, RutaAdmin,
│                      Formulario-registro, FormularioComentario
├── context/           Estado compartido: CarritoContext, ProductosContext
├── data/              Datos y listas: productosPorDefecto, categorias, BlogsData, regiones-data
├── pages/             Pantallas de la tienda: Home, Productos, DetalleProducto, Carrito,
│   │                  Nosotros, Blogs, BlogDetalle, Contacto, Login, Registro, NoEncontrado, Pendiente
│   └── admin/         Panel del administrador: AdminDashboard, AdminComentarios,
│                      AdminProductos, NuevoProducto, Usuarios
├── utils/             Funciones puras: formatoPrecio, esStockCritico, validarProducto, registro
├── App.jsx            Tabla de rutas
├── main.jsx           Punto de entrada (monta los Providers)
├── setupTests.js      Configuración común de las pruebas (jest-dom)
└── index.css          Estilos globales
```

Cada archivo de prueba (`*.test.js` / `*.test.jsx`) está junto al código que prueba.

## Rutas

### Tienda (con encabezado y pie de página)

| Ruta | Pantalla |
|---|---|
| `/` | Inicio, con información de la tienda y formulario de comentarios |
| `/productos` | Catálogo con filtro por categoría |
| `/producto/:codigo` | Detalle de un producto, con cantidad y productos recomendados |
| `/carrito` | Carrito de compras |
| `/nosotros` | Información de la veterinaria y del equipo |
| `/blogs` y `/blogs/:id` | Listado de blogs y detalle de cada uno |
| `/contacto` | Información de contacto y formulario validado |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuario (RUN, región y comuna, confirmación de correo y contraseña) |
| `/servicios` y `/checkout` | Pantalla "Página por migrar" |
| `*` | Página 404 |

### Panel de administración (protegido por `RutaAdmin`)

Si no hay sesión de administrador, se redirige a `/login`.

| Ruta | Pantalla |
|---|---|
| `/admin` | Panel con resumen, accesos rápidos y cierre de sesión |
| `/admin/comentarios` | Comentarios recibidos desde el inicio, con eliminación |
| `/admin/productos` | Tabla de productos, aviso de stock crítico y eliminación con confirmación |
| `/admin/productos/nuevo` | Formulario para crear un producto, con validaciones |
| `/admin/usuarios` | Administración de usuarios: buscar, crear, editar, activar o desactivar y eliminar |

## Funcionalidades

- **Catálogo** con filtro por categoría y botón "Agregar" en cada producto.
- **Detalle de producto** con selector de cantidad y productos recomendados de la misma categoría.
- **Carrito**: sumar, restar, eliminar y vaciar; total, cantidad de productos y contador en el encabezado. Se conserva al recargar la página.
- **Administración de productos**: listar, **crear** (con validaciones) y **eliminar** (con confirmación). Los cambios se reflejan en el catálogo.
- **Administración de usuarios** con validación de RUN (módulo 11) y de dominios de correo.
- **Registro** con regiones y comunas dependientes, y validación de campos.
- **Comentarios**: formulario en el inicio y administración de los comentarios en el panel.
- **Inicio de sesión** con cuentas de prueba (se muestran en la propia pantalla de login) y protección del panel.
- **Menú responsivo** con botón de hamburguesa y **página 404** para rutas inexistentes.

## Datos y almacenamiento

No hay servidor: todo se guarda en el `localStorage` del navegador.

| Clave | Contenido |
|---|---|
| `carrito` | Productos agregados al carrito |
| `productosGuardados` | Lista de productos (si no existe, se parte de `src/data/productosPorDefecto.js`) |
| `comentarios_san_marcos` | Comentarios enviados desde el inicio |
| `esAdmin` y `usuario` | Sesión simulada del usuario que inició sesión |

Para volver a los datos originales, ejecuta en la consola del navegador `localStorage.clear()` y recarga la página. Esto no es seguridad real: cualquier persona puede ver y modificar el `localStorage`.

## Pruebas

`npm run test:run` ejecuta todas las pruebas con Vitest (React Testing Library para renderizar y `user-event` para simular clics y escritura). Se prueban:

- **Contextos:** carrito y productos (agregar, quitar, persistencia, uso fuera del Provider).
- **Validaciones y funciones puras:** `validarProducto`, `formatoPrecio`, `esStockCritico` y `nombreCategoria`.
- **Componentes y páginas:** `ProductoCard`, carrito, administración y creación de productos, administración de usuarios, comentarios, formulario de registro, registro, login, inicio, `RutaAdmin` y página 404.

Se usan *mocks* (`vi.spyOn`, `vi.fn`, relojes falsos) para `localStorage`, `console.error`, `window.confirm` y el temporizador, y `MemoryRouter` para probar componentes que usan rutas.

La cobertura se calcula sobre los archivos que alguna prueba importa; los archivos sin pruebas (por ejemplo `Header`, `Footer`, `DetalleProducto`, `Productos`, `Contacto`, `Nosotros` y `Blogs`) no entran en el porcentaje. El detalle está en el documento de cobertura de testing.

## Convenciones del equipo

- Carpetas y archivos de utilidades en **minúscula**; los componentes de React, en `PascalCase` (`Header.jsx`).
- Mensajes de commit con *Conventional Commits* (`feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `chore:`).
- Cada integrante trabaja en su propia rama y se integra a `main` mediante *pull request*.

## Pendiente

- Páginas de **Servicios** y **Checkout** (hoy muestran "Página por migrar"), con el flujo de compra, boleta y vistas de pago exitoso o con error.
- Edición de productos, búsqueda por texto y precios de oferta.
- Backend y autenticación reales (la sesión y los datos son locales al navegador).
