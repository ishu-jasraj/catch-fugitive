import React, { useContext } from "react";
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
    console.log("Cop information:", copInfo);

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
        <div className="min-h-screen bg-gradient-to-r from-black via-blue-900 to-black p-8 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">Results</h2>
            {winner ? (
                <>
                    <p key={winner.id} className="text-2xl mb-4">Congratulations! The fugitive was captured in {winner.city} by Cop {winner.id}.</p>
                    <div className="flex space-x-4">
                        <img src={winner.image} alt={`Cop ${winner.id}`} className="h-80 w-80 rounded-lg shadow-lg" />
                        <img src={thief} alt="Thief" className="h-80 w-80 rounded-lg shadow-lg" />
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold mb-4 text-center">Unfortunately, the fugitive managed to escape.</p>
                    <p className="text-xl font-light mb-4 text-center">Better luck next time!</p>
                    <img src={thief} alt="Thief" className="h-80 w-80 rounded-lg shadow-lg mt-4" />
                </div>
            )}
            <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-110 mt-8"
            >
                Restart
            </button>
        </div>
    );
}

export default Results;
