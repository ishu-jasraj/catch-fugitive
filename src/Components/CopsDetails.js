import React, { useState, useContext } from "react";
import SingleCop from "./SingleCop";
import CopModal from "./CopModal";
import { CopContext } from '../store/CopContext';
import { CityVehicleContext } from '../store/CityVehicleContext';
import { useNavigate } from 'react-router-dom';

const CopDetails = () => {
    const [isModalOpen, setModal] = useState(false);
    const [currentCop, setCurrentCop] = useState(null);
    const { copInfo, updateCopInfo } = useContext(CopContext);
    const { cities, vehicles, updateCities, updateVehicles } = useContext(CityVehicleContext);
    const navigate = useNavigate()


    const openModal = (cop) => {
        setCurrentCop(cop);
        setModal(true);
    }
    console.log("all the cops info", copInfo);
    const closeModal = () => {
        setModal(false);
    }

    const handleDone = (copId) => {
        setModal(false);
        updateCopInfo(copId, { selected: true });
    };

    const allSelected = copInfo.every(cop => cop.selected);

    const handleNext = () => {
        navigate('/result');
    };

    return (
        <>
            <h2>All Cops</h2>
            <div className="flex justify-around items-center">
                {copInfo.map((cop) => (
                    <SingleCop key={cop.id} cop={cop} onClick={cop.selected ? null : () => openModal(cop.id)} />
                ))}
            </div>
            {isModalOpen && (
                <CopModal
                    cop={currentCop}
                    oncloseModal={closeModal}
                    updateCopInfo={updateCopInfo}
                    cities={cities}
                    vehicles={vehicles}
                    updateCities={updateCities}
                    updateVehicles={updateVehicles}
                    onDone={handleDone}
                />
            )}
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={handleNext}
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${allSelected ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!allSelected}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default CopDetails;
