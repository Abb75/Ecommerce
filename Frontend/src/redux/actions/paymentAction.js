import { PAYMENT_USER_FAIL, PAYMENT_USER_REQUEST, PAYMENT_USER_SUCCESS } from "../constants/paymentConstants"
import axios from "axios"
import { API_URL } from "../../components/Stripe/StripeContainer"


export const CreatePayment =  () => async(dispatch, getState) => {
    

    const PUBLIC_KEY = 'pk_test_51Jyg7eGk75zbcxVeN4uGKWm205YsZo0R4Qn5c2rYok07G2G0PCj9wqtqGe08tcABT4v2qMHoI3OcjqruzNln7qdj00RimaDJHq'

     //console.log(cartItems, totalPrice)
    try{
        dispatch({ type: PAYMENT_USER_REQUEST})
        const {userLogin: {userInfo},} = getState()
        
       
        const config = {
            headers: {
                'Content-type':  'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`, 
               
            }
        }
      
        const {data} = await axios.post('http://127.0.0.1:8000/api/stripe/payment/',config )
          

        dispatch({
            type: PAYMENT_USER_SUCCESS
        })
      
    }catch(error){
        dispatch({
            type : PAYMENT_USER_FAIL,
            payload : error.response
          
        })
    }


}   