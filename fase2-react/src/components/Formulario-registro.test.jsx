import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import FormularioRegistro from './Formulario-registro';

describe('FormularioRegistro Component', () => {
  it('renderiza correctamente todos los campos e interfaz del formulario', () => {
    render(<FormularioRegistro />);

    expect(screen.getByRole('heading', { name: /registro de usuario/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/run/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^correo electrónico$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/región/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comuna/i)).toBeDisabled();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  it('habilita y carga las comunas al seleccionar una región', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    const regionSelect = screen.getByLabelText(/región/i);
    const comunaSelect = screen.getByLabelText(/comuna/i);

    expect(comunaSelect).toBeDisabled();

    await user.selectOptions(regionSelect, 'Valparaíso');

    expect(comunaSelect).not.toBeDisabled();
    expect(screen.getByRole('option', { name: 'Viña del Mar' })).toBeInTheDocument();
  });

  it('muestra un error al enviar el formulario con campos vacíos', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText('Debe completar todos los campos.')).toBeInTheDocument();
  });

  it('muestra un error si el RUN ingresado es inválido según Módulo 11', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Perez');
    await user.type(screen.getByLabelText(/run/i), '12345678K'); // RUN con dígito verificador incorrecto
    await user.type(screen.getByLabelText(/^correo electrónico$/i), 'juan@gmail.com');
    await user.type(screen.getByLabelText(/confirmar correo electrónico/i), 'juan@gmail.com');
    await user.selectOptions(screen.getByLabelText(/región/i), 'Valparaíso');
    await user.selectOptions(screen.getByLabelText(/comuna/i), 'Viña del Mar');
    await user.type(screen.getByLabelText(/^contraseña$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText(/el run ingresado no es válido/i)).toBeInTheDocument();
  });

  it('muestra un error si el nombre contiene números o símbolos', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan123');
    await user.type(screen.getByLabelText(/run/i), '111111111'); // RUN válido
    await user.type(screen.getByLabelText(/^correo electrónico$/i), 'juan@gmail.com');
    await user.type(screen.getByLabelText(/confirmar correo electrónico/i), 'juan@gmail.com');
    await user.selectOptions(screen.getByLabelText(/región/i), 'Valparaíso');
    await user.selectOptions(screen.getByLabelText(/comuna/i), 'Viña del Mar');
    await user.type(screen.getByLabelText(/^contraseña$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText(/el nombre solo debe contener caracteres alfabéticos y espacios/i)).toBeInTheDocument();
  });

  it('muestra un error si el dominio del correo no es permitido', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Perez');
    await user.type(screen.getByLabelText(/run/i), '111111111');
    await user.type(screen.getByLabelText(/^correo electrónico$/i), 'juan@hotmail.com');
    await user.type(screen.getByLabelText(/confirmar correo electrónico/i), 'juan@hotmail.com');
    await user.selectOptions(screen.getByLabelText(/región/i), 'Valparaíso');
    await user.selectOptions(screen.getByLabelText(/comuna/i), 'Viña del Mar');
    await user.type(screen.getByLabelText(/^contraseña$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText(/el correo debe pertenecer a uno de los dominios permitidos/i)).toBeInTheDocument();
  });

  it('muestra un error si los correos electrónicos no coinciden', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Perez');
    await user.type(screen.getByLabelText(/run/i), '111111111');
    await user.type(screen.getByLabelText(/^correo electrónico$/i), 'juan@duoc.cl');
    await user.type(screen.getByLabelText(/confirmar correo electrónico/i), 'otro@duoc.cl');
    await user.selectOptions(screen.getByLabelText(/región/i), 'Valparaíso');
    await user.selectOptions(screen.getByLabelText(/comuna/i), 'Viña del Mar');
    await user.type(screen.getByLabelText(/^contraseña$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText(/los correos electrónicos no coinciden/i)).toBeInTheDocument();
  });

  it('muestra un error si las contraseñas no coinciden', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Perez');
    await user.type(screen.getByLabelText(/run/i), '111111111');
    await user.type(screen.getByLabelText(/^correo electrónico$/i), 'juan@duoc.cl');
    await user.type(screen.getByLabelText(/confirmar correo electrónico/i), 'juan@duoc.cl');
    await user.selectOptions(screen.getByLabelText(/región/i), 'Valparaíso');
    await user.selectOptions(screen.getByLabelText(/comuna/i), 'Viña del Mar');
    await user.type(screen.getByLabelText(/^contraseña$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), '654321');

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  it('muestra la alerta de registro exitoso al ingresar todos los datos correctamente', async () => {
    const user = userEvent.setup();
    render(<FormularioRegistro />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Perez');
    await user.type(screen.getByLabelText(/run/i), '111111111'); // RUN válido (DV 1)
    await user.type(screen.getByLabelText(/^correo electrónico$/i), 'juan@duoc.cl');
    await user.type(screen.getByLabelText(/confirmar correo electrónico/i), 'juan@duoc.cl');
    await user.selectOptions(screen.getByLabelText(/región/i), 'Valparaíso');
    await user.selectOptions(screen.getByLabelText(/comuna/i), 'Viña del Mar');
    await user.type(screen.getByLabelText(/^contraseña$/i), '123456');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), '123456');

    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(screen.getByText('¡Registro exitoso!')).toBeInTheDocument();
  });
});