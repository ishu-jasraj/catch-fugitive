import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    function onStartGame() {
        navigate('/cops');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-blue-900 to-black">
            <h1 className="mb-8 text-5xl font-extrabold text-white drop-shadow-lg animate-pulse">Catch Fugitive</h1>
            <button
                onClick={onStartGame}
                className="px-10 py-5 text-2xl text-white bg-blue-600 rounded-full hover:bg-blue-800 cursor-pointer shadow-lg transform transition-transform duration-300 hover:scale-110"
            >
                Start Game
            </button>
        </div>
    );
}

export default Home;
