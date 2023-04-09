import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Modal_login_signup } from "../component/modal_login_signup.js";
import {Child_Selection_Modal} from "../component/child_selection_modal.js";

export const Events_more_info = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);

  useEffect(() => {
    console.log("showModal value:", showModal);
  }, [showModal]);
  
  useEffect(() => {
    console.log("store.tutorData.children:", store.tutorData.children);
  }, [store.tutorData.children]);
  
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
    length,
    category,
    slots,
    min_age,
    max_age,
    contact,
    cloth,
    others,
  } = store.selectedEvent;

  if (!store.selectedEvent) {
    return <h3>No hay evento seleccionado</h3>;
  } 

  console.log("tutorData en Events_more_info:", store.tutorData);
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{date}</p>
      <p>{length}</p>
      <p>{category}</p>
      <p>{slots}</p>
      <p>{min_age}</p>
      <p>{max_age}</p>
      <p>{contact}</p>
      <p>{cloth}</p>
      <p>{others}</p>
      <button type="button" className="btn btn-warning" onClick={handleParticipantRegisterClick}>¡Inscribirse!</button>
     
      <Child_Selection_Modal show={showModal} onHide={handleHideModal} childList={store.tutorData.children} />
      <Modal_login_signup show={showLoginSignupModal} onHide={() => setShowLoginSignupModal(false)} />
    
    </div>
  );
};
