import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Create_event_form } from "../component/create_event_form.js";
import Anunciante from "../component/create_ad_form";
import Usuario from "../component/create_user";
import Tutor from "../component/create_tutoryniños";



export const User_profile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="p-3">
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
                    
                        <div className="container white-container ">
                            

                            <Usuario />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                        <div className="container white-container">
                        <div className="container">

                            <Tutor />
                            </div>
                        </div>

                    </div>
                        <div className="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                        <div className="container white-container">

                            <Anunciante />
                        </div>

                    </div>
                    <div className="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab5-tab">
                        <div className="container white-container">
                            <h2>Crear Evento</h2>
                            <Create_event_form />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
