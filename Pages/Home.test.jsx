import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home.jsx";

const CLAVE = "comentarios_san_marcos";

// Home usa <Link>, así que necesita un Router alrededor
function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

function escribirComentario({ nombre, correo, comentario }) {
  fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: nombre } });
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText(/comentario \/ mensaje/i), { target: { value: comentario } });
  fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));
}

describe("Home", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra el título principal del hero", () => {
    renderHome();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toMatch(/Cuidamos a tu mejor amigo/i);
  });

  it("muestra las 4 tarjetas de información de la tienda", () => {
    renderHome();
    ["Horario", "Ubicación", "Despacho", "Garantía"].forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeTruthy();
    });
  });

  it("los botones del hero apuntan a /servicios y /blogs", () => {
    renderHome();
    expect(screen.getByRole("link", { name: /agendar una hora/i }).getAttribute("href")).toBe("/servicios");
    expect(screen.getByRole("link", { name: /ver blogs/i }).getAttribute("href")).toBe("/blogs");
  });

  it("un comentario válido se guarda en localStorage con id y fecha", () => {
    renderHome();
    escribirComentario({
      nombre: "María Pérez",
      correo: "MARIA@gmail.com",
      comentario: "Excelente atención",
    });

    const guardados = JSON.parse(localStorage.getItem(CLAVE));
    expect(guardados.length).toBe(1);
    expect(guardados[0].nombre).toBe("María Pérez");
    expect(guardados[0].correo).toBe("maria@gmail.com"); // el formulario lo pasa a minúsculas
    expect(guardados[0].id).toBeDefined();
    expect(guardados[0].fecha).toBeTruthy();
    expect(screen.getByText(/tu mensaje fue enviado correctamente/i)).toBeTruthy();
  });

  it("un comentario con dominio de correo no permitido NO se guarda", () => {
    renderHome();
    escribirComentario({
      nombre: "Pedro",
      correo: "pedro@hotmail.com",
      comentario: "Hola",
    });

    const guardados = JSON.parse(localStorage.getItem(CLAVE));
    expect(guardados.length).toBe(0);
    expect(screen.queryByText(/tu mensaje fue enviado correctamente/i)).toBeNull();
  });

  it("conserva los comentarios previos y agrega el nuevo al inicio", () => {
    localStorage.setItem(
      CLAVE,
      JSON.stringify([{ id: 1, fecha: "01-01-2026", nombre: "Antiguo", correo: "a@gmail.com", comentario: "Viejo" }])
    );
    renderHome();
    escribirComentario({
      nombre: "Nuevo",
      correo: "nuevo@duoc.cl",
      comentario: "Reciente",
    });

    const guardados = JSON.parse(localStorage.getItem(CLAVE));
    expect(guardados.length).toBe(2);
    expect(guardados[0].nombre).toBe("Nuevo");
    expect(guardados[1].nombre).toBe("Antiguo");
  });
});