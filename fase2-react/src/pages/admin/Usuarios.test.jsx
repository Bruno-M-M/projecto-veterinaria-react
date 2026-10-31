import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsuariosAdmin from './Usuarios';

describe('UsuariosAdmin Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza la tabla con los usuarios iniciales de ejemplo', () => {
    render(<UsuariosAdmin />);

    expect(screen.getByRole('heading', { name: /gestión de usuarios/i })).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('María González')).toBeInTheDocument();
    expect(screen.getByText('Carlos Silva')).toBeInTheDocument();
  });

  it('filtra usuarios según el texto ingresado en el buscador', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    const searchInput = screen.getByPlaceholderText(/buscar por nombre, run o correo/i);
    await user.type(searchInput, 'María');

    expect(screen.getByText('María González')).toBeInTheDocument();
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    expect(screen.queryByText('Carlos Silva')).not.toBeInTheDocument();
  });

  it('muestra un mensaje cuando la búsqueda no coincide con ningún usuario', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    const searchInput = screen.getByPlaceholderText(/buscar por nombre, run o correo/i);
    await user.type(searchInput, 'UsuarioInexistente');

    expect(screen.getByText(/no se encontraron usuarios registradas/i)).toBeInTheDocument();
  });

  it('muestra un mensaje de error si se intenta enviar el formulario con campos requeridos vacíos', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    await user.click(screen.getByRole('button', { name: /\+ nuevo usuario/i }));
    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    expect(screen.getByText(/por favor completa todos los campos requeridos/i)).toBeInTheDocument();
  });

  it('valida que el RUN sea válido (Módulo 11) al crear un usuario', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    await user.click(screen.getByRole('button', { name: /\+ nuevo usuario/i }));

    await user.type(screen.getByPlaceholderText(/ingrese nombre/i), 'Pedro Soto');
    await user.type(screen.getByPlaceholderText(/12345678k/i), '12345678K'); // RUN inválido
    await user.type(screen.getByPlaceholderText(/nombre@duoc.cl/i), 'pedro@gmail.com');
    await user.type(screen.getAllByPlaceholderText(/contraseña/i)[0], '123456');
    await user.type(screen.getByPlaceholderText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    expect(screen.getByText(/el run ingresado no es válido/i)).toBeInTheDocument();
  });

  it('valida que el correo pertenezca a los dominios permitidos', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    await user.click(screen.getByRole('button', { name: /\+ nuevo usuario/i }));

    await user.type(screen.getByPlaceholderText(/ingrese nombre/i), 'Pedro Soto');
    await user.type(screen.getByPlaceholderText(/12345678k/i), '111111111'); // RUN válido
    await user.type(screen.getByPlaceholderText(/nombre@duoc.cl/i), 'pedro@hotmail.com');
    await user.type(screen.getAllByPlaceholderText(/contraseña/i)[0], '123456');
    await user.type(screen.getByPlaceholderText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    expect(screen.getByText(/el correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com/i)).toBeInTheDocument();
  });

  it('crea exitosamente un nuevo usuario y lo añade a la tabla', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    await user.click(screen.getByRole('button', { name: /\+ nuevo usuario/i }));

    await user.type(screen.getByPlaceholderText(/ingrese nombre/i), 'Ana Torres');
    await user.type(screen.getByPlaceholderText(/12345678k/i), '111111111');
    await user.type(screen.getByPlaceholderText(/nombre@duoc.cl/i), 'ana.torres@duoc.cl');
    await user.type(screen.getAllByPlaceholderText(/contraseña/i)[0], '123456');
    await user.type(screen.getByPlaceholderText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    expect(screen.getByText('Ana Torres')).toBeInTheDocument();
    expect(screen.getByText('111111111')).toBeInTheDocument();
    expect(screen.getByText('ana.torres@duoc.cl')).toBeInTheDocument();
  });

  it('permite editar los datos de un usuario existente', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    await user.click(editButtons[0]);

    // Modificar el nombre
    const nombreInput = screen.getByPlaceholderText(/ingrese nombre/i);
    await user.clear(nombreInput);
    await user.type(nombreInput, 'Juan Pérez Editado');

    // Cambiar a un RUN válido para superar el Módulo 11
    const runInput = screen.getByPlaceholderText(/12345678k/i);
    await user.clear(runInput);
    await user.type(runInput, '111111111');

    await user.click(screen.getByRole('button', { name: /guardar cambios/i }));

    expect(screen.getByText('Juan Pérez Editado')).toBeInTheDocument();
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
  });

  it('cambia el estado de un usuario entre activo e inactivo', async () => {
    const user = userEvent.setup();
    render(<UsuariosAdmin />);

    // Filtrar búsqueda dentro de la fila de Juan Pérez
    const filaJuan = screen.getByText('Juan Pérez').closest('tr');
    
    expect(within(filaJuan).getByText('Activo')).toBeInTheDocument();

    const toggleButton = within(filaJuan).getByRole('button', { name: /desactivar/i });
    await user.click(toggleButton);

    expect(within(filaJuan).getByText('Inactivo')).toBeInTheDocument();
    expect(within(filaJuan).getByRole('button', { name: /activar/i })).toBeInTheDocument();
  });

  it('elimina un usuario al confirmar la alerta de confirmación', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    render(<UsuariosAdmin />);

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    await user.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que deseas eliminar este usuario?');
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
  });
});