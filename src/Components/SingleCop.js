import React from 'react';

function SingleCop({ cop, onClick }) {
    return (
        <div onClick={onClick} className={`cursor-pointer m-4 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${cop.selected ? 'opacity-50' : ''}`}>
            <img src={cop.image} alt={`Cop ${cop.id}`} className="h-80 w-80 rounded-lg object-cover" />
            <p className="text-center mt-2 text-white font-semibold text-xl">
                <label>Cop {cop.id}</label>
            </p>
        </div>
    );
}

export default SingleCop;

