import axios from "axios"
import {CART_ADD_ITEM, CART_REMOVE_ALL_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'
import { productListReducer } from "../reducers/productReducer/productReducers"
import { CartProvider, useCart } from "react-use-cart";


 
    
   
export const addToCart = (id, quantity) => async(dispatch) => {
    
   

    const {data} = await axios.get(`http://127.0.0.1:8000/api/product/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.id,
            title: data.title,
            image : data.image,
            description: data.description,
            price: data.price * quantity,
            quantity,
            stock: data.stock
        }

})
} 

export const removeItem = (id) => (dispatch, getState) => {

    dispatch({
        
        type: CART_REMOVE_ITEM,
        payload: id

    })
    localStorage.setItem('persist:main-root', JSON.stringify(getState().cart.cartItems))

}

export const removeAllItem = () => (dispatch) => {
    dispatch({
        type: CART_REMOVE_ALL_ITEM
    })
}