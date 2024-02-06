import { USER_LOGIN_FAIL,
     USER_LOGIN_REQUEST, 
     USER_LOGIN_SUCCESS, 
     USER_LOGOUT,

     USER_REGISTER_FAIL,
     USER_REGISTER_SUCCESS,
     USER_REGISTER_REQUEST,

     USER_DETAILS_REQUEST,
     USER_DETAILS_SUCCESS,
     USER_DETAILS_FAIL,
     USER_DETAILS_LOGOUT,

     USER_UPDATE_PROFILE_FAIL,
     USER_UPDATE_PROFILE_REQUEST,
     USER_UPDATE_PROFILE_RESET,
     USER_UPDATE_PROFILE_SUCCESS,
     USER_REMOVE_UPDATE_PROFILE,
     USER_PASSWORD_RESET_REQUEST,
     USER_PASSWORD_RESET_SUCCESS,
     USER_PASSWORD_RESET_FAIL,

     USERS_LIST_REQUEST,
     USERS_LIST_SUCCESS,
     USERS_LIST_FAIL
    
} from "../constants/userConstants"

import axiosInstance from "../../axios";
import axios from "axios";
import { CART_REMOVE_ALL_ITEM } from "../constants/cartConstants";
import { ORDER_DETAILS_EMPTY, ORDER_LIST_MY_EMPTY, ORDER_PAY_EMPTY, USER_ORDER_EMPTY } from "../constants/orderConstants";
import { useSelector } from "react-redux";


export const login = (email, password) => async(dispatch) => { 
    try {
        dispatch({
        type: USER_LOGIN_REQUEST
    })
    const {data} = await  axiosInstance.post(process.env.REACT_APP_API_URL + `token/`, {
        email: email,
        password: password
        })
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);   
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT' + localStorage.getItem('access_token'); 
       dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data 
           
       }
      )

    } catch(error){
       
        dispatch({
            type: USER_LOGIN_FAIL,
            error: error.response.data.detail //&& error.response.data.detail
           // ? error.response.data.detail : error.message
        })
    }
}

export const logout = () => async(dispatch, getState) => {
    const {orderCreate: {orderUser},} = getState()
    const {userLogin: {userInfo},} = getState()
    //const userId = orderUser?.[0]?.user
    //const userLogin = useSelector(state => state.userLogin)
    const userId = userInfo?.id
    console.log(userId)
    try{
        dispatch({
            type: USER_LOGOUT,
        })
        const config = {
            headers: { 
               
                'Content-type':  'application/json',
                'Accept': 'application/json',
                 Authorization: `Bearer ${userInfo.token}`,
               
            }

        } 
       
        const response = axiosInstance.post(process.env.REACT_APP_API_URL + 'user/logout/blacklist/' ,config,{
            refresh_token : localStorage.getItem('refresh_token') , 
            
        });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        
            axiosInstance.defaults.headers['Authorization'] = null;

        dispatch({
          
            type: USER_DETAILS_LOGOUT

        })

        dispatch({
            type: CART_REMOVE_ALL_ITEM
        })

        dispatch({
            type:USER_ORDER_EMPTY
        })
        dispatch({
            type:USER_REMOVE_UPDATE_PROFILE
        })
        dispatch({
            type: ORDER_PAY_EMPTY
        })
        dispatch({
            type:ORDER_LIST_MY_EMPTY
        })
        dispatch({
            type:ORDER_DETAILS_EMPTY
        })
    
    }catch(error){
        console.log(error)
    }
}

export const register = (email, 
                        first_name,
                        last_name,
                        address,
                        postcode,
                        phone,
                        city,
                        password ) => async(dispatch) => { 
    console.log(email,first_name,
        last_name,
        address,
        postcode,
        phone,
        city,
        password )
    try {
        dispatch({
        type: USER_REGISTER_REQUEST
    })
    const {data} = axiosInstance.post(process.env.REACT_APP_API_URL + 'user/register/', {
        email: email,
        first_name: first_name,
        last_name: last_name, 
        password: password,
        address: address,
        phone: phone,
        city: city,
        postcode: parseInt(postcode),

    })
    console.log(data)
       dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data 
           
       })

       dispatch({
        type: USER_LOGIN_REQUEST,
        payload: {email, password}
   })




    } catch(error){
       console.log(error)
        dispatch({
            
            type: USER_REGISTER_FAIL,
            error: error.response.data && error.response.data.detail
            ? error.response.data.detail : error.message
        })

        
    }
}

export const getUsersDetails =  (id) => async(dispatch, getState) => {
    
    try{
        dispatch({ type: USER_DETAILS_REQUEST})
        const {userLogin: {userInfo},} = getState()
        const userId = userInfo.id
        console.log(userId)
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + `user/${id}/`,
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
                data : id


        }
        console.log(config)

        const {data} = await axios(config);//.get(`http://127.0.0.1:8000/api/user/${id}/`, config)


        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    }catch(error){
        console.log(error)
        dispatch({
            type : USER_DETAILS_FAIL
          
        })
    }


}   
export const updateUsersProfile =  (user) => async(dispatch, getState) => {
   
    try{
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST})
        const { 
            userLogin: {userInfo},} = getState()
            console.log(userInfo.token)
            
        const config =  {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        
        

        const {data} = await axios.put(process.env.REACT_APP_API_URL + 'user/account-update/', user, config )
        console.log(data)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        



    }catch(error){
        dispatch({
            type : USER_UPDATE_PROFILE_FAIL,
            payload:  error.response.data
          
        })
    }


}   
export const removeUserUpdateProfile = (dispatch) => {
    dispatch({
        type: USER_REMOVE_UPDATE_PROFILE
    })

}




export const updatePasswordUser =  (user) => async(dispatch, getState) => {
   console.log(user)
    try{
        dispatch({ type:USER_PASSWORD_RESET_REQUEST})
        const { 
            userLogin: {userInfo},} = getState()
            console.log(userInfo.token)
            
        const config =  {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.put(process.env.REACT_APP_API_URL + 'user/account-update-password/', user, config )
       
        dispatch({
            type: USER_PASSWORD_RESET_SUCCESS,
            payload: data
        })
        
    }catch(error){
        dispatch({
            type : USER_PASSWORD_RESET_FAIL,
            payload:  error.response.data
          
        })
    }


}   



export const getUsersList =  () => async(dispatch, getState) => {
   
    try{
        dispatch({ type:USERS_LIST_REQUEST})
        const { 
            userLogin: {userInfo},} = getState()
            console.log(userInfo.token)
            
        const config =  {
            headers: {
                'Content-type':  'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'users/', config )
       
        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data
        })
        
    }catch(error){
        dispatch({
            type : USERS_LIST_FAIL,
            payload:  error.response.data
          
        })
    }


}   




