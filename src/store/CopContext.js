import React, { createContext, useState } from 'react';
import cop1 from '../cops_img/cop1.png';
import cop2 from '../cops_img/cop2.png';
import cop3 from '../cops_img/cop3.png';

export const CopContext = createContext();

export const CopProvider = ({ children }) => {
    const [copInfo, setCopInfo] = useState([
        { id: 1, city: '', vehicle: '', image: cop1, selected: false },
        { id: 2, city: '', vehicle: '', image: cop2, selected: false },
        { id: 3, city: '', vehicle: '', image: cop3, selected: false }
    ]);

    const updateCopInfo = (copId, info) => {
        setCopInfo(prevState =>
            prevState.map(cop =>
                cop.id === copId ? { ...cop, ...info } : cop
            )
        );
    };

    return (
        <CopContext.Provider value={{ copInfo, setCopInfo, updateCopInfo }}>
            {children}
        </CopContext.Provider>
    );
};
