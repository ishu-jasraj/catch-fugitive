import React, { useState } from 'react';

function CopModal({ cop, copInfo, oncloseModal, onDone, updateCopInfo, cities, vehicles, updateCities, updateVehicles }) {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

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
    const isValidCombination = () => {
        const remainingCops =
            copInfo.length - copInfo.filter((cop) => cop.selected).length - 1;

        const remainingCities = cities.filter(
            (city) => !city.selected && city !== selectedCity
        );
        const remainingVehicles = vehicles.filter(
            (vehicle) =>
                !vehicle.selected &&
                vehicle !== selectedVehicle &&
                vehicle.count > 0
        );

        if (
            remainingCities.length < remainingCops ||
            remainingVehicles.length < remainingCops
        ) {
            return false;
        }

        // Create a map of cities to valid vehicles
        const cityToVehicleMap = remainingCities.map((city) => ({
            city,
            vehicles: remainingVehicles.filter(
                (vehicle) => city.distance * 2 <= vehicle.range
            ),
        }));

        // Check if there are enough valid combinations
        let validCombinations = 0;
        if (validCombinations >= remainingCops) {
            return true;
        }
        for (let i = 0; i < cityToVehicleMap.length; i++) {
            if (cityToVehicleMap[i].vehicles.length > 0) {
                validCombinations++;
                if (validCombinations >= remainingCops) {
                    return true;
                }
            }
        }

        return false;
    };

    const handleDoneClick = () => {
        if (selectedCity && selectedVehicle) {
            if (selectedCity.distance * 2 <= selectedVehicle.range) {
                if (isValidCombination()) {
                    updateCopInfo(cop, {
                        city: selectedCity.name,
                        vehicle: selectedVehicle.type,
                    });
                    updateCities(selectedCity.id, { selected: true });
                    if (selectedVehicle.count - 1 === 0) {
                        updateVehicles(selectedVehicle.id, {
                            selected: true,
                            count: selectedVehicle.count - 1,
                        });
                    } else {
                        updateVehicles(selectedVehicle.id, {
                            count: selectedVehicle.count - 1,
                        });
                    }
                    onDone(cop);
                } else {
                    setDialogMessage(
                        "This selection will leave no valid combinations for the remaining cops. Please choose another city or vehicle."
                    );
                    setShowDialog(true);
                }
            } else {
                setDialogMessage(
                    "For the selected city, the range of the vehicle is not sufficient. Please choose another vehicle."
                );
                setShowDialog(true);
            }
        } else {
            setDialogMessage("Please select both a city and a vehicle.");
            setShowDialog(true);
        }
    };


    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-dark-blue bg-opacity-75 z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl z-60 max-w-8xl w-full">
                <div className='text-3xl font-bold mb-10 text-white'>Choose your mission parameters</div>
                <div className='mb-8'>
                    <div className='text-2xl font-semibold text-white mb-4'>Select a City</div>
                    <div className='flex justify-center space-x-6'>
                        {cities.map((city) => (
                            <div key={city.id} className={`cursor-pointer ${city.selected ? 'opacity-50' : ''}`} onClick={() => handleCityClick(city)}>
                                <img src={city.image} alt={`city${city.id}`} className={`h-80 w-80 object-cover rounded-lg transition-transform duration-300 ${selectedCity === city ? 'border-8 border-green-500 shadow-lg transform scale-105' : 'hover:scale-105 hover:shadow-lg'}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mb-8'>
                    <div className='text-2xl font-semibold text-white mb-4'>Select a Vehicle</div>
                    <div className='flex justify-center space-x-6'>
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className={`cursor-pointer ${vehicle.selected || vehicle.count <= 0 ? 'opacity-50' : ''}`} onClick={() => handleVehicleClick(vehicle)}>
                                <img src={vehicle.image} alt={`vehicle${vehicle.id}`} className={`h-80 w-80 object-cover rounded-lg transition-transform duration-300 ${selectedVehicle === vehicle ? 'border-8 border-blue-500 shadow-lg transform scale-105' : 'hover:scale-105 hover:shadow-lg'}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        onClick={handleDoneClick}
                        className="bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                    >
                        Done
                    </button>
                    <button
                        onClick={oncloseModal}
                        className="bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-70">
                    <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center">
                        <p className="mb-4 text-lg font-medium text-gray-800">{dialogMessage}</p>
                        <button
                            onClick={handleCloseDialog}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CopModal;
