import { createStore } from 'redux';

const accion12 = (state, action) => {
    return {
        ...state,
        user1: state.user1 = action.valor
    };
}

const addProduct = (state, action) => {
    var results = state.products.filter(function(ele, index){
        if(action.valor.id === ele.id){
            return ele;
        }
    });
    return {
        ...state,
        products: results.length > 0 ? state.products : state.products.push(action.valor)
    };
}

const removeProduct = (state, action) => {
    for(var i = 0; i < state.products.length; i++) {
        if(state.products[i].id === action.valor.id){
            if(state.products[i].quantity === 0){
                state.products.splice(i, 1);
                break;
            }
        }
    };
    return {
        ...state,
        products: state.products
    };
}

const reducer = (state, action) => {
    if(action.type === "EJECUTAR_ACCION_1"){
        accion12(state, action);
    }else if(action.type==='AGREGAR_NUEVO_PRODUCTO'){
        addProduct(state, action);
    }else if(action.type==='REMOVER_PRODUCTO'){
        removeProduct(state, action);
    }//else if(action.type==='...'){...}

    return state;
}

export default createStore(reducer, {products:[],user1: '1', user2:'2'});