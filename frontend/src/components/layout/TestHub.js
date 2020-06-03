import React from 'react';
import Sidebar from './Sidebar';
import Barra from './Barra';
import SinAtender from '../turnos/SinAtender';
import Atendidos from '../turnos/Atendidos';
import ConTurno from '../turnos/ConTurno';
import {Row, Col} from 'react-bootstrap';

const TestHub = () => {
    return (
        <div className="contenedor-app">
            <Sidebar></Sidebar>
            <div className="seccion-principal">
                <Barra></Barra>
                <main>
                    <Row>
                        <Col>
                        <Atendidos />
                        </Col>
                        <Col>
                        <SinAtender />
                        </Col>
                        <Col>
                        <ConTurno />
                        </Col>
                    </Row>
                </main>
            </div>
        </div>
    )
}

export default TestHub;