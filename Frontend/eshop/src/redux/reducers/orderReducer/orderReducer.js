import { USER_ORDER_REQUEST,
        USER_ORDER_SUCCESS,
        USER_ORDER_FAIL,
        USER_ORDER_EMPTY,

        ORDER_PAY_SUCCESS,
        ORDER_PAY_REQUEST,
        ORDER_PAY_FAIL,
        ORDER_PAY_EMPTY,

        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
        ORDER_DETAILS_EMPTY,


        ORDER_LIST_MY_REQUEST,
        ORDER_LIST_MY_SUCCESS,
        ORDER_LIST_MY_FAIL,
        ORDER_LIST_MY_EMPTY

} from "../../constants/orderConstants";


export const OrderReducer = (state={},  action ) => {
    switch (action.type) {
        case USER_ORDER_REQUEST:
            return{loading: true}
            
        case USER_ORDER_SUCCESS:
            return { loading:false,success:true, orderUser:[action.payload ]}
            ;
        case USER_ORDER_FAIL:
            return { loading:true, error:action.payload}

        case USER_ORDER_EMPTY:
            return {}
    
        default:
            return state;
    }
}


export const OrderPaidReducer = (state={},  action ) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return{loading: true}
            
        case ORDER_PAY_SUCCESS:
            return { loading:false,success:true}
            ;
        case ORDER_PAY_FAIL:
            return { loading:true, error:action.payload}

        case ORDER_PAY_EMPTY:
            return {}
    
        default:
            return state;
    }
}

export const OrderDetailsReducer = (state={loading:true, orderItems:[]},  action ) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{...state,
                  loading: true}
            
        case ORDER_DETAILS_SUCCESS:
            return { loading:false,order: action.payload}
            ;
        case ORDER_DETAILS_FAIL:
            return { loading:true, error:action.payload}

        case ORDER_DETAILS_EMPTY:
            return {}
    
        default:
            return state;
    }
}
export const OrderListMyReducer = (state={ order: []},  action ) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return{...state,
                  loading: true}
            
        case ORDER_LIST_MY_SUCCESS:
            return { loading:false, order: action.payload}
            ;
        case ORDER_LIST_MY_FAIL:
            return { loading:true, error:action.payload}

        case ORDER_LIST_MY_EMPTY:
            return {
                order: []
            }
    
        default:
            return state;
    }
}