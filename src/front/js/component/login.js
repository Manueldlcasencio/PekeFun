import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const token = await actions.login(email, password);

    if (token) {
      localStorage.setItem("jwt", token);
      await actions.getUserInfo();
    } else {
      setLoginError("Error al iniciar sesión");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailChange} value={email} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </div>
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}
      <div className="d-grid gap-2 col-6 mx-auto p-2">
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#f9643f" }} onClick={handleLoginSubmit}>Iniciar sesión</button>
      </div>
    </form>
  )
}
