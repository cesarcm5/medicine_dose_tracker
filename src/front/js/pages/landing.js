import React, { useContext, useState } from "react";

import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Landing = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({ name: "", dosage: "", frequency: "" });
    const [medicines, setMedicines] = useState([]); // ← for the list

    const [showForm, setShowForm] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMedicine = await actions.RegisterMedicine(
            formData.name,
            formData.dosage,
            formData.frequency,
            store.user?.id
        );
        if (newMedicine) {
            setMedicines([...medicines, newMedicine]);
        }
        setFormData({ name: "", dosage: "", frequency: "" });
        setShowForm(false);
    };

    return (
        <div className="">
            <Navbar />
            {/* Button to show/hide form */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-500 text-white px-4 py-2 mt-12 ml-15 rounded-md shadow-md hover:bg-green-600 transition"
            >
                {showForm ? "Cancel" : "Add Medication"} +
            </button>


            {/* Conditional rendering of form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-md shadow-md bg-white">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Medicine Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-2"
                        required
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Dosage</label>
                    <input
                        type="text"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-2"
                        placeholder="e.g. 500mg"
                        required
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Frequency</label>
                    <input
                        type="text"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-4"
                        placeholder="e.g. Twice a day"
                        required
                    />

                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
                        Save Medication
                    </button>
                </form>
            )}

        </div>
    );
};
