import React, { useReducer, useEffect } from 'react';
import turnoContext from './turnoContext';
import turnoReducer from './turnoReducer';
import {
    FORMULARIO_TURNO,
    AGREGAR_TURNO,
    VALIDAR_FORMULARIO,
    FETCH_SUCCESS,
    FETCH_ERROR,
    FETCH_CLIMA,
    FETCH_COLAS
} from '../../types';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const TurnoState = props => {

    const initialState = {
        loading: true,
        error: '',
        formulario: false,
        errorformulario: false,
        turno: null,
        atendidos: null,
        sinAtender: null,
        temperatura: null,
        ciudad: null,
        img: null,
        colas: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(turnoReducer, initialState);

     useEffect( () => {
          getTurnos();
          getClima();
          getColas();
    }, [])

   /* useEffect(() => {
        getClima();
        getTurnos();
    }, [atendidos])*/


    //Nota: Estoy usando una contraseña hard-codeada en el cliente para proteger las rutas de fetching. Esta practica es unicamente a modo de ilustracion y considerando que el usuario jamas tendria acceso al codigo fuente del programa.
    const getTurnos =  () => {
         axios
            .get('api/turnos/lista', {
                params: {
                  pass: 12345678987654321
                }
              })
            .then(response => {
                dispatch({ type: FETCH_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: FETCH_ERROR })
            })
    }

    const getClima =  () => {
         axios
            .get('weather-api')
            .then(response => {
                dispatch({ type: FETCH_CLIMA, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: FETCH_ERROR })
            })
    }

    const getColas =  () => {
         axios
            .get('api/colas/lista', {
                params: {
                  pass: 12345678987654321
                }
              })
            .then(response => {
                console.log(response.data);
                dispatch({ type: FETCH_COLAS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: FETCH_ERROR })
            })
    }


    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_TURNO
        })
    }

    //Agregar nuevo turno
    const agregarTurno = (nombre, sendId) => {
        var base = 'api/turnos/nuevo_turno/';

        axios
            .post(base.concat(sendId), { nombre: nombre})
            .catch(error => {
                console.log("In Fetch Error Clima");
                dispatch({ type: FETCH_ERROR })
            })
            dispatch({
                type: AGREGAR_TURNO
            })
    }

    // Validar Formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    return (
        <turnoContext.Provider
            value={{
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                turno: state.turno,
                error: state.error,
                loading: state.loading,
                temperatura: state.temperatura,
                ciudad: state.ciudad,
                img: state.img,
                atendidos: state.atendidos,
                sinAtender: state.sinAtender,
                colas: state.colas,
                agregarTurno,
                mostrarError,
                mostrarFormulario
            }}
        >
            {props.children}
        </turnoContext.Provider>
    )
}

export default TurnoState;