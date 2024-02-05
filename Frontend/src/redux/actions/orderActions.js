import axios from "axios"
import { CART_REMOVE_ALL_ITEM } from "../constants/cartConstants"

import { USER_ORDER_SUCCESS,
        USER_ORDER_REQUEST,
        USER_ORDER_FAIL,
        USER_ORDER_EMPTY,

        ORDER_PAY_REQUEST,
        ORDER_PAY_SUCCESS,
        ORDER_PAY_FAIL,

        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
        ORDER_DETAILS_EMPTY,


        ORDER_LIST_MY_SUCCESS,
        ORDER_LIST_MY_REQUEST,
        ORDER_LIST_MY_FAIL,
        ORDER_LIST_MY_EMPTY



} from "../constants/orderConstants"

export const createOrderUser =  (order) => async(dispatch, getState) => {
    console.log(order)
  
    try{
        dispatch({ type: USER_ORDER_REQUEST})
        
        const {userLogin: {userInfo},} = getState()
      
        const {orderCreate: {orderUser},} = getState()
        const userId = orderUser?.[0]?.user
        const token = userInfo?.token
        
        
        const config = {
            headers: { 
               
                'Content-type':  'application/json',
                'Accept': 'application/json',
                 Authorization: `Bearer ${token}`,
               
            }

        } 
        const {data} = await axios.post(`http://127.0.0.1:8000/api/order/add/`,order,config )
        

        dispatch({
            type: USER_ORDER_SUCCESS,
            payload: data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type : USER_ORDER_FAIL,
            payload : error.response
          
        })
    }


}   



export const payOrder =  (id) => async(dispatch, getState) => {
    console.log(id)
    try{
        dispatch({ type: ORDER_PAY_REQUEST})
        const {userLogin: {userInfo},} = getState()
        const {orderCreate: {orderUser},} = getState()
        const userId = orderUser?.[0]?.user

       

        const config = {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`, 
               
            }

        }
        const {data} = await axios.put(`http://127.0.0.1:8000/api/order/${id}/pay/`,
        userId,
        config)
            
        

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_REMOVE_ALL_ITEM
        })

        dispatch({
            type: USER_ORDER_EMPTY
        })

        

    }catch(error){
        dispatch({
            type : ORDER_PAY_FAIL,
            payload : error.response
          
        })
    }

}

export const removeOrderData = (dispatch) => {
    dispatch({
        type: USER_ORDER_EMPTY
    })

}



export const getOrderDetails =  (id) => async(dispatch, getState) => {
    console.log(id)
    try{
        dispatch({ type: ORDER_DETAILS_REQUEST})
        const {userLogin: {userInfo},} = getState()
        const {orderCreate: {orderUser},} = getState()
        const userId = orderUser?.[0]?.user

        const config = {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`, 
               
            }

        }
        const {data} = await axios.get(`http://127.0.0.1:8000/api/order/${id}/`,config,
        userId)
            
        

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response
          
        })
    }
}

export const getOrderList =  () => async(dispatch, getState) => {
    try{
        dispatch({ type: ORDER_LIST_MY_REQUEST})
        const {userLogin: {userInfo},} = getState()
        const getUserId = userInfo?.id
        console.log(getUserId)

        const config = {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`, 
               
            }

        }
        const {data} = await axios.get(`http://127.0.0.1:8000/api/order/order_history/`,config,
       getUserId
       )
            
        

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type : ORDER_LIST_MY_FAIL,
            payload : error.response
          
        })
    }
}


export const getAllOrderItemsByOrder =  (id) => async(dispatch, getState) => {
    console.log(id)
    try{
        dispatch({ type: ORDER_DETAILS_REQUEST})
        const {userLogin: {userInfo},} = getState()
        const {orderCreate: {orderUser},} = getState()
        const userId = orderUser?.[0]?.user

        const config = {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`, 
               
            }

        }
        const {data} = await axios.get(`http://127.0.0.1:8000/api/order/${id}/`,config,
        userId)
            
        

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response
          
        })
    }
}