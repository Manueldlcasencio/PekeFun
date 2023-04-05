import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const Usuario = () => {
  const { store, actions } = useContext(Context);
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState("usuario1");
  const [password, setPassword] = useState("contraseña1");

  const handleEdit = (event) => {
    event.preventDefault();
    setEditable(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEditable(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Usuario:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default Usuario;
