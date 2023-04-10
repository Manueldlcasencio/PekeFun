import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import "../../styles/user.css";

export const User = () => {
  const { store } = useContext(Context);
  const ref = useRef();
  const [protect, setProtect] = useState();
  const [username, setUsername] = useState();
  const [info, setInfo] = useState();
  const [infotutor, setInfotutor] = useState();
  const [infochild, setInfochild] = useState();
  const [childselect, setChildselect] = useState();
  const [infoanunciante, setInfoanunciante] = useState();
  const [infoevent, setInfoevent] = useState();

  //UseState por tipo
  const [userform, setUserform] = useState({
    username: "",
    old_password: "",
    new_password: "",
  });
  const [tutorform, setTutorform] = useState({});
  const [childformsend, setChildformsend] = useState();
  const [adverform, setAdverform] = useState({});

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

  async function getInfoAnunciante() {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const params = new URLSearchParams({ username: username });
      const data = await fetch(
        `https://3001-manueldlcasenci-pekefun-p4270miz633.ws-eu93.gitpod.io/api/signup/advertiser?${params.toString()}`,
        requestOptions
      );
      const response = await data.json();
      return (
        setInfoanunciante(response.info),
        setInfoevent(response.events),
        setAdverform({
          ...adverform,
          name: response.info.name,
          lastname: response.info.lastname,
          contact: response.info.contact,
          company: response.info.contact,
          company: response.info.contact,
          company: response.info.company,
          working_since: response.info.working_since,
          description: response.info.description,
          twitter: response.info.twitter,
          avatar: response.info.avatar,
          company_image: response.info.company_image,
          others: response.info.others,
        })
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
  if (info != undefined && infoanunciante == undefined) getInfoAnunciante();

  console.log("Niños", infochild);

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
            id="nav-advertiser-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-advertiser"
            type="button"
            role="tab"
            aria-controls="nav-advertiser"
            aria-selected="false"
          >
            Anunciante
          </button>
        );
    }
  };

  let child = () => {
    if (info != undefined) {
      if (info.tutor == true)
        return (
          <button
            className="nav-link"
            id="nav-child-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-child"
            type="button"
            role="tab"
            aria-controls="nav-child"
            aria-selected="false"
          >
            Hijos/as
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

  function generatechild() {
    let kids_on_select = "";
    kids_on_select = infochild.map((e, index) => (
      <option value={index} key={e.id}>
        {e.name} {e.lastname}
      </option>
    ));
    return kids_on_select;
  }

  let childform = (
    <form>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Nombre
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          objkey="name"
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].name
              : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Apellidos
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          objkey="lastname"
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].lastname
              : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Fecha de Nacimiento
        </label>
        <input
          type="string"
          className="form-control"
          id="childbirth"
          objkey="birth"
          ref={ref}
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].birth
              : ""
          }
          onFocus={
            childselect != undefined && childselect != 99
              ? () => (ref.current.type = "date")
              : () => <h2></h2>
          }
          onBlur={
            childselect != undefined && childselect != 99
              ? () => (ref.current.type = "text")
              : () => <h2></h2>
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Preferencias
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          objkey="preferences"
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].preferences
              : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Avatar
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          objkey="avatar"
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].avatar
              : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Escuela/Instituto
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          objkey="school"
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].school
              : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Otros
        </label>
        <input
          type="string"
          className="form-control"
          id="tutorname"
          objkey="others"
          aria-describedby="emailHelp"
          onChange={handlechildform}
          placeholder={
            childselect != undefined && childselect != 99
              ? infochild[childselect].others
              : ""
          }
        />
        <div className="container form-text" id="childotherhelper">
          Ponga aquí datos como alergias, intolerancias u otros que los
          responsables del evento deban conocer.
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mx-1"
        onClick={usersubmit}
      >
        Cambiar datos
      </button>
      <button
        type="submit"
        className="btn btn-primary mx-1"
        onClick={usersubmit}
      >
        Eliminar
      </button>
    </form>
  );

  let contentchild = (
    <div>
      <select
        className="form-select my-1"
        aria-label="Default select example"
        id="childselect"
        onChange={handleselect}
      >
        <option defaultValue value="99">
          Elige cual quieres modificar
        </option>
        {infochild != undefined ? generatechild() : ""}
      </select>
      <button type="button" className="btn btn-success my-2">
        Añadir
      </button>
      {childselect != undefined && childselect != 99 ? childform : ""}
    </div>
  );

  let contentanunciante = (
    <form>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Nombre
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="name"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={infoanunciante != undefined ? infoanunciante.name : ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Apellidos
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="lastname"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.lastname : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Contacto
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="contact"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.contact : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Organiza como
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="company"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.company : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          En activo desde
        </label>
        <input
          type="date"
          className="form-control"
          id="anunciantename"
          ref={ref}
          objkey="working_since"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.working_since : ""
          }
          onFocus={
            infoanunciante != undefined
              ? () => (ref.current.type = "date")
              : () => <h2></h2>
          }
          onBlur={
            infoanunciante != undefined
              ? () => (ref.current.type = "text")
              : () => <h2></h2>
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Descripción propia/de la organización
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="description"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.description : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Twitter
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="twitter"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.twitter : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Avatar
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="avatar"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={infoanunciante != undefined ? infoanunciante.avatar : ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Imagen de la organización
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="company_image"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={
            infoanunciante != undefined ? infoanunciante.company_image : ""
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tutorname" className="form-label">
          Otros
        </label>
        <input
          type="string"
          className="form-control"
          id="anunciantename"
          objkey="others"
          aria-describedby="emailHelp"
          onChange={handleadverform}
          placeholder={infoanunciante != undefined ? infoanunciante.others : ""}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mx-1"
        onClick={usersubmit}
      >
        Cambiar datos
      </button>
    </form>
  );

  //Funciones de gestión de botones
  function usersubmit(e) {
    e.preventDefault();
    useroldpassword.value = "";
    usernewpassword.value = "";
    //Llamar función del flux. Parametro = userform
    //Si status 200
    userhelper.innerHTML = "<p>¡Contraseña actualizada!</p>";
  }

  function handleselect(e) {
    setChildselect(e.target.value);
    if (e.target.value != 99)
      setChildformsend({
        name: infochild[e.target.value].name,
        lastname: infochild[e.target.value].lastname,
        birth: infochild[e.target.value].birth,
        preferences: infochild[e.target.value].preferences,
        avatar: infochild[e.target.value].avatar,
        school: infochild[e.target.value].school,
        others: infochild[e.target.value].others,
      });
  }

  //Gestión de cambios
  function handlechildform(e) {
    setChildformsend({
      ...childformsend,
      [e.target.getAttribute("objkey")]: e.target.value,
    });
  }

  function handleadverform(e) {
    setAdverform({
      ...adverform,
      [e.target.getAttribute("objkey")]: e.target.value,
    });
  }

  function handleoldpassword(e) {
    setUserform({ ...userform, old_password: e.target.value });
  }

  function handlenewpassword(e) {
    setUserform({ ...userform, new_password: e.target.value });
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
          {child()}
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
          id="nav-child"
          role="tabpanel"
          aria-labelledby="nav-child-tab"
          tabIndex="0"
        >
          <div className="container-fluid py-2">
            <h4>
              Bienvenido, {info != undefined ? info.email : "Desconocido"}.
              ¿Quieres cambiar los datos de tus hijos/as?
            </h4>
            {contentchild}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-advertiser"
          role="tabpanel"
          aria-labelledby="nav-advertiser-tab"
          tabIndex="0"
        >
          <div className="container-fluid py-2">
            <h4>
              Bienvenido, {info != undefined ? info.email : "Desconocido"}.
              ¿Quieres cambiar tus datos de anunciante?
            </h4>
            {contentanunciante}
          </div>
        </div>
      </div>
    </div>
  );
};
