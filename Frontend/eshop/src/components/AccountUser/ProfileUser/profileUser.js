import React, { useEffect, useState } from 'react'

import { Row, Col, Form} from 'react-bootstrap'

import { useSelector } from 'react-redux'
import { getUsersDetails, updateUsersProfile } from '../../../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
import {  useNavigate } from "react-router-dom";
import { validEmail, validPassword } from '../../custom_validation.js';
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
import { register } from "../../../redux/actions/userActions";
import { Alert, Stack , Snackbar} from '@mui/material/'
import { ShowAlert } from './showAlert/showAlert'
import { sendMessageForUser } from './showAlert/showAlert'


const ProfileUser = () => {

    const [open, setOpen] = useState(false)
    const dispatch =  useDispatch()
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const initialFormData = Object.freeze({
        email: userInfo.email,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        address: userInfo.address,
        postcode: userInfo.postcode,
        phone: userInfo.phone,
        city: userInfo.city,
        postcode: userInfo.postcode,
    })
   
    const [formData, setFormData] = useState(initialFormData)
    const [errorEmail, setErrorEmail] = useState(false)
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    const {email, first_name,last_name, address,city, phone,postcode} = formData
    const theme = createTheme();

    const checkEmail = (email) => {
      console.log(email)
         if (!validEmail.test(email)) {
            setErrorEmail(true);
            console.log("error_email")
         }else {

          dispatch(updateUsersProfile({
                'email': formData.email,
                'first_name': formData.first_name, 
                'last_name': formData.last_name,
                'address': formData.address,
                'postcode': formData.postcode,
                'city': formData.city,
                'phone': formData.phone,
                //'password':formData.password,},
                
          }) ) 
           navigate('/')
            sendMessageForUser('Operation efféctué')
           setErrorEmail('')
           
        }
        }
       
      
 

    const handleSubmit = e => { 
            e.preventDefault(); 
            checkEmail(e.target[4].value)
            
        }

    const handleChange = e => {
          
            setFormData({
                ...formData,[e.target.id]: e.target.value,
              
            }) 
        } 


    useEffect(() => {
       
        if(!userInfo){
            navigate('/login')
        }else{
            if (!user || !user.first_name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUsersDetails('profile'))

            }else{
               //setFormData(first_name=user.first_name)
               //setFormData(email=user.email)
            
            }
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [userInfo])

    return (
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
          >
           
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update profile
              {errorEmail ? <h3 style={{fontSize: '1rem', marginRight: '10px'}}>Email incorrect</h3> : null}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete
                    name="firstName"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                    defaultValue={first_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChange}
                    defaultValue={last_name}
                  />
                </Grid>
                
               
               
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    defaultValue={email}
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
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete='off'
                    onChange={handleChange}
                    defaultValue={address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="postcode"
                    label="postcode"
                    name="postcode"
                    autoComplete='postcode'
                    onChange={handleChange}
                    defaultValue={postcode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete
                    name="firstName"
                    required
                    fullWidth
                    id="city"
                    label="city"
                    autoFocus
                    onChange={handleChange}
                    defaultValue={city}
                  />
                </Grid>
               
              
               
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Modifier
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
         
        </Container>
      </ThemeProvider>
    )
}
export default ProfileUser