import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            toast.error("The passwords are not the same");
            return;
        }

        await actions.signIn(formData.firstName, formData.lastName, formData.email, formData.password);
        navigate("/landing");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token !== "null" && token !== "undefined") {
            navigate("/landing");
        }
    }, [store.token, navigate]);

    return (
        <div className="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-solid rounded-lg outline-none"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-solid rounded-lg outline-none"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-solid rounded-lg outline-none"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-solid rounded-lg outline-none"
                />
                <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-solid rounded-lg outline-none"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
                    Sign Up
                </button>
            </form>
        </div>
    );
};