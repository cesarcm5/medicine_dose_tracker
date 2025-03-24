// src/front/js/component/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./store/appContext";

const PrivateRoute = ({ children }) => {
	const { store } = useContext(Context);

	const token = localStorage.getItem("token");
	const isAuthenticated = store.token && token && token !== "null" && token !== "undefined";

	return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;