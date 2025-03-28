import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom'
import { Landing } from "./landing"
import Pill from "../../../../assets/medicine.png"
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
        navigate("/home");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token !== "null" && token !== "undefined") {
            navigate("/home");
        }
    }, [store.token, navigate]);

    return (
        <div>
            <div id="login" className="w-35/100 justify-self-center mt-15">
                <div className="justify-items-center">
                    <img id="pill" src={Pill} />
                </div>
                <div>
                    <p id="login_text" className="text-center text-3xl">Log In</p>
                </div>
                <form onSubmit={handleSubmit} id="credentials" className="pl-32 flex flex-col gap-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        className="text-white color-none w-2/3 border border-solid rounded-lg outline-none p-2"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        className="text-white color-none w-2/3 border border-solid rounded-lg outline-none p-2 mt-2"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        className="text-white color-none w-2/3 border border-solid rounded-lg outline-none mt-2 p-2"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        className="text-white color-none  w-2/3 border border-solid outline-none mt-2 rounded-lg p-2"
                        onChange={handleChange}
                    />
                    <p className="text-sm text-white font-thin">Must contain at least 8 characters</p>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        placeholder="Confirm Password"
                        className="text-white color-none w-2/3 border border-solid outline-none rounded-lg p-2"
                        onChange={handleChange}
                    />
                    <div className="mt-10 flex mb-10 gap-x-10 text-white">
                        <button type="submit" className="border-b text-green-300">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};