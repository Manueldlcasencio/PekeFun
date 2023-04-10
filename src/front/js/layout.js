import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Contacto } from "./component/contacto";
import { Categories } from "./component/categories";
import { Events_more_info } from "./pages/events_more_info.js";
import {User} from "./pages/user.jsx";
import { Cards_activities } from "./component/cards_activities.js";




//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<Categories />} path="/categories" />
                        <Route element={<User />} path="/user" />
                        <Route element={<Events_more_info />} path="/event/:theid" />
                        <Route element={<Cards_activities />} path="/categories/cards" /> 
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>

        </div>
    );

};



export default injectContext(Layout);

