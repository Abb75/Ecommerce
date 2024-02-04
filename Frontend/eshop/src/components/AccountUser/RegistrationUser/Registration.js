import React , {useState} from "react"
import axiosInstance from "../../../axios";
import {  useNavigate } from "react-router-dom";
import { validEmail, validPassword } from '../../custom_validation.js';
import './registration.css'
import Link  from   '@mui/material/Link';
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
import { sendMessageForUser } from "../ProfileUser/showAlert/showAlert";


const Registration = () => {
    const dispatch =  useDispatch()
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        first_name: '',
        last_name: '',
        address: '',
        postcode: '',
        phone:'',
        city: '',
        password: '',
        password2: '',
        
    })
    const [formData, setFormData] = useState(initialFormData)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)
    
    const {first_name, last_name,password,email, password2, address,postcode, phone , city} = formData
   
    const theme = createTheme();

   
    const checkEmail = (email) => {
        

         if (!validEmail.test(email)) {
            setErrorEmail(true);
            console.log("error_email")
         }
        
    }

    const checkPassword = (password, password2) => {
       if (!validPassword.test(password && password2)) {
            setErrorPassword(true);
            console.log("error_password")
         }
       if (password != password2 ){
       
            setErrorConfirmPassword(true)
            console.log('error_confirm')
          
           
        }else{
          dispatch(register(formData.email, 
            formData.first_name,
            formData.last_name,  
            formData.address,  
            formData.postcode,
            formData.phone,
            formData.city,
            formData.password,
          
           ))
           sendMessageForUser(`Bienvenue ${formData.first_name}`) 
           navigate('/')
        }

        
        
      }

    const handleChange = e => {
        console.log(e.target.value)
        setFormData({
            ...formData,[e.target.id]: e.target.value
        })
    }

    const handleSubmit = e => { 
        e.preventDefault(); 
        checkEmail(e.target[0].value)
        checkPassword(e.target[6].value,e.target[8].value )
      
        }


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
            Sign up
            {errorPassword ? <h3 style={{fontSize: '1rem', marginRight: '10px'}}>Le mot de passe doit contenir une majuscule un caractère spécial et au minimun 9 caractères</h3> : null }
            {errorEmail ? <h2 style={{fontSize: '1rem', marginRight: '10px'}}>Email incorrect</h2> : null}
            {errorConfirmPassword ? <h3 style={{fontSize: '1rem', marginRight: '10px'}}>Les mots de passe ne correspondent pas</h3> : null}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  defaultValue={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Password2"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={handleChange}
                  defaultValue={password2}
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
                  autoComplete='off'
                  onChange={handleChange}
                  defaultValue={postcode}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="city"
                  autoFocus
                  onChange={handleChange}
                  defaultValue={city}
                />
              </Grid>
             
            
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"c
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
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
export default Registration





