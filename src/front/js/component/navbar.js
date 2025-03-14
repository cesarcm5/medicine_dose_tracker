import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import pill from "../../../../assets/medicine.png"

export const Navbar = () => {
	return (
		<nav id="navbar" className="navbar">
			<div className="flex">
				<div className="flex">
					<div>
						<img id="pill" src={pill}/>
					</div>
					<div className="pt-7">
						<p id="name">PillCheck</p>
					</div>
				</div>
			</div>
		</nav>
	);
};
