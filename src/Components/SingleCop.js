import React from 'react';

function SingleCop({ cop, onClick }) {
    return (
        <div onClick={onClick} className={`cursor-pointer ${cop.selected ? 'opacity-50' : ''}`}>
            <img src={cop.image} alt={`Cop ${cop.id}`} className="h-80 w-80" />
            <p>
                <label>Cop {cop.id}</label>
            </p>
        </div>
    );
}

export default SingleCop;
