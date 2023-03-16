import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

export const Modal_login_signup = () => {
    return (
        //MODAL
        <div className="container">

            <button type="button" className="btn btn-primary" style={{backgroundColor: "#f9643f"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Login / Sign Up!
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">

                <div className="modal-content" style={{backgroundColor: "#feb823"}}>

                        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Login</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Sign Up!</button>
                            </li>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end ms-auto">
                                <button type="button" className="btn-close me-md-2 m-2" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                <div className="modal-body">
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">

                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email address</label>
                                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                                </div>
                                                <div class="d-grid gap-2 col-6 mx-auto  p-2">
                                                    <button type="submit" className="btn btn-primary" style={{backgroundColor: "#f9643f"}}>Submit</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade p-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Apellido" className="form-label">Apellido</label>
                                        <input type="Apellido" className="form-control" id="apellido" placeholder="Apellido" />
                                    </div>

                                    <div class="d-grid gap-2 col-6 mx-auto p-2">
                                        <button type="submit" className="btn btn-primary" style={{backgroundColor: "#f9643f"}}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
