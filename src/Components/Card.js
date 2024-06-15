import React from 'react';

// function Card({ src, alt, onClick }) {
//     return <img src={src} alt={alt} className='w-60 h-60' onClick={onClick} />
// }

const Card = ({ src, alt, onClick }) => (
    <div onClick={onClick} className="cursor-pointer">
        <img src={src} alt={alt} className="h-40 w-40" />
    </div>
);


export default Card