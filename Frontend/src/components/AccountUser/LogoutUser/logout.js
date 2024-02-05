import { useNavigate} from "react-router-dom"
import axiosInstance from "../../../axios"
import React, {useEffect, useState} from "react"
import { getFormLabelUtilityClasses } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/actions/userActions"
import { Axios } from "axios"


const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
  
    const handleChange = () =>{
      
        setChecked(true)
        try{
             dispatch(logout())  
             
             navigate('/')
        }catch(AxiosError){
            navigate('/')
          
        }
       
      
    }


    return (
        <div >
            <a onClick={handleChange}>Logout</a>
        </div>
           
    )

    }
export default Logout;