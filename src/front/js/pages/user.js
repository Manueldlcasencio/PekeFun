import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {Create_event_form} from "../component/create_event_form.js"


export const User = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
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
                        <h1>Anunciante</h1>
                    </button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                    <h2>contenido del usuario</h2>
                </div>
                <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                    <h2>contenido del tutor</h2>
                    <Create_event_form />
                </div>
                <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                    <h2>Contenido del anunciante</h2>
                </div>
            </div>
        </div>
    );
};