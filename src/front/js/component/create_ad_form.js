import React, { useState } from "react";
import { Context } from "../store/appContext";

const Anunciante = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    lastname: "",
    birthday: "",
    contact: "",
    company: "",
    working_since: "",
    description: "",
    twitter: "",
    avatar: "",
    company_image: "",
    others: "",
    events: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="row g-3 needs-validation">
      <div className="col-md-6">
        <label htmlFor="user_id">Nombre de usuario:</label>
        <input type="number" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} /><br/><br/>

        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br/><br/>

        <label htmlFor="lastname">Primer apellido:</label>
        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br/><br/>

        <label htmlFor="lastname">Fecha de nacimiento:</label>
        <input type="text" id="birthday" name="birthday" value={formData.bithday} onChange={handleChange} /><br/><br/>

        <label htmlFor="contact">Contacto:</label>
        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} /><br/><br/>

        <label htmlFor="company">Nombre de la Organización/Empresa:</label>
        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} /><br/><br/>

        <label htmlFor="working_since">Organización/Empresa trabajando desde:</label>
        <input type="date" id="working_since" name="working_since" value={formData.working_since} onChange={handleChange} /><br/><br/>

        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} /><br/><br/>

        <label htmlFor="twitter">Twitter:</label>
        <input type="text" id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} /><br/><br/>

        <label htmlFor="avatar">Avatar:</label>
        <input type="text" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} /><br/><br/>

        <label htmlFor="company_image">Logo de la Empresa/Compañía:</label>
        <input type="text" id="company_image" name="company_image" value={formData.company_image} onChange={handleChange} /><br/><br/>

        <label htmlFor="others">Others:</label>
        <input type="text" id="others" name="others" value={formData.others} onChange={handleChange} /><br/><br/>

        <label htmlFor="events">Events:</label>
        <input type="text" id="events" name="events" value={formData.events} onChange={handleChange} /><br/><br/>

        <button type="submit">Enviar</button>
      </div>
    </form>

    
  );
};

export default Anunciante;
