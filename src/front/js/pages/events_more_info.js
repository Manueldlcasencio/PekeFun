import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Events_more_info = () => {
  const { store } = useContext(Context);
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
    </div>
  );
};
