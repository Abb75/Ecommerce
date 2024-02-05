import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducer/productReducers'
import { cartReducer } from './reducers/cartReducer/cartReducers'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userDetailsReducer, userLoginReducer, userRegisterReducer ,userUpdateProfileReducer, userPasswordResetReducer, userListReducer} from './reducers/userReducer/userReducer'
import { OrderDetailsReducer, OrderListMyReducer, OrderPaidReducer, OrderReducer } from './reducers/orderReducer/orderReducer'
import { PaymentReducer } from './reducers/paymentReducer/paymentReducer'

const persistConfig = {
    key: 'main-root',
    storage,
}



const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: OrderReducer,
    //paymentCreate: PaymentReducer,
    orderPay: OrderPaidReducer,
    orderDetails: OrderDetailsReducer ,
    OrderListMyReducer: OrderListMyReducer,
    userPasswordResetReducer: userPasswordResetReducer ,
    usersList : userListReducer
})
const persisteReducer = persistReducer(persistConfig, reducer)
const initialState = {
}


const middleWare = [thunk]

const store = createStore(persisteReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));
const persistor = persistStore(store)

export{persistor}
export default store
