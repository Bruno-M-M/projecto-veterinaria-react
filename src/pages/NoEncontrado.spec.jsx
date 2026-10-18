import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NoEncontrado from "./NoEncontrado.jsx";

// Las mismas rutas de App: una conocida y el comodín "*" para todo lo demás
function montar(ruta) {
    return render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes>
                <Route path="/" element={<p>Página de inicio</p>} />
                <Route path="*" element={<NoEncontrado />} />
            </Routes>
        </MemoryRouter>
    );
}

describe("NoEncontrado", () => {
    it("una ruta que no existe muestra el mensaje 404", () => {
        montar("/ruta-inventada");
        expect(screen.getByText("404")).toBeTruthy();
        expect(screen.getByText("No encontramos la página que buscas.")).toBeTruthy();
    });

    it("el botón Volver al inicio apunta a la página principal", () => {
        montar("/ruta-inventada");
        expect(screen.getByText("Volver al inicio").getAttribute("href")).toBe("/");
    });

    it("una ruta que sí existe no muestra el 404", () => {
        montar("/");
        expect(screen.getByText("Página de inicio")).toBeTruthy();
        expect(screen.queryByText("404")).toBeNull();
    });
});
