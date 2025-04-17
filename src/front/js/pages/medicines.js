import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Footer } from "../component/footer";
import { Navbar } from "../component/navbar";

export const Medicines = () => {
    const { store, actions } = useContext(Context);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [formValues, setFormValues] = useState({ name: "", dosage: "", frequency: "" });

    const handleDelete = (id) => {
        actions.DeleteMedicine(id)
    }

    const handleEdit = (medicine) => {
        setSelectedMedicine(medicine);
        setFormValues({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency
        });
        setEditModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        actions.EditMedicine(selectedMedicine.id, formValues);
        setEditModalOpen(false);
    };

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
                            <button onClick={() => handleEdit(medicine)} className="ml-2">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tienes medicamentos registrados.</p>
                )}
            </div>

            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Editar Medicina</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={formValues.name}
                                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="Dosificación"
                                value={formValues.dosage}
                                onChange={(e) => setFormValues({ ...formValues, dosage: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="Frecuencia"
                                value={formValues.frequency}
                                onChange={(e) => setFormValues({ ...formValues, frequency: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setEditModalOpen(false)} className="text-gray-600">Cancelar</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};