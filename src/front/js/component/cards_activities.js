import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Cards_activities = ({ event_id, name, description, date, length, category, slots, min_age, max_age, contact, cloth, others }) => {
    const { store, actions } = useContext(Context);
    let events;

if (Array.isArray(store.events_filtered) && store.events_filtered.length > 0) {
    events = store.events_filtered;
} else {
    events = store.events;
}


/* VER LUEGO SI LO AGREGAMOS
    const handleFavoriteClick = (event) => {
        actions.addFavorite(event);
    };*/


    return (
        <div className="row row-cols-1 row-cols-md-6 g-12 m-3">
            {events.slice(0, 12).map((event, index) => (
                <div key={index} className="col">
                    <div className="card m-1 p-1">
                        <img src="https://picsum.photos/id/501/180/120" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{event.name}</h5>
                            <p className="card-text">{event.description.slice(0, 100)}...</p>
                            <div className="d-flex justify-content-between">
                                <Link to={`/event/${event.event_id}`} className="btn btn-secondary" onClick={() => actions.selectEvent({ id: event.event_id, name: event.name, description: event.description, date: event.date, length: event.length, category: event.category, slots: event.slots, min_age: event.min_age, max_age: event.max_age, contact: event.contact, cloth: event.cloth, others: event.others })}>
                                    Saber Más
                                </Link>
                                {/*  <button type="button" className="btn btn-outline-danger" onClick={() => handleFavoriteClick(event)}>
                                    <i className="bi bi-heart"></i>
                                </button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
