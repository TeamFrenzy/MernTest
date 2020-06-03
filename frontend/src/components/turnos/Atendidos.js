import React, {useContext} from 'react';
import turnoContext from '../../context/turnos/turnoContext';

const Atendidos = () => {
     const turnosContext = useContext(turnoContext);
     const {atendidos} = turnosContext;
    
    return(
        <div className="Atendidos">
            <h1>{atendidos}</h1>
            <h1>Atendidos</h1>
        </div>
    )
}

export default Atendidos;