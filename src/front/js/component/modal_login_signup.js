import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Collapse, Modal, Button } from "react-bootstrap";
import { Login } from "./login.js";
import "../../styles/modals.css";

export const Modal_login_signup = () => {
  const { actions } = useContext(Context);
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [showAdvertiserForm, setShowAdvertiserForm] = useState(false);
  const [tutorData, setTutorData] = useState({ name: "", lastName: "", birthDate: "", city: "", children: [{ name: "", lastName: "", birth: "" }] });
  const [advertiserData, setAdvertiserData] = useState({ name: "", lastName: "", contact: "", avatar: "", company: "", working_since: "", twitter: "", birthDate: "", city: "" });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);


  const handleTutorCheck = (e) => {
    setShowTutorForm(e.target.checked);
  };

  const handleAdvertiserCheck = (e) => {
    setShowAdvertiserForm(e.target.checked);
  };

  const addChild = () => {
    setTutorData({ ...tutorData, children: [...tutorData.children, { name: "", lastName: "", birth: "" }] });
  };

  const handleTutorFormSubmit = (token) => {
    actions.createTutor(email, tutorData, token);
    actions.modifyTutor(email, tutorData, token);
    console.log(`Esta es la información almacenada en Tutor Data: ${JSON.stringify(tutorData, null, 2)}`, showTutorForm);
  };

  const handleAdvertiserFormSubmit = (token) => {
    actions.createAdvertiser(email, advertiserData, token);
    console.log(`Esta es la información almacenada en Advertiser Data: ${JSON.stringify(advertiserData, null, 2)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showTutorForm || showAdvertiserForm) {
      setErrorMessage('');
      const isRegistered = await actions.register(email, password, setShowTutorForm, setShowAdvertiserForm, tutorData, advertiserData);
      if (isRegistered) {
        const token = await actions.login(email, password);
        if (token) {
          // Almacenar el email en el localStorage con la key "username"
          localStorage.setItem("username", email);

          if (showTutorForm) {
            handleTutorFormSubmit(token);
          }
          if (showAdvertiserForm) {
            handleAdvertiserFormSubmit(token);
          }
        }
      } else {
        setErrorMessage('Hubo un problema al registrar tu cuenta. Por favor, intenta nuevamente.');
      }
    } else {
      setErrorMessage('Por favor, selecciona una opción antes de continuar.');
    }
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

  const handleInputChangeAdv = (e) => {
    const { name, value } = e.target;
    setAdvertiserData({ ...advertiserData, [name]: value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <Button variant="primary" onClick={handleModalShow} style={{ backgroundColor: "#f9643f" }}>
        Login / Sign Up!
      </Button>
      
        <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} contentClassName="transparent-modal">
        <Modal.Dialog>
          
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
                <li>
                <Modal.Header closeButton className="custom-modal-header transparent-modal-header"></Modal.Header></li>
</ul>

              

              
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active p-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">

                  <Login />

                </div>
                <div className="tab-pane fade p-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="password" placeholder="Registre su contraseña" value={password} onChange={handlePasswordChange} />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" onChange={handleTutorCheck} />
                      <label className="form-check-label" htmlFor="flexCheckDefault1"><mark>Soy Tutor</mark> (quiero inscribir a mis hijos a
                        una actividad)</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" onChange={handleAdvertiserCheck} />
                      <label className="form-check-label" htmlFor="flexCheckDefault2"><mark>Soy Anunciante</mark> (quiero publicitar eventos organizador por mi organización/empresa)</label>
                    </div>
                  </div>
                  <Collapse in={showTutorForm}>
                    <div>
                      <h4 className="pt-3">Datos Tutor</h4>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Nombres
                          </label>
                          <input type="text" className="form-control" id="name" name="name" placeholder="Nombres" value={tutorData.name} onChange={(e) => handleInputChange(e)} />
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
                              <label htmlFor={`childname-${index}`} className="form-label">
                                Nombres
                              </label>
                              <input type="text" className="form-control" id={`childname-${index}`} name="name" placeholder="Nombres" value={child.name} onChange={(e) => handleInputChange(e, index, true)} />
                            </div>
                            <div className="mb-3">
                              <label htmlFor={`childLastName-${index}`} className="form-label">
                                Primer apellido
                              </label>
                              <input type="text" className="form-control" id={`childLastName-${index}`} name="lastName" placeholder="Primer apellido" value={child.lastName} onChange={(e) => handleInputChange(e, index, true)} />
                            </div>
                            <div className="mb-3">
                              <label htmlFor={`childbirth-${index}`} className="form-label">
                                Fecha de nacimiento
                              </label>
                              <input type="date" className="form-control" id={`childbirth-${index}`} name="birth" value={child.birth} onChange={(e) => handleInputChange(e, index, true)} />
                            </div>
                          </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={addChild}>
                          Agregar otro niño
                        </button>
                      </form>
                    </div>
                  </Collapse>
                  <Collapse in={showAdvertiserForm}>
                    <div>
                      <h4 className="pt-3">Datos Anunciante</h4>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Nombres
                          </label>
                          <input type="text" className="form-control" id="name" name="name" placeholder="Nombres" value={advertiserData.name} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">
                            Primer apellido
                          </label>
                          <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Primer apellido" value={advertiserData.lastName} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="birthDate" className="form-label">
                            Fecha de nacimiento
                          </label>
                          <input type="date" className="form-control" id="birthDate" name="birthDate" value={advertiserData.birthDate} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="twitter" className="form-label">
                            Pega aquí el nombre de la cuenta de Twitter de tu Organización/Empresa
                          </label>
                          <input type="text" className="form-control" id="twitter" name="twitter" placeholder="@nombre_de_tu_org_empresa" value={advertiserData.twitter} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="company" className="form-label">
                            Nombre de la Organización / Empresa
                          </label>
                          <input type="text" className="form-control" id="company" name="company" placeholder="Nombre de la Organización / Empresa" value={advertiserData.company} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="avatar" className="form-label">
                            Pega el link a tu avatar / logo de tu Organización / Empresa
                          </label>
                          <input type="text" className="form-control" id="avatar" name="avatar" placeholder="Pega el link a tu avatar / logo de tu Organización / Empresa" value={advertiserData.avatar} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="contact" className="form-label">
                            Datos de contacto
                          </label>
                          <input type="text" className="form-control" id="contact" name="contact" placeholder="Número de teléfono" value={advertiserData.contact} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="working_since" className="form-label">
                            Organización / Empresa trabajando desde
                          </label>
                          <input type="date" className="form-control" id="working_since" name="working_since" value={advertiserData.working_since} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label">
                            Ciudad de residencia
                          </label>
                          <input type="text" className="form-control" id="city" name="city" placeholder="Ciudad de residencia" value={advertiserData.city} onChange={(e) => handleInputChangeAdv(e)} />
                        </div>
                      </form>
                    </div>
                  </Collapse>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {errorMessage && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {errorMessage}
                      </div>
                    )}
              
                    <Modal.Footer>
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#f9643f" }} onClick={handleSubmit}>Registrarse</button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Dialog>

        </Modal>
      
    </div>
  );
};