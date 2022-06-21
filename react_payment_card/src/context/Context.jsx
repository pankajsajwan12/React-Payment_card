import  { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, ProdReducer } from "./Reducers";

export  const CartContext = createContext();
faker.seed(99);
export const CartProvider = ({ children }) => {

    const products = [...Array(30)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price : faker.commerce.price(),
        image : faker.image.image(),
        inStock : faker.helpers.arrayElement([0,3,5,6,7]),
        fastDelivery : faker.datatype.boolean(),
        ratings : faker.helpers.arrayElement([1,2,3,4,5]),
    }));

    const [state, dispatch]= useReducer(cartReducer, {
        products:products,
        cart:[],
    })

    const [prodState, prodDispatch] =useReducer(ProdReducer, {
        byStock : false,
        byFastDelivery: false,
        byRating : 0,
        searchQuery: "",
    });
    return (
    <CartContext.Provider value={{ state, dispatch ,prodState, prodDispatch }}>
        {children}
    </CartContext.Provider>
    )
}

export const CartState = () => {
    return useContext(CartProvider)
}

