import { createStore } from 'redux';

const accion12 = (state, action) => {
    return {
        ...state,
        user1: state.user1 = action.valor
    };
}

const setQuantity = (state, action) => {
    var quantity = 0;
    state.products.filter(function(ele, index){
        quantity += ele.quantity;
    });
    return {
        ...state,
        totalItems: state.totalItems = quantity
    };
}

const updateProduct = (state, action) => {
    var results = state.products.filter(function(ele, index){
        if(action.valor.id === ele.id){
            ele.name = action.valor.name;
            ele.price = action.valor.price;
        }
        return ele;
    });
    return {
        ...state,
        products: state.products  = results
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
            if(state.products[i].quantity > 0){
                state.products[i].quantity -= 1;
                if(state.products[i].quantity === 0){
                    state.products.splice(i, 1);
                }
                break;
            }
        }
    };
    return {
        ...state,
        products: state.products
    };
}

const clearParams = (state, action) => {
    state.products = [];
    return {
        ...state,
        products: state.products
    };
}

const setShop = (state, action) => {
    return {
        ...state,
        shop: state.shop = action.valor
    };
}

const reducer = (state, action) => {
    if(action.type === "EJECUTAR_ACCION_1"){
        accion12(state, action);
    }else if(action.type==='AGREGAR_NUEVO_PRODUCTO'){
        addProduct(state, action);
        setQuantity(state, action);
    }else if(action.type==='REMOVER_PRODUCTO'){
        removeProduct(state, action);
        setQuantity(state, action);
    }else if(action.type==='RESET_PARAMS'){
        clearParams(state, action);
        setQuantity(state, action);
    }else if(action.type==='SET_SHOP'){
        setShop(state, action);
    }else if(action.type==='ACTUALIZAR_PRODUCTO'){
        updateProduct(state, action);
    }//else if(action.type==='...'){...}

    return state;
}

export default createStore(reducer, {products:[],totalItems: 0, user1: '1', user2:'2',baseUrl:'http://localhost:8080/Alfilsoft/Api/v1/', shop:{}});