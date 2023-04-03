import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const Tutor = () => {
  const { store, actions } = useContext(Context);
  const tutorActual = store.tutorData;
  const [editable, setEditable] = useState(false);
  const [id, setId] = useState(tutorActual.id);
  const [user_id, setUser_id] = useState(tutorActual.user_id);
  const [birth, setBirth] = useState(tutorActual.birth);
  const [location, setLocation] = useState(tutorActual.location);
  const [children, setChildren] = useState(tutorActual.children);
  const [avatar, setAvatar] = useState(tutorActual.avatar);
  const [nombre, setNombre] = useState(tutorActual.name);
  const [apellido, setApellido] = useState(tutorActual.lastname);

  const handleEdit = (event) => {
    event.preventDefault();
    setEditable(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEditable(false);
  };

  return (
    <div className="anunciante-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birth">Fecha de nacimiento:</label>
          <input
            type="text"
            className="form-control"
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación:</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="children">Cantidad de hijos:</label>
          <input
            type="text"
            className="form-control"
            id="children"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="text"
            className="form-control"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            disabled={!editable}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!editable}>
          Guardar
        </button>
        {!editable && (
          <button type="button" className="btn btn-secondary" onClick={handleEdit}>
            Editar
          </button>
        )}
      </form>
    </div>
  );
};

export default Tutor;