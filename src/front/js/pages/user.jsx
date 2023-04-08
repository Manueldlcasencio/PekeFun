import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import "../../styles/user.css";

export const User = () => {
  const { store } = useContext(Context);
  const [protect, setProtect] = useState();
  const [username, setUsername] = useState();
  const [info, setInfo] = useState();
  const [infotutor, setInfotutor] = useState();
  const [infochild, setInfochild] = useState();

  //UseState por tipo
  const [userform, setUserform] = useState({
    username: "",
    old_password: "",
    new_password: "",
  });
  const [tutorform, setTutorform] = useState({});

  // Fetchs de información
  async function isPrivate() {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const data = await fetch(
        `https://3001-manueldlcasenci-pekefun-p4270miz633.ws-eu93.gitpod.io/api/protected`,
        requestOptions
      );
      setProtect(data.status);
      let response = await data.json();
      setUsername(response.logged_in_as);
    } catch (error) {
      let details = { Error: error };
      console.log("Error en fetch private", details);
    }
  }

  async function getUserInfo() {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const params = new URLSearchParams({ username: username });
      const data = await fetch(
        `https://3001-manueldlcasenci-pekefun-p4270miz633.ws-eu93.gitpod.io/api/signup/info?${params.toString()}`,
        requestOptions
      );
      const response = await data.json();
      setInfo(response.info), setUserform({ ...userform, username: username });
    } catch (error) {
      let details = { Username: "test", Error: error };
      console.log("Error en fetch user", details);
    }
  }

  async function getInfoTutor() {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const params = new URLSearchParams({ username: username });
      const data = await fetch(
        `https://3001-manueldlcasenci-pekefun-p4270miz633.ws-eu93.gitpod.io/api/signup/tutor?${params.toString()}`,
        requestOptions
      );
      const response = await data.json();
      return (
        setInfotutor(response.msg),
        setInfochild(response.kids),
        setTutorform({ ...tutorform, username: username })
      );
    } catch (error) {
      let details = { Username: username, Error: error };
      console.log("Error en fetch user", details);
    }
  }

  useEffect(() => {
    isPrivate();
  }, []);

  if (username != undefined && info == undefined) getUserInfo();
  if (info != undefined && infotutor == undefined) getInfoTutor();

  //Comprobación de logeo (zona privada)
  if (protect != undefined && protect != 200) {
    return <Navigate to="/" />;
  }

  //Variables para tabs
  let tutor = () => {
    if (info != undefined) {
      if (info.tutor == true)
        return (
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Tutor
          </button>
        );
    }
  };

  let advertiser = () => {
    if (info != undefined) {
      if (info.advertiser == true)
        return (
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Anunciante
          </button>
        );
    }
  };

  //Variables para contenido
  function useristutor() {
    if (info != undefined) {
      if (info.tutor == false) {
        return <button className="btn btn-primary mx-1">Ser tutor</button>;
      }
    }
  }

  function userisadvertiser() {
    if (info != undefined) {
      if (info.advertiser == false) {
        return <button className="btn btn-primary mx-1">Ser anunciante</button>;
      }
    }
  }

  let contentuser = (
    <form>
      <div className="mb-3">
        <label htmlFor="useroldpassword" className="form-label">
          Contraseña antigua
        </label>
        <input
          type="password"
          className="form-control"
          id="useroldpassword"
          aria-describedby="emailHelp"
          onChange={handleoldpassword}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="usernewpassword" className="form-label">
          Nueva contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="usernewpassword"
          onChange={handlenewpassword}
        />
      </div>
      <div className="container form-text" id="userhelper"></div>
      <div className="container d-inline-flex justify-content-between">
        <button
          type="submit"
          className="btn btn-primary mx-1"
          onClick={usersubmit}
        >
          Cambiar contraseña
        </button>
        <div className="text-end">
          {useristutor()}
          {userisadvertiser()}
          <button className="btn btn-danger mx-1">Eliminar cuenta</button>
        </div>
      </div>
    </form>
  );

  function showkidsname() {
    console.log("infochild", infochild);
    let kids_names = "";
    kids_names = infochild.map((e) => (
      <p className="tutorkid" key={e.id}>
        {e.name} {e.lastname}
      </p>
    ));

    return kids_names;
  }

  let contenttutor = (
    <form>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Nombre
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          aria-describedby="emailHelp"
          onChange={handleoldpassword}
          placeholder={infotutor != undefined ? infotutor.name : ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="usernewpassword" className="form-label">
          Apellidos
        </label>
        <input
          type="string"
          className="form-control"
          id="usernewpassword"
          onChange={handlenewpassword}
          placeholder={infotutor != undefined ? infotutor.lastname : ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="usernewpassword" className="form-label">
          Ubicación
        </label>
        <input
          type="string"
          className="form-control"
          id="usernewpassword"
          onChange={handlenewpassword}
          placeholder={infotutor != undefined ? infotutor.location : ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="usernewpassword" className="form-label">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          className="form-control"
          id="usernewpassword"
          onChange={handlenewpassword}
          placeholder={infotutor != undefined ? infotutor.birth : ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="usernewpassword" className="form-label">
          Avatar
        </label>
        <input
          type="string"
          className="form-control"
          id="usernewpassword"
          onChange={handlenewpassword}
          placeholder={infotutor != undefined ? infotutor.avatar : ""}
        />
      </div>
      <label htmlFor="showkidtutor" className="form-label">
        Hijos/as
      </label>
      <div className="container d-flex flex-column" id="showkidtutor">
        {infochild != undefined ? showkidsname() : ""}
      </div>
      <div className="container form-text" id="userhelper"></div>
      <div className="container d-inline-flex justify-content-between">
        <button
          type="submit"
          className="btn btn-primary mx-1"
          onClick={usersubmit}
        >
          Cambiar datos
        </button>
        <div className="text-end">
          {useristutor()}
          {userisadvertiser()}
        </div>
      </div>
    </form>
  );

  //Funciones de gestión de botones usuario
  function handleoldpassword(e) {
    setUserform({ ...userform, old_password: e.target.value });
  }

  function handlenewpassword(e) {
    setUserform({ ...userform, new_password: e.target.value });
  }

  function usersubmit(e) {
    e.preventDefault();
    useroldpassword.value = "";
    usernewpassword.value = "";
    //Llamar función del flux. Parametro = userform
    //Si status 200
    userhelper.innerHTML = "<p>¡Contraseña actualizada!</p>";
  }

  return (
    <div className="container-fluid justify-content-center no-nav mb-2">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Usuario
          </button>
          {tutor()}
          {advertiser()}
        </div>
      </nav>
      {/* Contenido tabs */}
      <div className="tab-content inner" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex="0"
        >
          <div className="container-fluid py-2">
            <h4>
              Bienvenido, {info != undefined ? info.email : "Desconocido"}.
              ¿Quieres cambiar tu contraseña?
            </h4>
            {contentuser}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabIndex="0"
        >
          <div className="container-fluid py-2">
            <h4>
              Bienvenido, {info != undefined ? info.email : "Desconocido"}.
              ¿Quieres cambiar tus datos como tutor?
            </h4>
            {contenttutor}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
          tabIndex="0"
        >
          Tab 2
        </div>
      </div>
    </div>
  );
};
