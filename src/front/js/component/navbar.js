import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PekeFun from "../../img/pekefun2.png";
import Perfil from "../../img/perfil.png";
import { Modal_login_signup } from "./modal_login_signup.js";
import { Logout } from "./logout.js";
import { FavoritesDropdown } from "./favorites_dropdown.js";
import { Context } from "../store/appContext.js";
import { FiSearch } from "react-icons/fi";
import "../../styles/index.css";
import "../../styles/home.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [textSearch, setTextSearch] = useState("");

  const handleSearch = () => {
    console.log(textSearch);
    actions.filterEventsByKeyword(textSearch);
    setTextSearch("");
  };

  const handleTextSearch = (e) => {
    setTextSearch(e.target.value);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-#19d8b6">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={PekeFun} alt="" className="img-fluid custom-logo" />
          </Link>

          <button
            className="navbar-toggler"
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
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">
                  Contacto
                </Link>
              </li>
            </ul>

            {/* Barra de búsqueda */}
            <form className="d-flex">
              <input
                type="text"
                placeholder="Encuentra tu actividad"
                className="form-control search-input"
                value={textSearch}
                onChange={handleTextSearch}
              />
              <button
                className="btn btn-outline-light mx-2 rounded-circle"
                type="button"
                onClick={handleSearch}
              >
                <FiSearch />
              </button>
            </form>

            {/* Logica para mostrar el perfil usuario*/}
            {/* Falta apuntar al link correcto*/}
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img src={Perfil} alt="" className="img-fluid custom-profile" />
            </Link>

            {/* Logica para botón login/logout*/}
            {store.token ? <Logout /> : <Modal_login_signup />}
          </div>
          </div>
  </nav>
</div>
);
};