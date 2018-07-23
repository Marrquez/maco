/**
 * End points
* */
const accion1 = (valor1, valor2) => {
    //console.log(valor1);
    //console.log(valor2);
    return {
        type: "EJECUTAR_ACCION_1",
        valor: "este es otro valor"
    };
};

const addProduct = (product) => {
    //console.log(valor1);
    //console.log(valor2);
    return {
        type: "AGREGAR_NUEVO_PRODUCTO",
        valor: product
    };
};

const updateProduct = (product) => {
    return {
        type: "ACTUALIZAR_PRODUCTO",
        valor: product
    };
};

const removeProduct = (product) => {
  return {
      type: "REMOVER_PRODUCTO",
      valor: product
  };
};

const clearParams = (product) => {
    return {
        type: "RESET_PARAMS",
        valor: product
    };
};

const setShop = (shop) => {
    return {
        type: "SET_SHOP",
        valor: shop
    };
};

export { accion1, addProduct, removeProduct, clearParams, setShop, updateProduct /*, accion2*/ };