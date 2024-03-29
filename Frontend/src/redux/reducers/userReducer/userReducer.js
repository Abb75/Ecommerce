import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
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
    USERS_LIST_FAIL,


} from '../../constants/userConstants'

export const userLoginReducer = (state ={}, action) =>{  
 
    switch(action.type){
        
        case USER_LOGIN_REQUEST:
            return { loading: true}

        case USER_LOGIN_SUCCESS:
            
            return { loading: false, userInfo: action.payload}
           
        case USER_LOGIN_FAIL:
     
            return { loading: false, error: action.error}

        case USER_LOGOUT:
            return {}

        case USER_DETAILS_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state ={}, action) =>{  
 
    switch(action.type){
        
        case USER_REGISTER_REQUEST:
            return { loading: true}

        case USER_REGISTER_SUCCESS:
            console.log(action.payload)
            return { loading: false, userInfo: action.payload}
           
        case USER_REGISTER_FAIL:
            console.log(action.error)
            return { loading: false, error: action.error}

        

        

        default:
            return state
    }
}


export const userDetailsReducer = (state = { user: {} }, action) =>{  
  
    switch(action.type){
        
        case USER_DETAILS_REQUEST:
           
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
           
            return { loading: false, user: action.payload}
           
        case USER_DETAILS_FAIL:
           
            return { loading: false, error: action.error}

        case USER_DETAILS_LOGOUT:
            return { user:{}}

        

        default:
            return state
    }
}


 export const userUpdateProfileReducer = (state = {  }, action) =>{  
  
    switch(action.type){
        
        case USER_UPDATE_PROFILE_REQUEST:
           
            return { loading: true}

        case USER_UPDATE_PROFILE_SUCCESS:
            
            return { loading: false, success:true, userInfo: action.payload}
           
        case USER_UPDATE_PROFILE_FAIL:
            
            return { loading: false, error: action.error}

        
        case USER_UPDATE_PROFILE_RESET:
            return { }

        case USER_REMOVE_UPDATE_PROFILE:
            return {}

        

        default:
            return state
    }
}

export const userPasswordResetReducer = (state = {  }, action) =>{  
  
    switch(action.type){
        
        case USER_PASSWORD_RESET_REQUEST:
           
            return { loading: true}

        case USER_PASSWORD_RESET_SUCCESS:
            
            return { loading: false, success:true}
           
        case USER_PASSWORD_RESET_FAIL:
            
            return { loading: false, error: action.error}

        default:
            return state
    }
}

export const userListReducer = (state = {users: []  }, action) =>{  
  
    switch(action.type){
        
        case USERS_LIST_REQUEST:
           
            return { loading: true}

        case USERS_LIST_SUCCESS:
            
            return { loading: false, success:true, users: action.payload}
           
        case USERS_LIST_FAIL:
            
            return { loading: false, error: action.error}

        default:
            return state
    }
}