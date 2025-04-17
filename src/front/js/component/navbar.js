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
		<nav id="navbar" className="h-35 flex md:grid md:grid-rows-2">
			<div className="flex pt-8 md:pt-1">
				<div>
					<img id="pill" src={pill} />
				</div>
				<div className="pt-6 md:pt-7">
					<Link to="/home" id="name">PillCheck</Link>
				</div>
			</div>
			<div id="control" className="md:flex md:justify-end md:items-center md:mb-18 md:mx-10">
				<div className="md:mr-50 ml-2 md:border-b md:border-white md:p-5">
					<Link to="/medicines" className="text-white md:text-xl">Medicines</Link>
				</div>
				<div id="logout" className="">
					<button id="logout-button" className="text-white" onClick={handleLogout}>Log out</button>
				</div>
			</div>
		</nav>
	);
};
