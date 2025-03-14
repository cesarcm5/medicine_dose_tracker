import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="back" className="">
			<div className="flex">
				<p>Add Medication</p>
				<div id="add_button" className="ml-10">
					<button id="add_medication" className="">
						<p id="plus" className="text-white">+</p>
					</button>
				</div>
			</div>
		</div>
	);
};
