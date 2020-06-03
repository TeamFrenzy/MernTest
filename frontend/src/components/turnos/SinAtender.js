import React, { useContext} from 'react';
import turnoContext from '../../context/turnos/turnoContext';

const SinAtender = () => {


    const turnosContext = useContext(turnoContext);
    const { sinAtender } = turnosContext;

    return (
        <div className="SinAtender">
            <h1>{sinAtender}</h1>
            <h1>Sin Atender</h1>
        </div>
    )
}

export default SinAtender;