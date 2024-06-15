// CityVehicleContext.js
import React, { createContext, useState } from 'react';
import city1 from '../city_img/city1.png';
import city2 from '../city_img/city2.png';
import city3 from '../city_img/city3.png';
import city4 from '../city_img/city4.png';
import city5 from '../city_img/city5.png';
import vehicle1 from '../vehicle_img/vehicle1.png';
import vehicle2 from '../vehicle_img/vehicle2.png';
import vehicle3 from '../vehicle_img/vehicle3.png';

export const CityVehicleContext = createContext();

export const CityVehicleProvider = ({ children }) => {
    const [cities, setCities] = useState([
        { id: 1, name: 'Yapkashnagar', distance: 60, image: city1, selected: false },
        { id: 2, name: 'Lihaspur', distance: 50, image: city2, selected: false },
        { id: 3, name: 'Narmis City', distance: 40, image: city3, selected: false },
        { id: 4, name: 'Shekharvati', distance: 30, image: city4, selected: false },
        { id: 5, name: 'Nuravgram', distance: 20, image: city5, selected: false }
    ]);

    const [vehicles, setVehicles] = useState([
        { id: 1, type: 'EV Bike', range: 60, count: 2, image: vehicle1, selected: false },
        { id: 2, type: 'EV Car', range: 100, count: 1, image: vehicle2, selected: false },
        { id: 3, type: 'EV SUV', range: 120, count: 1, image: vehicle3, selected: false }
    ]);

    const updateCities = (id, updatedInfo) => {
        setCities(prevState =>
            prevState.map(city =>
                city.id === id ? { ...city, ...updatedInfo } : city
            )
        );
    };

    const updateVehicles = (id, updatedInfo) => {
        setVehicles(prevState =>
            prevState.map(vehicle =>
                vehicle.id === id ? { ...vehicle, ...updatedInfo } : vehicle
            )
        );
    };

    return (
        <CityVehicleContext.Provider value={{ cities, vehicles, setCities, setVehicles, updateCities, updateVehicles }}>
            {children}
        </CityVehicleContext.Provider>
    );
};
