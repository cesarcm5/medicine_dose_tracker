import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import pill from "../../../../assets/medicine.png"

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const handleLogout = () => {
		actions.logout();
		navigate("/");
	};
	return (
		<nav id="navbar" className="navbar">
			<div className="flex">
				<div className="flex">
					<div>
						<img id="pill" src={pill} />
					</div>
					<div className="pt-7">
						<p id="name">PillCheck</p>
					</div>
					<div className="pl-auto">
						<button onClick={handleLogout}>Log out</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
