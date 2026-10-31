import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<h1>Panel admin</h1>} />
        <Route path="/" element={<h1>Inicio</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

function ingresar(email, clave) {
  fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.com"), { target: { value: email } });
  fireEvent.change(screen.getByPlaceholderText("••••••••"), { target: { value: clave } });
  fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
}

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("admin válido guarda esAdmin y navega a /admin", () => {
    renderLogin();
    ingresar("admin@admin.cl", "123456");

    expect(localStorage.getItem("esAdmin")).toBe("true");
    expect(JSON.parse(localStorage.getItem("usuario")).rol).toBe("admin");
    expect(screen.getByText("Panel admin")).toBeTruthy();
  });

  it("usuario normal guarda esAdmin en false y navega al inicio", () => {
    renderLogin();
    ingresar("usuario@gmail.com", "123456");

    expect(localStorage.getItem("esAdmin")).toBe("false");
    expect(JSON.parse(localStorage.getItem("usuario")).rol).toBe("usuario");
    expect(screen.getByText("Inicio")).toBeTruthy();
  });

  it("credenciales incorrectas muestran error y no guardan sesión", () => {
    renderLogin();
    ingresar("otro@gmail.com", "clave-mala");

    expect(screen.getByText("Correo o contraseña incorrectos.")).toBeTruthy();
    expect(localStorage.getItem("esAdmin")).toBeNull();
    expect(screen.queryByText("Panel admin")).toBeNull();
  });

  it("normaliza el correo a minúsculas antes de validar", () => {
    renderLogin();
    ingresar("ADMIN@ADMIN.CL", "123456");

    expect(screen.getByText("Panel admin")).toBeTruthy();
  });
});