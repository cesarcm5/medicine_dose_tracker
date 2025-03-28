import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Footer } from "../component/footer";
import { Navbar } from "../component/navbar";

export const Medicines = () => {
    const { store, actions } = useContext(Context);

    const handleDelete = (id) => {
        actions.DeleteMedicine(id)
    }

    useEffect(() => {
        actions.GetMedicines();
    }, []);

    return (
        <div className="">
            <Navbar />
            <h1 className="text-2xl font-bold text-center mb-4">Tus Medicamentos</h1>

            <div className="max-w-xl mx-auto space-y-4">
                {store.medicines?.length > 0 ? (
                    store.medicines.map((medicine, index) => (
                        <div key={index} className="border rounded-lg shadow p-4 bg-white">
                            <h2 className="text-xl font-semibold">{medicine.name}</h2>
                            <p>Dosage: {medicine.dosage} mg</p>
                            <p>Frequency: {medicine.frequency} veces/día</p>
                            <button onClick={() => handleDelete(medicine.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tienes medicamentos registrados.</p>
                )}
            </div>

        </div>
    );
};