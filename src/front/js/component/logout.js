import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const Logout = () => {
  const { actions } = useContext(Context);


  return (
                 <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#f9643f" }}
                    onClick={actions.logout}>
                    Cerrar sesión
                  </button>
  );
};