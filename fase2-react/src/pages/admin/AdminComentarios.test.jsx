import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminComentarios from "./AdminComentarios.jsx";

const CLAVE = "comentarios_san_marcos";

const comentariosDePrueba = [
  { id: 1, fecha: "01-10-2026", nombre: "Ana", correo: "ana@gmail.com", comentario: "Muy buena atención" },
  { id: 2, fecha: "02-10-2026", nombre: "Luis", correo: "luis@duoc.cl", comentario: "Rápido y amable" },
];

describe("AdminComentarios", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sin comentarios muestra el mensaje de lista vacía", () => {
    render(<AdminComentarios />);

    expect(screen.getByText("Comentarios (0)")).toBeTruthy();
    expect(screen.getByText("Todavía no hay comentarios.")).toBeTruthy();
  });

  it("lista los comentarios guardados en localStorage", () => {
    localStorage.setItem(CLAVE, JSON.stringify(comentariosDePrueba));
    render(<AdminComentarios />);

    expect(screen.getByText("Comentarios (2)")).toBeTruthy();
    expect(screen.getByText("Ana")).toBeTruthy();
    expect(screen.getByText("Luis")).toBeTruthy();
    expect(screen.getByText("Muy buena atención")).toBeTruthy();
  });

  it("al confirmar, elimina el comentario y actualiza localStorage", () => {
    localStorage.setItem(CLAVE, JSON.stringify(comentariosDePrueba));
    const confirmMock = vi.spyOn(window, "confirm").mockReturnValue(true); // el usuario acepta
    render(<AdminComentarios />);

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(confirmMock).toHaveBeenCalledWith("¿Eliminar este comentario?");
    expect(screen.queryByText("Ana")).toBeNull();
    expect(screen.getByText("Luis")).toBeTruthy();
    expect(JSON.parse(localStorage.getItem(CLAVE)).length).toBe(1);
  });

  it("si el usuario cancela el confirm, no elimina nada", () => {
    localStorage.setItem(CLAVE, JSON.stringify(comentariosDePrueba));
    vi.spyOn(window, "confirm").mockReturnValue(false); // el usuario cancela
    render(<AdminComentarios />);

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(screen.getByText("Ana")).toBeTruthy();
    expect(JSON.parse(localStorage.getItem(CLAVE)).length).toBe(2);
  });
});