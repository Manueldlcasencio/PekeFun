import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


const Tutor = () => {
  const [tutorData, setTutorData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    city: "",
    children: [{ name: "", lastName: "", birth: "" }],
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e, index, isChild) => {
    const { name, value } = e.target;
    if (isChild) {
      const children = [...tutorData.children];
      children[index][name] = value;
      setTutorData({ ...tutorData, children });
    } else {
      setTutorData({ ...tutorData, [name]: value });
    }
  };

  const addChild = () => {
    const children = [...tutorData.children, { name: "", lastName: "", birth: "" }];
    setTutorData({ ...tutorData, children });
  };

  const handleDeleteChild = (childIndex) => {
    const children = [...tutorData.children];
    children.splice(childIndex, 1);
    setTutorData({ ...tutorData, children });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };
  return (
    <div>
      <h4 className="pt-3">Datos Tutor</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Nombres" value={tutorData.name} onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Primer apellido
          </label>
          <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Primer apellido" value={tutorData.lastName} onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Fecha de nacimiento
          </label>
          <input type="date" className="form-control" id="birthDate" name="birthDate" value={tutorData.birthDate} onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            Ciudad de residencia
          </label>
          <input type="text" className="form-control" id="city" name="city" placeholder="Ciudad de residencia" value={tutorData.city} onChange={(e) => handleInputChange(e)} />
        </div>
        {tutorData.children.map((child, index) => (
          <div key={index}>
            <h5>Niño {index + 1}</h5>
            <div className="mb-3">
              <label htmlFor={`childname-${index}`} className="form-label">
                Nombres
              </label>
              <input type="text" className="form-control" id={`childname-${index}`} name="name" placeholder="Nombres" value={child.name} onChange={(e) => handleInputChange(e, index, true)} />
            </div>
            <div className="mb-3">
              <label htmlFor={`childLastName-${index}`} className="form-label">
                Primer apellido
              </label>
              <input type="text" className="form-control" id={`childLastName-${index}`} name="lastName" placeholder="Primer apellido" value={child.lastName} onChange={(e) => handleInputChange(e, index, true)} />
            </div>
            <div className="mb-3">
              <label htmlFor={`childbirth-${index}`} className="form-label">
                Fecha de nacimiento
              </label>
              <input type="date" className="form-control" id={`childbirth-${index}`} name="birth" value={child.birth} onChange={(e) => handleInputChange(e, index, true)} />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-danger" onClick={() => handleDeleteChild(index)}>Eliminar niño</button>
        <button type="button" className="btn btn-primary" onClick={addChild}>
          Agregar otro niño
        </button>
        <button type="button" className="btn btn-primary" onClick={() => setEditMode(true)}>
          Editar
        </button>
        <button type="submit" className="btn btn-success" disabled={!editMode} onClick={handleSave}>
          Guardar
        </button>
      </form>
    </div>

  );
};

export default Tutor;