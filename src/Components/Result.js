import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CopContext } from '../store/CopContext';
import { CityVehicleContext } from '../store/CityVehicleContext';
import thief from '../thief_img/thief.png';

function getRandomValue() {
    return Math.floor(Math.random() * 5);
}

const Results = () => {
    const { copInfo, setCopInfo } = useContext(CopContext);
    const { cities, setCities, setVehicles } = useContext(CityVehicleContext);
    const navigate = useNavigate();

    let cityList = [];
    for (let i = 0; i < cities.length; i++) {
        cityList.push(cities[i].name);
    }
    console.log("dekho inhe ye nanhi si boonde", copInfo);

    let thiefCity = cityList[getRandomValue()];

    const winner = copInfo.find(cop => cop.city === thiefCity);
    const handleRestart = () => {
        // Reset copInfo
        setCopInfo(prevState =>
            prevState.map(cop => ({ ...cop, city: '', vehicle: '', selected: false }))
        );

        // Reset cities and vehicles (if necessary)
        setCities(prevState =>
            prevState.map(city => ({ ...city, selected: false }))
        );

        setVehicles(prevState =>
            prevState.map(vehicle => ({ ...vehicle, selected: false, count: vehicle.type === 'EV Bike' ? 2 : 1 }))
        );

        // Navigate back to the cop selection page
        navigate('/cops');
    };
    return (
        <div>
            <p> Result out ho gya hai bhai</p>
            {winner ? (
                <>
                    <p key={winner.id}>Bale bale te sava sava chor mil gya. {winner.city}</p>
                    <img src={winner.image} alt={`Cop ${winner.id}`} className="h-80 w-80" />
                    <img src={thief} alt="thief" className="h-80 w-80" />
                </>
            ) : (
                <p>Lo bhai sab chor bhaag gaye, koi pakda nahi.</p>
            )}
            <button
                onClick={handleRestart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
                Restart
            </button>
        </div>
    );
}

export default Results