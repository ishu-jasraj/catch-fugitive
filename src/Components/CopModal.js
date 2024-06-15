import React, { useState } from 'react';

function CopModal({ cop, oncloseModal, onDone, updateCopInfo, cities, vehicles, updateCities, updateVehicles }) {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleCityClick = (city) => {
        if (!city.selected) {
            setSelectedCity(city);
        }
    };

    const handleVehicleClick = (vehicle) => {
        if (!vehicle.selected && vehicle.count > 0) {
            setSelectedVehicle(vehicle);
        }
    };

    const handleDoneClick = () => {
        if (selectedCity && selectedVehicle) {
            if (selectedCity.distance * 2 <= selectedVehicle.range) {
                updateCopInfo(cop, { city: selectedCity.name, vehicle: selectedVehicle.type });
                updateCities(selectedCity.id, { selected: true });
                if (selectedVehicle.count - 1 === 0) {
                    updateVehicles(selectedVehicle.id, { selected: true, count: selectedVehicle.count - 1 });
                } else {
                    updateVehicles(selectedVehicle.id, { count: selectedVehicle.count - 1 });
                }
                onDone(cop);
            } else {
                alert("For the selected city the range of vehicle is not sufficient please choose another vehicle.");
            }
        } else {
            alert("Please select both a city and a vehicle.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className='flex justify-center space-x-6'>
                    {cities.map((city) => (
                        <div key={city.id} className={`cursor-pointer ${city.selected ? 'opacity-50' : ''}`} onClick={() => handleCityClick(city)}>
                            <img src={city.image} alt={`city${city.id}`} />
                        </div>
                    ))}
                </div>
                <div className='mt-4 flex justify-center space-x-6'>
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className={`cursor-pointer ${vehicle.selected || vehicle.count <= 0 ? 'opacity-50' : ''}`} onClick={() => handleVehicleClick(vehicle)}>
                            <img src={vehicle.image} alt={`vehicle${vehicle.id}`} />
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleDoneClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Done
                    </button>
                    <button
                        onClick={oncloseModal}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CopModal;