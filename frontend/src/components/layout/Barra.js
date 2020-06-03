import React from 'react';
import Clima from './Clima';

const Barra = () => {
    return (
        <header className="barra-superior">
            <p className="bienvenido">Bien<span>venido</span></p>

            <nav className="clima">
                        <Clima />
            </nav>
        </header>
    );
}

export default Barra;