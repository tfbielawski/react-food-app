import React from "react";
import { createContext, useReducer } from "react";

//Pass data to all components in a reusable way

//Default context values
const CartContext = createContext({
    items: [],
    totalAmount: 0,
    //Methods to update the context
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action){
    if(action.type === "ADD_ITEM"){
        
        const existingCartItemIndex = state.items.findIndex((item) => (item.id) === action.item.id);
        
        const updatedItems = [...state.items];

        //-1 means item is not in the cart, findIndex didn't find it
        if(existingCartItemIndex !== -1){
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems.push({...action.item, quantity: 1});
        }
        return { ...state, items: updatedItems };
    }
    //Remove item if it's quantity is 1
    if(action.type === "REMOVE_ITEM"){
        const existingCartItemIndex = state.items.findIndex((item) => (item.id) === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if(existingCartItem.quantity=== 1){
            //use splice to remove a single item from the specified index
            updatedItems.splice(existingCartItemIndex, 1);
        }
        else{
            //Update if quantity is more than 1
            //New copy of the existing item
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        //Return new obj copies in old state and updates items
        return {...state, items: updatedItems};
    }

    if (action.type === "CLEAR_CART"){
        return {...state, items: []};
    }
    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item){
        //Type is defined above
        dispatchCartAction({type: "ADD_ITEM", item});
    }

    function removeItem(id){
        dispatchCartAction({type: "REMOVE_ITEM", id});
    }

    function clearCart(){
        dispatchCartAction({type: "CLEAR_CART"});
    }

    //When reducer cart state changes, items gets updated, passed into CartContext.Provider
    const cartContext = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart
    }

    
    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}


export default CartContext;

