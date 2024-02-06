import { 
   
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST


 } from "../constants/productConstants"; 
    import axios from 'axios'

export const getAllProductFromApi = () => async(dispatch) => {
    try {

        dispatch({ 
            type:PRODUCT_LIST_REQUEST})
            const {data} = await axios.get(process.env.REACT_APP_API_URL + 'product/')
          
        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
            
        } catch(error) {
            console.log(error)
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data
                    ? error.response.data : error.message,
                });
               
          
   


            }
        }


    
        

export const getListProductDetails = (id) => async(dispatch) => {
    try {

        dispatch({ 
            type:PRODUCT_DETAILS_REQUEST})
            const {data} = await axios.get(process.env.REACT_APP_API_URL + `product/${id}`)
            
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
            
        } catch(error) {
            console.log(error)
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data
                    ? error.response.data : error.message,
                });
            
    


            }
        }

 

       

    
    

 