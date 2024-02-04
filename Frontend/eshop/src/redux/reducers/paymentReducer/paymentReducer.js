import { PAYMENT_USER_REQUEST,PAYMENT_USER_SUCCESS, PAYMENT_USER_FAIL } from "../../constants/paymentConstants";

export const PaymentReducer = (state={},  action ) => {
    switch (action.type) {
      
        case PAYMENT_USER_REQUEST:
            return{loading: true}
          
        case PAYMENT_USER_SUCCESS:
            return { loading:false,success:true, orderPayment:[action.payload ]}, console.log(action.type)
          
        case PAYMENT_USER_FAIL:
            return { loading:true, error:action.payload}

        default:
            return state;
    }
}