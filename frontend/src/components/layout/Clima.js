import React, {useContext} from 'react';
import turnoContext from '../../context/turnos/turnoContext';
import {Container,Row, Col} from 'react-bootstrap';

const Clima = () => {
     const turnosContext = useContext(turnoContext);
     const {temperatura, ciudad, img} = turnosContext;
    
    return(
        <Container>
            <Row>
                <Col><img src={img} alt="icono"/></Col>
                <Col><h2 className="clima">{temperatura}°C</h2></Col>
                <Col><h2 className="clima">{ciudad}</h2></Col>
            </Row>
        </Container>
    )
}

export default Clima;