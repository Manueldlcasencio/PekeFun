import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PekeFun from "../../img/fondo.png";
import "../../styles/home.css";
import { Social_media } from "../component/social_media.jsx";
import { Cards_activities } from "../component/cards_activities";
import { Categories } from "../component/categories.js";
import { Create_event_form } from "../component/create_event_form.js";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const username = localStorage.getItem("username");

    useEffect(() => {
        actions.clearFilteredEvents();
    }, []);

    const handleModifyChild = () => {
		const childToUpdateId = 1; // Cambiar esto al ID del niño que desea actualizar
		const childToUpdate = store.tutorData.children.find(child => child.id === childToUpdateId);
	  
		if (childToUpdate) {
		  const updatedChildData = {
			...childToUpdate,
			name: "holi",
			lastname: "holita"
		  };
	  
		  actions.modifyChild(username, updatedChildData);
		} else {
		  console.log("Child not found");
		}
	  };

	return (
		<div className="text-center mt-5">
			<h1></h1>
			<p>
				<img src={PekeFun} className="responsive-image" />
			</p>
			<button className="btn btn-danger" onClick={() => actions.deleteUser(username, "test")}>PRUEBA ELIMINAR USUARIO</button>
			<button className="btn btn-danger" onClick={() => actions.changePassword(username, "teste", "nueva contrasena")}>PRUEBA CAMBIAR CONTRASEÑA</button>
			<button className="btn btn-danger" onClick={handleModifyChild}>PRUEBA MODIFICAR DATOS NIÑO</button>
			
		<Cards_activities />
		<Categories />

	{/*<Create_event_form />*/}
		{/*<button className="btn btn-secondary" type="button" onClick={() => actions.getTutorData()}> 
          recuperar info del tutor
        </button> */}

	
		<Social_media />

		</div>
	);
};
