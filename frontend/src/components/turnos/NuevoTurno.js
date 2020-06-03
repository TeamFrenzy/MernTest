import React, { Fragment, useState, useContext } from 'react';
import turnoContext from '../../context/turnos/turnoContext';

const NuevoTurno = () => {

    //Obtener el State del formulario
    const turnosContext = useContext(turnoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarTurno, mostrarError, colas } = turnosContext;

    //State para turno
    const [turno, guardarTurno] = useState({
        nombre: '',
        idCola: 0
    });

    //Extraer nombre de turno
    const { nombre } = turno;
    const { idCola } = turno;


    const onChangeNombre = e => {
        guardarTurno({
            ...turno,
            nombre: e.target.value
        })
    }

    const onChangeId = e => {
        guardarTurno({
            ...turno,
            idCola: e.target.value
        })
    }

    const onSubmitTurno = e => {
        e.preventDefault();

        //Validar turno
        if (nombre === '') {
            mostrarError();
            return;
        }
        if (idCola === 0) {
            mostrarError();
            return;
        }
        //Agregar al state
        agregarTurno(nombre, idCola);
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >Nuevo turno</button>

            {
                //Si formulario existe
                formulario
                    ?
                    (
                        <form
                            className="formulario-nuevo-turno"
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Ingrese su nombre..."
                                name="nombre"
                                value={nombre}
                                onChange={onChangeNombre}
                            />
                            {colas.map(cola => (
                                <div className="form-check" key={cola.id}>

                                    <input className="form-check-input" type="radio" name="idCola" id="exampleRadios1" value={cola.id} onChange={onChangeId}/>
                                    <label className="form-check-label" htmlFor="exampleRadios1">{cola.nombre}</label>
                                </div>
                            ))}

                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Turno"
                                onClick={onSubmitTurno}
                            />

                        </form>
                    )
                    : null}

            {errorformulario ? <p className="mensaje error">El nombre de turno es obligatorio</p> : null}
        </Fragment>
    );
}

export default NuevoTurno;