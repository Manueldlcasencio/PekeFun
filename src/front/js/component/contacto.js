import React, { useState } from "react";
import { Link } from "react-router-dom";
import PekeFun from "../../img/pekefun2.png";


export const Contacto = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4> Contáctanos                <button
                  className={`btn btn-link float-right ${isExpanded ? 'collapsed' : ''}`}
                  onClick={handleToggle}
                  aria-expanded={isExpanded}
                  aria-controls="datos-web"
                >
                  <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                </button>
              </h4>
            </div>
            <div className={`collapse ${isExpanded ? 'show' : ''}`} id="datos-web">
              <div className="card-body">
                <ul>
                  <li>Dirección: 1234 Calle Principal</li>
                  <li>Teléfono: 555-1234</li>
                  <li>Correo electrónico: <Link to="mailto:infopekefun@gmail.com">infopekefun@gmail.com</Link></li>
                </ul>
                <p>
                  ¡Gracias por visitar nuestra página web! Si tienes alguna
                  pregunta o comentario, por favor utiliza el formulario de
                  contacto que aparece a continuación para ponerte en contacto
                  con nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form className="contacto-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea className="form-control" id="message" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
