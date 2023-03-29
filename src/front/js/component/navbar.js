import React, { useState } from "react";
import { Link } from "react-router-dom";
import PekeFun from "../../img/pekefun2.png";
import { Modal_login_signup } from "./modal_login_signup.js";
import { Logout } from "./logout.js";
import { FavoritesDropdown } from "./favorites_dropdown.js";

const categorias = [
  {
    nombre: "Deportes",
    actividades: ["Fútbol", "Escuelas de Surf", ]
  },
  {
    nombre: "Categorias destacadas",
    actividades: ["Campamentos de verano", "Baile", "Cocina"]
  },
  {
    nombre: "Idiomas",
    actividades: ["Inglés", "Francés", "Alemán"]
  }
];

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Aquí colocas la lógica para hacer login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Aquí colocas la lógica para hacer logout
    setIsAuthenticated(false);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-#19d8b6 ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={PekeFun} alt="" width="200" height="200" />
          </Link>

          <button
            className="navbar-toggler"
            color=""
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  Categorias
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link to="/FavoritesDropdown"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Actividades principales
                  </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categorias.map((categoria) => (
                    <li key={categoria.nombre}>
                      <Link
                        to={`/categorias/${categoria.nombre}`}
                        className="dropdown-item"
                      >
                        {categoria.nombre}
                      </Link>
                      <div className="dropdown-divider"></div>
                      {categoria.actividades.map((actividad) => (
                        <Link
                          to={`/categorias/${categoria.nombre}/${actividad}`}
                          className="dropdown-item"
                          key={actividad}
                        >
                          {actividad}
                        </Link>
                      ))}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">
                  Contacto
                </Link>
              </li>
            </ul>
                  {/* Barra de búsqueda */}
          <form className="d-flex">
          <input type="text" placeholder="..." className="form-control search-input" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>

            {isAuthenticated ? (
              <Logout handleLogout={handleLogout} />
            ) : (
              <Modal_login_signup handleLogin={handleLogin} />
            )}
          </div>
        </div>
        </nav>
    </div>
  );
};


