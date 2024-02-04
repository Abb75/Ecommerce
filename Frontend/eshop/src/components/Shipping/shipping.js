import React,{useEffect, useState} from "react"

import {  Navigate, useNavigate } from "react-router-dom";


import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CheckoutStep from "../CheckoutStep/checkoutStep";
import { createOrderUser } from "../../redux/actions/orderActions";
import { USER_ORDER_EMPTY } from "../../redux/constants/orderConstants";





const Shipping = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const {success, error, order, totalPrice } = orderCreate
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc  + item.price, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))
    const userData = useSelector(state => state.userLogin)
    const { userInfo } = userData
 
    const theme = createTheme();
    const initialFormData = Object.freeze({
       
        address: userInfo.address,
        postcode: userInfo.postcode,
        phone: userInfo.phone,
        city: userInfo.city,
      
    })
    const [formData, setFormData] = useState(initialFormData)
    const { phone, address, city, postcode} = formData
    
    const handleChange = e => {
        setFormData({
            ...formData,[e.target.id]: e.target.value
        })
    }

    const createOrder = () => {
     
        dispatch(createOrderUser({
          user: userInfo.email,
          orderItems: cart.cartItems,
          totalPrice : cart.totalPrice
          
        }))
    }

    useEffect(() =>{
      if(success){
        dispatch({type: USER_ORDER_EMPTY})

      }
    })

    const handleSubmit = e => { 
        e.preventDefault();
        createOrder() 
        navigate('/payment')

      
       
         
        
        
                //sendWelcomeMsg(`Bienvenue ${formData.first_name}`)
               

        }



    

    return(
        
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />   
      
      
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >  <CheckoutStep step1 step2/>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
   

        <Typography component="h1" variant="h5">
          Confirmation pour la commande
        
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
           
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="address"
                type="address"
                id="address"
                autoComplete="new-password"
                onChange={handleChange}
                defaultValue={address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="phone"
                name="phone"
                autoComplete="phone"
                onChange={handleChange}
                defaultValue={phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="city"
                name="city"
                autoComplete="city"
                onChange={handleChange}
                defaultValue={city}
              />
              </Grid>
                <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="postcode"
                label="postcode"
                name="postcode"
                autoComplete="postcode"
                onChange={handleChange}
                defaultValue={postcode}
              />
            </Grid>
            
            

          </Grid>
          <Button
          
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Paiement
          </Button>
          
        </Box>
      </Box>
     
    </Container>
  </ThemeProvider>


    )
}

export default Shipping