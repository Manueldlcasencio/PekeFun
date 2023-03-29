import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';


export const FavoritesDropdown = () => {
    const { store, actions } = useContext(Context);
    const favorites = store.favorites;

    console.log(favorites);

    return (
        <div className="dropdown dropstart">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Favorites
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">{favorites.length}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" style={{ backgroundColor: "#feb823" }}>

                {favorites.length === 0 ? (
                    <li><a className="dropdown-item">No favorites selected</a></li>
                ) : (
                    favorites.map((item) => (
                        <li className="d-flex align-items-center" key={item.id}>
                            <a className="dropdown-item">{item.name}</a>
                            <button type="button" className="btn btn-outline-warning" onClick={() => actions.deleteFavorite(item, favorites)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};