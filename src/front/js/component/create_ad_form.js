import React, { useState } from "react";
import { Context } from "../store/appContext";


const Anunciante = () => {
  const [editable, setEditable] = useState(false);


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

  const handleEdit = () => {
    setEditable(true);
  };


  return (
    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="user_id" className="form-label">
          Nombre de usuario:
        </label>
        <input type="number" className="form-control" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre:
        </label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Primer apellido:
        </label>
        <input type="text" className="form-control" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="birthday" className="form-label">
          Fecha de nacimiento:
        </label>
        <input type="text" className="form-control" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="contact" className="form-label">
          Contacto:
        </label>
        <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} disabled={!editable} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="company" className="form-label">
          Nombre de la Organización/Empresa:
        </label>
        <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="working_since" className="form-label">
          Organización/Empresa trabajando desde:
        </label>
        <input type="date" className="form-control" id="working_since" name="working_since" value={formData.working_since} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción:
        </label>
        <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="twitter" className="form-label">
          Twitter:
        </label>
        <input type="text" className="form-control" id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} disabled={!editable} />
      </div>
      <div className="mb-3">
        <label htmlFor="avatar" className="form-label">
          Avatar:
        </label></div>
        <input type="text" className="form-control" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} disabled={!editable} />
        <div className="mb-3">
        <label htmlFor="company_image" className="form-label">
          Logo de la Empresa/Compañía:
        </label></div>
        <input type="text" className="form-control" id="company_image" name="company_image" value={formData.company_image} onChange={handleChange} disabled={!editable} />
        <div className="mb-3">
        <label htmlFor="others" className="form-label">
          Others:
        </label>
        <input type="text" className="form-control" id="others" name="others" value={formData.others} onChange={handleChange} disabled={!editable} /></div>
        <div className="mb-3">
        <label htmlFor="events" className="form-label">
          Events:
        </label>
        <input type="text" className="form-control" id="events" name="events" value={formData.events} onChange={handleChange} disabled={!editable} /></div>

        <button type="button" onClick={() => setEditable(true)}>Editar</button>
        <button type="button" onClick={() => setEditable(false)}>Guardar</button>


      </div>
    </form>


  );

};

export default Anunciante;
