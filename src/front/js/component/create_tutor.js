import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const Tutor = () => {
  const { store, actions } = useContext(Context);
  const [editable, setEditable] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [numeroContacto, setNumeroContacto] = useState("");

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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroContacto">Número de contacto:</label>
          <input
            type="text"
            className="form-control"
            id="numeroContacto"
            value={numeroContacto}
            onChange={(e) => setNumeroContacto(e.target.value)}
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
