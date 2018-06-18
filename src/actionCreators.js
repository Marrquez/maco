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

export { accion1, addProduct/*, accion2*/ };