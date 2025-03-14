import React, { useState } from "react";

export const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para manejar el registro
        console.log("Form data submitted:", formData);
    };

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
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
                    Sign Up
                </button>
            </form>
        </div>
    );
};