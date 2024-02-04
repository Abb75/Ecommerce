import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Logout from '../AccountUser/LogoutUser/logout';
import PersonIcon from '@mui/icons-material/Person';
import '../Navbar/navbar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from '../AccountUser/LoginUser/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formControlLabelClasses, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { USER_LOGOUT } from '../../redux/constants/userConstants';
import ProfileUser from '../AccountUser/ProfileUser/profileUser';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Cart } from '../Cart/cart';









const NavigationBar = () => {

    const getUserData = useSelector(state => state.userLogin)
    const {userInfo} = getUserData
    const [show, setShow] = useState(false)

    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    //const showCart = () => {
      
            //<NewCart />
    //}  
    const handleShow = () => setShow(true);
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
    backgroundColor:alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: 'blue',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'blue',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


 
    return (

      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">E-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            <NavDropdown 
                show={show}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)} 
                title={userInfo  ? userInfo.first_name : 'profile'}   
                id="basic-nav-dropdown">
              {userInfo ?  
                  <NavDropdown.Item  as={Link} to={'/profile'} >
                         Profile
                  </NavDropdown.Item> : (

                  <NavDropdown.Item disabled as={Link} to={'/profile'} >
                  Profile
                  </NavDropdown.Item>
                  
                )} 
                {userInfo ?
                 <NavDropdown.Item  as={Link} to={'/password_reset'} >
                        Password
                  </NavDropdown.Item> : (

                  <NavDropdown.Item disabled  as={Link} to={'/password_reset'} >
                        Password
                  </NavDropdown.Item>
                  )

                }

              {userInfo ?                    
                  <NavDropdown.Item  as={Link} to={'/order_history'} >
                   My orders
                  </NavDropdown.Item> : (
                  
                
                  <NavDropdown.Item disabled as={Link} to={'/order_history'} >
                    My orders
                  </NavDropdown.Item>
                  
                )}
  
              <NavDropdown.Item  >
                            <Logout/>
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    
      

      <Typography fontSize='1.5em' fontFamily='' paddingRight='470px'></Typography>
      <Search>
            <SearchIconWrapper  >
              
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      <IconButton component={Link} to="/login"> 
        <PersonIcon color='primary' fontSize='large'/>
      </IconButton>

      <IconButton component={Cart} to=''>
        <ShoppingCartIcon color='primary' fontSize='large'/>
      </IconButton>
    
     </Container>
    </Navbar>
    )
}




export default NavigationBar;