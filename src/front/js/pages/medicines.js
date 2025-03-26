import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";

export const Medicines = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getMedicines()
        console.log("Medicines loaded:", store.medicines);
    }, [])


    return (
        <div>
            <Navbar />
            <div className="medicines-container">
                <h1 className="text-2xl font-bold text-center mt-5">Your Medicines</h1>
                <div className="medicines-list mt-5">
                    {store.medicines && store.medicines.length > 0 ? (
                        store.medicines.map((medicine, index) => (
                            <div key={index} className="medicine-item border p-4 rounded-lg mb-4">
                                <h2 className="text-xl font-semibold">{medicine.name}</h2>
                                <p>Dosage: {medicine.dosage} mg</p>
                                <p>Frequency: {medicine.frequency} times/day</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No medicines found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}  