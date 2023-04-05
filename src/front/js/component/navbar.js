import React, { useState } from "react";
import { Link } from "react-router-dom";
import PekeFun from "../../img/pekefun2.png";
import Perfil from "../../img/perfil.png";
import { Modal_login_signup } from "./modal_login_signup.js";
import { Logout } from "./logout.js";
import { FavoritesDropdown } from "./favorites_dropdown.js";


const categorias = [
  {
    nombre: "Deportes",
    actividades: ["Fútbol", "Escuelas de Surf"]
  },
  {
    nombre: "Categorias destacadas",
    actividades: ["Campamentos de verano", "Baile", "Cocina"]
  },
  {
    nombre: "Idiomas",
    actividades: ["Inglés"]
  }
];

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [textSearch, setTextSearch] = useState("");


  const handleLogin = () => {
    // Aquí colocas la lógica para hacer login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Aquí colocas la lógica para hacer logout
    setIsAuthenticated(false);
  };

  const handleSearch = async () => {
    // aqui logica busqueda 
    // aqui utilizo el textSearch como word del endpoint {"done": false, "word": textSearch }
    console.log(textSearch);
    const url = process.env.BACKEND_URL + "/event/all";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "done": false,
        "word": textSearch,
      })
    };
    try {
      const resp = await fetch(url, requestOptions)
      if (resp.status != 200) {
        console.log("error: falló el fecth de event/all con word");
        return false;
      }
      const data = await resp.json();
      console.log("ok", data);
      //cuando regrese del endpoint actualizar el store events 
      // setStore({ token: data.access_token })

      return true;
    }
    catch (error) {
      console.error("There has been an error login in")
    }

    //hay que renderizar el componente de las cards_activities con los datos que devuelve el endpoint

    // aqui blanquea las variables
    setTextSearch("");
  };

  const handleTextSearch = (e) => {
    setTextSearch(e.target.value);
    console.log(textSearch)
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


              <li className="nav-item">
                <Link to="/contacto" className="nav-link">
                  Contacto
                </Link>
              </li>
            </ul>
            {/* Barra de búsqueda */}
            <form className="d-flex">
              <input type="text" placeholder="..." className="form-control search-input" value={textSearch} onChange={handleTextSearch} />
              <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Buscar</button>
            </form>

            <Link to="/" className="navbar-brand">
            <img src={Perfil} alt="" width="200" height="200" />
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


