import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Modal_login_signup } from "../component/modal_login_signup.js";
import {Child_Selection_Modal} from "../component/child_selection_modal.js";
import { format } from "date-fns";
import "../../styles/events_more_info.css";


export const Events_more_info = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const advertiserData = store.advertiserData
  
  useEffect(() => {
    console.log("showModal value:", showModal);
  }, [showModal]);
  
  useEffect(() => {
    console.log("store.tutorData.children:", store.tutorData.children);
  }, [store.tutorData.children]);

  const handleLoginSignupModalClose = () => {
    setShowLoginSignupModal(false);
  };

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  
  const handleParticipantRegisterClick = async () => {
    const token = localStorage.getItem("token");
  
    if (!token || token === "" || token === "undefined") {
      setShowLoginSignupModal(true); 
      return;
    }
  
    const userData = store.userData;
    const children = store.tutorData.children.length != 0 ? store.tutorData.children : [];

    if (userData.info.tutor && children.length !== 0) {
      handleShowModal(); 
    } else {
      console.log("no hay niños registrados");
    }
  };
  
  console.log('selectedEvent:', store.selectedEvent);

  const {
    event_id,
    name,
    description,
    date,
    price,
    image,
    length,
    category,
    slots,
    min_age,
    max_age,
    contact,
    cloth,
    others,
  } = store.selectedEvent;

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  if (!store.selectedEvent) {
    return <h3>No hay evento seleccionado</h3>;
  } 

  console.log("tutorData en Events_more_info:", store.tutorData);
  return (
    <div className="container mt-3">
    <div className="row align-items-center">
      <div className="col-12 col-lg-2 p-3">
        <h3><strong>{name}</strong></h3>
      </div>
      <div className="col-12 col-lg-6 ">
        <p><strong>¿Qué haremos?</strong> {description}</p>
        <p><strong>¿Cuándo comenzaremos?</strong> {formattedDate}</p>
        <p><strong>¿Cuánto dura?</strong> {length}</p>
        <p><strong>Categoría:</strong> {category}</p>
        <p><strong>¿Cuántas vacantes disponibles hay?</strong> {slots}</p>
        <p><strong>¿Cuál es la edad mínima recomendada?</strong> {min_age}</p>
        <p><strong>¿Cuál es la edad máxima recomendada?</strong> {max_age}</p>
        <p><strong>¿Consultas? Pueden contactar directo al anunciante aquí!:</strong>{" "}{advertiserData.info?.contact || "anunciante@gmail.com"}</p>
        <p><strong>¿Qué vestimenta es la ideal?</strong> {cloth}</p>
        <p><strong>Otras aclaraciones:</strong> {others}</p>
        {store.token ? <button type="button" className="btn btn-warning" onClick={handleParticipantRegisterClick} style={{ backgroundColor: "#f9643f" }}>
          ¡Inscribirse!
        </button> : <Modal_login_signup show={showLoginSignupModal} onHide={handleLoginSignupModalClose} />}
      </div>
      <div className="col-12 col-lg-3 d-flex justify-content-center">
        {image && (
          <img src={image} className="img-fluid w-100 ms-auto d-block p-2" alt="..." />
        )}
      </div>
    </div>
    <Child_Selection_Modal show={showModal} onHide={handleHideModal} childList={store.tutorData.children} />
    
  </div>
);
};
