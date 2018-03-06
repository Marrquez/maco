import { createStore } from 'redux';

const accion12 = (state, action) => {
    return {
        ...state,
        user1: state.user1 = action.valor
    };
}

const reducer = (state, action) => {
    if(action.type === "EJECUTAR_ACCION_1"){
        accion12(state, action);
    }//else if(action.type==='...'){...}
    return state;
}

export default createStore(reducer, {user1:'1',user2:'2'});