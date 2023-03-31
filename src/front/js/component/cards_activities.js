import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Cards_activities = () => {
    const { store, actions } = useContext(Context);
    const events = store.events;

    const handleFavoriteClick = (event) => {
        actions.addFavorite(event);
    };

    

    return (
        <div className="row row-cols-1 row-cols-md-6 g-12">
            {events./*slice(0, 12).*/map((event, index) => (
                <div key={index} className="col">
                    <div className="card m-1 p-1">
                        <img src={event.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{event.name}</h5>
                            <p className="card-text">{event.description.slice(0, 100)}...</p>
                            <div className="d-flex justify-content-between">
                                <Link to={`/event/${event.id}`} className="btn btn-primary">
                                    Saber Más
                                </Link>

                                <button type="button" className="btn btn-outline-danger" onClick={() => handleFavoriteClick(event)}>
                                    <i className="bi bi-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};