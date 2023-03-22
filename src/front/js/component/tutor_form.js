import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const Tutor_form = () => {
    const { actions } = useContext(Context);
    const [showTutorForm, setShowTutorForm] = useState(false);
    const [tutorData, setTutorData] = useState({ name: "", lastName: "", birthDate: "", city: "", children: [{ name: "", lastName: "" }] });
    const [loginError, setLoginError] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
  
  

    const addChild = () => {
        setTutorData({ ...tutorData, children: [...tutorData.children, { name: "", lastName: "" }] });
      };
    
      const handleTutorFormSubmit = async (e) => {

        const token = await login(email, password);
        if (token) {
          actions.createTutor(tutorData, token);
          console.log("Esta es la información almacenada en Tutor Data: " + tutorData)
        }
      };

      const handleChildFormSubmit = (index, childData) => {
        actions.addChild(childData);
        const updatedChildren = [...tutorData.children];
        updatedChildren[index] = childData;
        setTutorData({ ...tutorData, children: updatedChildren });
      };

      const handleInputChange = (e, index, child) => {
        const { name, value } = e.target;
        if (child) {
          const updatedChildren = [...tutorData.children];
          updatedChildren[index][name] = value;
          setTutorData({ ...tutorData, children: updatedChildren });
        } else {
          setTutorData({ ...tutorData, [name]: value });
        }
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      return(
                  <div>
                    <h4 className="pt-3">Datos Tutor</h4>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Nombres
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
                      <button type="button" className="btn btn-primary" onClick={addChild}>
                        Agregar otro niño
                      </button>
                    </form>

                  </div>
      )}