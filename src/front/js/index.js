import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/index.css";
import Layout from "./layout";

ReactDOM.render(
  <>
    <ToastContainer />
    <Layout />
  </>,
  document.querySelector("#app")
);

