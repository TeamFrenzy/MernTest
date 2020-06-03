import React, {useContext} from 'react';
import turnoContext from '../../context/turnos/turnoContext';


const ConTurno = () => {
    const turnosContext = useContext(turnoContext);
    const {atendidos, sinAtender} = turnosContext;
    
    return(
        <div className="ConTurno">
        <h1>{atendidos + sinAtender}</h1>
        <h1>Con Turno</h1>
        </div>
    )
}

export default ConTurno;