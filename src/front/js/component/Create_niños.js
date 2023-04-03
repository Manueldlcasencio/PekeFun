import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";


const Niños = () => { 
  const { store, actions } = useContext(Context);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("Nombre");
  const [lastName, setLastName] = useState("Apellido");
  const [age, setAge] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [children, setChildren] = useState([]);

  const handleEdit = () => setEditable(true);
  const handleSave = () => setEditable(false);

  const handleAddChild = () => {
    setChildren([...children, { name: "Nombre", age: 0 }]);
  };

  const handleRemoveChild = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  const [addingChild, setAddingChild] = useState(false);
 
  const handleAddChildClick = () => {
    setAddingChild(true);
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!editable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Edad:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!editable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="additionalInfo">Información adicional:</label>
              <textarea
                className="form-control"
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
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
        <div className="col">
          <h3>Niños</h3>
          {children.map((child, index) => (
            <div key={index}>
              <p>
                <strong>Nombre: </strong>
                {child.name}
              </p>
              <p>
                <strong>Edad: </strong>
                {child.age}
              </p>
              <p>
                <strong>Informacín adicional: </strong>
                {child.age}
              </p>
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveChild(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-success" onClick={handleAddChild}>
            Agregar niño
          </button>
        </div>
      </div>
    </div>
  );
};

export default Niños;
