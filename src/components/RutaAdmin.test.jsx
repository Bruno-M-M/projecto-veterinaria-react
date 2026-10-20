import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RutaAdmin from "./RutaAdmin.jsx";

function renderRuta() {
  return render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <h1>Contenido privado</h1>
            </RutaAdmin>
          }
        />
        <Route path="/login" element={<h1>Pantalla de login</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("RutaAdmin", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("sin sesión redirige a /login", () => {
    renderRuta();

    expect(screen.getByText("Pantalla de login")).toBeTruthy();
    expect(screen.queryByText("Contenido privado")).toBeNull();
  });

  it("un usuario normal (esAdmin = false) también es redirigido", () => {
    localStorage.setItem("esAdmin", "false");
    renderRuta();

    expect(screen.getByText("Pantalla de login")).toBeTruthy();
    expect(screen.queryByText("Contenido privado")).toBeNull();
  });

  it("un admin (esAdmin = true) ve el contenido protegido", () => {
    localStorage.setItem("esAdmin", "true");
    renderRuta();

    expect(screen.getByText("Contenido privado")).toBeTruthy();
    expect(screen.queryByText("Pantalla de login")).toBeNull();
  });
});