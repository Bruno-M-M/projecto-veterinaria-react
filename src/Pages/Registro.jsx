import FormularioRegistro from "../Components/Formulario-registro";

export default function Registro() {
  return (
    <main className="flex-grow-1">
      <section id="registro" className="bg-light py-5 min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <FormularioRegistro />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}