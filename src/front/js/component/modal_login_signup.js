import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Collapse } from "react-bootstrap";

export const Modal_login_signup = () => {
  const { actions } = useContext(Context);
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [tutorData, setTutorData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    city: "",
    children: [{ firstName: "", lastName: "" }]
  });

  const handleTutorCheck = (e) => {
    setShowTutorForm(e.target.checked);
  };

  const addChild = () => {
    setTutorData({
      ...tutorData,
      children: [...tutorData.children, { firstName: "", lastName: "" }]
    });
  };

  const handleTutorFormSubmit = (e) => {
    e.preventDefault();
    actions.createTutor(tutorData);
  };

  const handleChildFormSubmit = (index, childData) => {
    actions.addChild(childData);
    const updatedChildren = [...tutorData.children];
    updatedChildren[index] = childData;
    setTutorData({ ...tutorData, children: updatedChildren });
  };

  const handleInputChange = (e, index, child) => {
    const { name, value } = e.target;
    if (child) {
      const updatedChildren = [...tutorData.children];
      updatedChildren[index][name] = value;
      setTutorData({ ...tutorData, children: updatedChildren });
    } else {
      setTutorData({ ...tutorData, [name]: value });
    }
  };

  return (
    <div className="container">
      <button type="button" className="btn btn-primary" style={{ backgroundColor: "#f9643f" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Login / Sign Up!
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#feb823" }}>
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                  Sign Up!
                </button>
              </li>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end ms-auto">
                <button type="button" className="btn-close me-md-2" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active p-3"id="home-tab-pane"role="tabpanel"aria-labelledby="home-tab">

                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto p-2">
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#f9643f" }}>Iniciar sesión</button>
                  </div>
                </form>
              </div>
              <div className="tab-pane fade p-3" id="profile-tab-pane" role="tabpanel"aria-labelledby="profile-tab">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" onChange={handleTutorCheck} />
                      <label className="form-check-label" htmlFor="flexCheckDefault1"><mark>Soy Tutor</mark> (quiero inscribir a mis hijos a
                        una actividad)</label>
                    </div>
                  </div>

                  <Collapse in={showTutorForm}>
                    <div>
                      <form onSubmit={handleTutorFormSubmit}>
                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">
                            Nombres
                          </label>
                          <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Nombres" value={tutorData.firstName} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">
                            Primer apellido
                          </label>
                          <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Primer apellido" value={tutorData.lastName} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="birthDate" className="form-label">
                            Fecha de nacimiento
                          </label>
                          <input type="date" className="form-control" id="birthDate" name="birthDate" value={tutorData.birthDate} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label">
                            Ciudad de residencia
                          </label>
                          <input type="text" className="form-control" id="city" name="city" placeholder="Ciudad de residencia" value={tutorData.city} onChange={(e) => handleInputChange(e)} />
                        </div>

                        {tutorData.children.map((child, index) => (
                          <div key={index}>
                            <h5>Niño {index + 1}</h5>
                            <div className="mb-3">
                              <label htmlFor={`childFirstName-${index}`} className="form-label">
                                Nombres
                              </label>
                              <input type="text" className="form-control" id={`childFirstName-${index}`} name="firstName" placeholder="Nombres" value={child.firstName} onChange={(e) => handleInputChange(e, index, true)} />
                            </div>
                            <div className="mb-3">
                              <label htmlFor={`childLastName-${index}`} className="form-label">
                                Primer apellido
                              </label>
                              <input type="text" className="form-control" id={`childLastName-${index}`} name="lastName" placeholder="Primer apellido" value={child.lastName} onChange={(e) => handleInputChange(e, index, true)} />
                            </div>
                          </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={addChild}>
                          Agregar otro niño
                        </button>
                      </form>
                    </div>
                  </Collapse>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="submit" className="btn btn-primary" style={{ backgroundColor: "#f9643f" }}>
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




/* PRUEBA APLICANDO CAMBIOS DE PRUEBA EN FLUX.JS

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import jwt_decode from "jwt-decode";

const ModalLoginSignup = (props) => {
  const { store, actions } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await actions.handleLogin();
    if (result) {
      const decodedToken = jwt_decode(result.access_token);
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("user", JSON.stringify(decodedToken));
      props.onHide();
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await actions.handleSignup();
    if (result) {
      alert("Usuario registrado exitosamente.");
      props.onHide();
    }
  };

  return (
    <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar sesión / Registrarse</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => props.onHide()}
            ></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                  role="tab"
                  aria-controls="login"
                  aria-selected="true"
                >
                  Iniciar sesión
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="signup-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#signup"
                  type="button"
                  role="tab"
                  aria-controls="signup"
                  aria-selected="false"
                >
                  Registrarse
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="login"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      name="email"
                      onChange={(e) => actions.handleChange(e, "login")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      name="password"
                      onChange={(e) => actions.handleChange(e, "login")}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                  </button>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="signup"
                role="tabpanel"
                aria-labelledby="signup-tab"
              >
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="signupEmail"
                      name="email"
                      onChange={(e) => actions.handleChange(e, "signup")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="signupPassword"
                      name="password"
                      onChange={(e) => actions.handleChange(e, "signup")}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoginSignup;
*/
