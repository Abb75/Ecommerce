import React, {useEffect, useState} from "react"
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
import { LinkContainer } from "react-router-bootstrap";
import { SendSuccessNotification } from "../../Alerts";






const Login = () => {
  
  
    const loginData = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = loginData
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false)  
   
    const initialFormData = Object.freeze({
        email: '',
        password: ''
    }); 
    const [formData, setFormData] = useState(initialFormData);
    const theme = createTheme();
    const {email, password}  = formData
   
    
    const handleChange = e => {
        setFormData({
            ...formData,[e.target.id]: e.target.value
        })
    }


    const handleSubmit = e => {
          e.preventDefault()
              dispatch(login(e.target.email.value, e.target.password.value))
              setChecked(true)
              }
            
    useEffect(() => {
        if (userInfo){  
          SendSuccessNotification('Login with success')
          navigate('/')
        }else if
          (error)
          navigate('/login')
    
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
              Connexion
            </Typography>
            <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
              {error ? <h2 style={{color:'red'}}  >Aucun compte actif trouvé avec les identifiants donnés</h2> : null}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="false"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
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
                  <Link to={'/login'}  variant="body2">
                    Forgot password ?
                  </Link> 
                </Grid>
                <Grid item>
                  <Link to={"/register"} variant="body2">
                    {"you don't have an account ?"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
         
        </Container>
      </ThemeProvider>
       
     

 
    )
}
export default Login;