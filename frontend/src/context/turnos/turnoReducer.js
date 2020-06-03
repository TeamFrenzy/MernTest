import {
    FORMULARIO_TURNO,
    AGREGAR_TURNO,
    VALIDAR_FORMULARIO,
    FETCH_SUCCESS,
    FETCH_ERROR,
    FETCH_CLIMA,
    FETCH_COLAS
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_TURNO:
            return {
                ...state,
                formulario: !state.formulario
            }
        case AGREGAR_TURNO:
            return {
                ...state,
                formulario: false,
                errorformulario: false

            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case FETCH_CLIMA:
            return {
                ...state,
                loading: false,
                temperatura: action.payload.temperatura,
                ciudad: action.payload.ciudad,
                img: action.payload.img,
                error: ''
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                atendidos: action.payload.atendidos,
                sinAtender: action.payload.noAtendidos,
                error: ''
            }
            case FETCH_COLAS:
                return {
                    ...state,
                    loading: false,
                    colas: action.payload,
                    error: ''
                }

        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: 'Something went wrong!'
            }
        default:
            return state;
    }
}