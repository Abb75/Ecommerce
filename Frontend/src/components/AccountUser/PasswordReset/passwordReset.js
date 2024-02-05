import React, {useEffect, useState} from "react"

import axiosInstance from "../../../axios";
import {  useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/userActions";
import { validEmail, validPassword } from '../../custom_validation.js'
import { updatePasswordUser } from "../../../redux/actions/userActions";
import { sendMessageForUser } from "../ProfileUser/showAlert/showAlert";
import { SendSuccessNotification } from "../../Alerts.js";







export const PasswordReset = () => {
  
  
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorEmptyPassword, setErrorEmptyPassword ] = useState(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false) 
    const initialFormData = Object.freeze({
        password: '',
        password2:''
    });
    const [formData, setFormData] = useState(initialFormData);
    const theme = createTheme();
    const {password, password2}  = formData

    const checkPassword = (password, password2) => {
          if (password.length === 0 || password2.length === 0 ){
            setErrorEmptyPassword(true)
          
        }
  
         else if (!validPassword.test(password && password2)) {
              setErrorPassword(true);
            
         }
  
         else if (password != password2 ){
              setErrorConfirmPassword(true)
             
        }else {
            dispatch(updatePasswordUser({
                  'password':formData.password,},
                  
            ) )  
              SendSuccessNotification('Update password with success')
             navigate('/')
        
             
          }
         
      }

    const handleChange = e => {
        setFormData({
            ...formData,[e.target.id]: e.target.value, 
           
        })  
    }

    const handleSubmit = e => {
        e.preventDefault()
        checkPassword(formData.password, formData.password2)
        setChecked(true)
              
                
              }
            
       useEffect(() => {
        if(!userInfo){
            navigate('login/')
        }
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
              Modification mot de passe
            </Typography>
            {errorConfirmPassword ? <h4 style={{fontSize: '1rem', marginLeft: '5px', color:'red'}}>Les mots de passe ne correspondent pas</h4> : null}
            {errorEmptyPassword ? <h4 style={{fontSize: '1rem',marginLeft: '5px', color:'red'}}>Les valeurs obtenues sont vides </h4> : null}
            {errorPassword ? <h4 style={{fontSize: '1rem',marginLeft: '5px', color:'red'}}>minimun 8 caractères , une majuscule ,1 caractère special</h4>: null}
            <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Nouveau mot de passe"
                name="email"
                autoComplete="false"
                type="password"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirmation nouveau mot de passe"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              
              >
                Connexion
              </Button>
              <ToastContainer />
            
              <Grid container>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                  
                </Grid>
              </Grid>
            </Box>
          </Box>
         
        </Container>
      </ThemeProvider>
       
     

 
    )
}
