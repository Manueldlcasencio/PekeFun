import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PekeFun from "../../img/fondo.png";
import "../../styles/home.css";
import {Social_media} from "../component/social_media.jsx"
import { Cards_activities } from "../component/cards_activities";
//import { Create_event_form } from "../component/create_event_form";


export const Home = () => {
	const { store, actions } = useContext(Context);

	//Para limpiar "selected category" y que se muestren todas las cards:
    useEffect(() => {
        actions.clearFilteredEvents();
    }, []);

	return (
		<div className="text-center mt-5">
			<h1></h1>
			<p>
				<img src={PekeFun} />
			</p>

		<Cards_activities />

		{/*<Create_event_form />
		<button className="btn btn-secondary" type="button" onClick={() => actions.getTutorData()}> 
          recuperar info del tutor
        </button> */}

		<Social_media />

		</div>
	);
};
