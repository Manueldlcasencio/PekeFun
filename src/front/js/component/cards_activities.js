import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import '../../styles/cards_activities.css';

export const Cards_activities = ({ event_id, name, description, date, length, category, slots, min_age, max_age, contact, cloth, others }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    let events;

    if (Array.isArray(store.events_filtered) && store.events_filtered.length > 0) {
        events = store.events_filtered;
    } else {
        events = store.events;
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
                {events.slice(0, 12).map((event, index) => (
                    <div key={index} className="col">
                        <div className="card h-100">
                            <img src={event.image} className="card-img-top" alt="..." />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{event.name}</h5>
                                <p className="card-text">{event.description.slice(0, 100)}...</p>
                                <div className="mt-auto d-flex justify-content-between">
                                    <button className="btn btn-secondary"
                                        onClick={() => {
                                            console.log('Evento a seleccionar:', { id: event.event_id, name: event.name, description: event.description, date: event.date, length: event.length, category: event.category, slots: event.slots, min_age: event.min_age, max_age: event.max_age, contact: event.contact, cloth: event.cloth, others: event.others, });
                                            actions.selectEvent({ id: event.event_id, name: event.name, description: event.description, date: event.date, length: event.length, category: event.category, slots: event.slots, min_age: event.min_age, max_age: event.max_age, contact: event.contact, cloth: event.cloth, others: event.others, });
                                            navigate(`/event/${event.event_id}`);
                                        }}>
                                        Saber Más
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
