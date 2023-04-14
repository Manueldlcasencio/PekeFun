import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/cards_activities.css";
import "../../styles/index.css";

export const Cards_activities = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    let events;

    if (Array.isArray(store.events_filtered) && store.events_filtered.length > 0) {
        events = store.events_filtered;
    } else {
        events = store.events;
    }

    const chunkArray = (arr, chunkSize) => {
        const results = [];
        while (arr.length) {
            results.push(arr.splice(0, chunkSize));
        }
        return results;
    };

    const eventChunks = chunkArray(events.slice(0, 12), 5);

    return (
        <div className="container">
            <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    {eventChunks.map((chunk, chunkIndex) => (
                        <div
                            className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}
                            key={chunkIndex}
                        >
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                                {chunk.map((event, index) => (
                                    <div key={index} className="col">
                                        <div className="card h-100">
                                            <img
                                                src={event.image}
                                                className="card-img-top"
                                                alt="..."
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{event.name}</h5>
                                                <p className="card-text">
                                                    {event.description.slice(0, 100)}...
                                                </p>
                                                <div className="mt-auto d-flex justify-content-between">
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            actions.selectEvent({
                                                                id: event.event_id,
                                                                name: event.name,
                                                                description: event.description,
                                                                date: event.date,
                                                                length: event.length,
                                                                category: event.category,
                                                                slots: event.slots,
                                                                min_age: event.min_age,
                                                                max_age: event.max_age,
                                                                image: event.image,
                                                                contact: event.contact,
                                                                cloth: event.cloth,
                                                                others: event.others,
                                                            });
                                                            navigate(`/event/${event.event_id}`);
                                                        }}
                                                        style={{ backgroundColor: "#f9643f" }}
                                                    >
                                                        Saber Más
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev custom-carousel-control"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon custom-carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next custom-carousel-control"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon custom-carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
        </div>
    );
};
