import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Sobre nosotros</h5>

            <p>
              Somos una empresa dedicada a ofrecer las mejores opciones de ocio y diversión para toda la familia.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces útiles</h5>

            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-white">Inicio</Link>
              </li>
              <li>
                <Link to="/categories" className="text-decoration-none text-white">Categorias</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-decoration-none text-white">Contacto</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Síguenos en las redes sociales</h5>

            <ul className="list-unstyled mt-3">
              <li>
                <a href="#" className="text-decoration-none text-white"><i className="bi bi-facebook"></i></a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-white"><i className="bi bi-twitter"></i></a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-white"><i className="bi bi-instagram"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#feb823" }}>
        © 2023 PekeFun. Todos los derechos reservados.
      </div>
    </footer>
  );
};

