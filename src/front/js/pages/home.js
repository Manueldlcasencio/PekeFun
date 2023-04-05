import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PekeFun from "../../img/fondo.png";
import "../../styles/home.css";
import {Social_media} from "../component/social_media.jsx"
import { Cards_activities } from "../component/cards_activities";


export const Home = () => {
	const { store, actions } = useContext(Context);

	//Para limpiar "selected category" y que se muestren todas las cards:
    useEffect(() => {
        actions.clearFilteredEvents();
    }, []);

	return (
		<div className="text-center mt-5">
			<h1>***</h1>
			<p>
				<img src={PekeFun} />
			</p>

			{/* -INSERTO CARDS DE ACTIVIDADES EN EL HOME-
			<div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">Characters</h1>
			<div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2">
				{   people.map((e, i)=>{
                        let card = <CardPeople key= {i} id={i+1} name = {e.name} height = {e.height} birth_year = {e.birth_year} hair_color = {e.hair_color} eye_color = {e.eye_color} />
                        return card;
                    })
                }
			</div>
		</div>
			*/}

		<Cards_activities />
		<Social_media />
		</div>
	);
};
