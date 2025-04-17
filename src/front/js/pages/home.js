import React, { useContext, useEffect, useState } from "react";
import Pill from "../../../../assets/medicine.png"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
export const Home = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState({})

	const navigate = useNavigate();

	const [login, setLogin] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (store.token && token && token !== "null" && token !== "undefined") {
			navigate("/home");
		}
	}, [store.token, navigate]);

	return (
		<div>
			<div id="login" className="w-90/100 md:w-35/100 justify-self-center mt-40">
				<div className="justify-items-center">
					<img id="pill" src={Pill} />
				</div>
				<div>
					<p id="login_text" className="text-center text-3xl">Log In</p>
				</div>
				<form id="credentials" className="md:pl-32 mt-15 grid grid-cols-1 md:flex md:flex-col md:justify-items-center">
					<input
						type="text"
						name="name"
						placeholder="email"
						className="text-white color-none md:w-2/3 border border-solid rounded-lg outline-none p-2"
						onChange={(event) => setUser({ ...user, email: event.target.value })}
					/>
					<input
						type="password"
						name="name"
						placeholder="password"
						className="text-white color-none mt-10 md:w-2/3 border border-solid outline-none rounded-lg p-2"
						onChange={(event) => setUser({ ...user, password: event.target.value })}
					/>
					<div id="access-control" className="mt-10 flex mb-10 md:gap-x-10 text-white">
						<div className="">
							<p className="">Don't have an acount?</p>
							<Link to="signin" className="text-green-300 border-b pb-2">Sign up</Link>
						</div>
						<button
							onClick={async (event) => {
								event.preventDefault();
								const success = await actions.logIn(user.email, user.password);
								if (success) {
									navigate("/landing");
								}
							}}
							className="border-b text-green-300"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}