import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    function onStartGame() {
        navigate('/cops')
    }

    return (
        <div>
            <button onClick={onStartGame}>Start Game</button>
        </div>
    );
}

export default Home