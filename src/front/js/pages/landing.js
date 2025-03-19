import React, { useContext, useState } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Landing = () => {
    const { store, actions } = useContext(Context);

    const [showForm, setShowForm] = useState(false);
    const [medicine, setMedicine] = useState({
        name: "",
        dosage: "",
        frequency: "",
    });

    const handleChange = (e) => {
        setMedicine({ ...medicine, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Medicine Added:", medicine);
        setMedicine({ name: "", dosage: "", frequency: "" }); // Reset form
        setShowForm(false); // Hide form after submission
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
                        value={medicine.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-2"
                        required
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Dosage</label>
                    <input
                        type="text"
                        name="dosage"
                        value={medicine.dosage}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-2"
                        placeholder="e.g. 500mg"
                        required
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Frequency</label>
                    <input
                        type="text"
                        name="frequency"
                        value={medicine.frequency}
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
