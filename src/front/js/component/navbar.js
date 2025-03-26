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
		<nav id="navbar" className="h-35 grid grid-rows-2">
			<div className="flex pt-1">
				<div>
					<img id="pill" src={pill} />
				</div>
				<div className="pt-7">
					<Link to="/home" id="name">PillCheck</Link>
				</div>
			</div>
			<div className="flex justify-end items-center mb-18 mx-10">
				<div className="mr-50 border-b border-white p-5">
					<Link to="/medicines" className="text-white text-xl">Medicines</Link>
				</div>
				<div id="logout" className="">
					<button id="logout-button" className="text-white" onClick={handleLogout}>Log out</button>
				</div>
			</div>
		</nav>
	);
};
