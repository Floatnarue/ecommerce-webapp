import React, { createContext, useState } from 'react'

export const CartContext = createContext({});
// Use ContextAPI to pass down props to spicific components
export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }

    function reduceProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev
        })
    }


    function clearCart() {
        setCartProducts([]);
      }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct ,reduceProduct, clearCart }} >
            {children}
        </CartContext.Provider>
    );


}
