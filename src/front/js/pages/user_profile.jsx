import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Create_event_form } from "../component/create_event_form.js";
import Anunciante from "../component/create_ad_form";
import Usuario from "../component/create.user";
import Tutor from "../component/create_tutor";
import Niños  from "../component/create_niños";


export const User_profile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container d-flex justify-content-center">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">
                        <h1>User</h1>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">
                        <h1>Tutor</h1>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">
                        <h1>Niños</h1>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">
                        <h1>Anunciante</h1>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab5-tab" data-bs-toggle="tab" data-bs-target="#tab5" type="button" role="tab" aria-controls="tab5" aria-selected="false">
                        <h1>Crear evento</h1>
                    </button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                    <h2>contenido del usuario</h2>
                    <Usuario />
                </div>
                <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                    <h2>contenido del tutor</h2>
                    <Tutor/>
                
                </div>
                <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                    <h2>Contenido de niño</h2>
                    <Niños/>
                    
                </div>
                <div className="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                    <h2>Contenido de la pestaña 4</h2>
                    <Anunciante />
                </div>
                <div className="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab5-tab">
                    <h2>Contenido de la pestaña 5</h2>
                    <Create_event_form />
                </div>
            </div>
        </div>
    );
};
