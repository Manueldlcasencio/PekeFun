import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";


export const Contacto = () => {
  return (
    <div class="d-flex justify-content-center align-items-center h-100">
      <form class="contacto-form">
        <div class="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div class="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div class="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea className="form-control" id="message" rows="5"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};
