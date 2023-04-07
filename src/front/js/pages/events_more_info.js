import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Modal_login_signup } from "../component/modal_login_signup.js";
import {Child_Selection_Modal} from "../component/child_selection_modal.js";

export const Events_more_info = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  
  const handleParticipantRegisterClick = async () => {
  const userData = await actions.getUserData();
  if (userData.is_tutor && userData.children.length !== 0) {
    handleShowModal();
  } else {
    actions.handleParticipantRegister();
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

  console.log("VER AQUI!!!!!!!", store.selectedEvent, "VER AQUI!!!!!!")
  console.log("childList en Events_more_info:", store.userData.children);


  if (!store.selectedEvent) {
    return <h3>No hay evento seleccionado</h3>;
  } 

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

      // Verificar que userChildren esté disponible en el store

    </div>
  );
};
