import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container-fluid mt-5" style={{ backgroundColor: "#8c52ff" }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0" >
            <h5 className="text-uppercase">Sobre nosotros</h5>

            <p>
              Somos una empresa dedicada a ofrecer las mejores opciones de ocio y diversión para toda la familia.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces útiles</h5>

            <ul className="list-unstyled d-flex  footer-links">
              <li className="mr-4">
                <Link to="/" className="text-decoration-none text-white">Inicio</Link>
              </li>
              <li className="mr-4">
                <Link to="/categories" className="text-decoration-none text-white">Categorias</Link>
              </li>
              <li className="mr-4">
                <Link to="/contacto" className="text-decoration-none text-white">Contacto</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Síguenos en las redes sociales</h5>
            <div className="social-media mt-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size="2em" className="mx-3" color="#feb823" />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FaTwitter size="2em" className="mx-3" color="#feb823" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size="2em" className="mx-3" color="#feb823" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#feb823" }} >
        <strong>© 2023 PekeFun. Todos los derechos reservados.</strong>
      </div>
    </footer>
  );
};
