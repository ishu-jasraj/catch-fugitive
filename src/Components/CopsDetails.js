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
    const navigate = useNavigate();

    const openModal = (cop) => {
        setCurrentCop(cop);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleDone = (copId) => {
        setModal(false);
        updateCopInfo(copId, { selected: true });
    };

    const allSelected = copInfo.every(cop => cop.selected);

    const handleNext = () => {
        navigate('/result');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-blue-900 to-black p-8 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">All Cops</h2>
            <div className="flex justify-around items-center flex-nowrap space-x-4 w-full max-w-screen-xl overflow-x-auto">
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
            <div className="mt-8 flex justify-center w-full">
                <button
                    onClick={handleNext}
                    className={`bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105 ${allSelected ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!allSelected}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CopDetails;
