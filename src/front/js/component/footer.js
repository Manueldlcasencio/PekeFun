import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-2">
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
                <Link to="/" className="text-decoration-none text-white"><i className="bi bi-facebook"></i></Link>
              </li>
              <li>
                <Link to="/" className="text-decoration-none text-white"><i className="bi bi-twitter"></i></Link>
              </li>
              <li>
                <Link to="/" className="text-decoration-none text-white"><i className="bi bi-instagram"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 rounded d-flex align-items-center justify-content-center" style={{ backgroundColor: "#feb823" }}>
        <strong className="text-dark">© 2023 PekeFun. Todos los derechos reservados.</strong>
        <div>
          <Link to="/" className="text-decoration-none text-white me-3"><i className="bi bi-facebook"></i></Link>
          <Link to="/" className="text-decoration-none text-white me-3"><i className="bi bi-twitter"></i></Link>
          <Link to="/" className="text-decoration-none text-white"><i className="bi bi-instagram"></i></Link>
        </div>
      </div>
    </footer>
  );
};


