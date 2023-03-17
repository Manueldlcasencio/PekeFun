import React from "react";
import { Link } from "react-router-dom";
import { Modal_login_signup } from "./modal_login_signup.js";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<Modal_login_signup />

			</div>
		</nav>
	);
};
