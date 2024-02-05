import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IconButton, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../Cart/cart.css'
import { Image, Row, Col, ListGroup, ListGroupItem, Form, CloseButton } from 'react-bootstrap';
import {Link,useNavigate}  from 'react-router-dom'
import { removeItem } from '../../redux/actions/cartActions';
import Badge from '@mui/material/Badge';
//import { styled } from '@mui/material/styles';
import styled from '@emotion/styled';
import { addToCart } from '../../redux/actions/cartActions';
import { SendInfoNotification } from '../Alerts';




export const Cart = () => {

    const loginData = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = loginData
    const cart = useSelector( state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems} = cart
    const [show, setShow] = useState(false);
    const productDetail = useSelector(state => state.productDetail.productDetail)
    const dataProduct = productDetail
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 

    const removeItemFromCart = (id) => {
    
        dispatch(removeItem(id))
          
      }
  
     const checkoutHandler = () => {
        if (userInfo){
            navigate('/shipping')
        }
        else{
          SendInfoNotification('Login required')
          navigate('/login')
        }
      }
      
      const EditButton = styled(IconButton)`
          outline: none;
          border: none;
        `;
   

  return (
    <>
            
    <IconButton    id='icon-button' aria-label='cart'  onMouseOver={handleShow} to=''> 
        <Badge badgeContent={cartItems.length} color='secondary'>
          <ShoppingCartIcon  color='primary' fontSize='large'/>
        </Badge>
    </IconButton>

 

      <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{marginLeft:'20px'}}>Cart</Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack  direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={{xs:-6  }}  >
                {cartItems.map(item => 
                  <Fragment key={item.id}>       
                   <CloseButton
                          size="sm"
                          variant='outline-danger'
                          id='closeButton'
                          type='button'
                          onClick={() => removeItemFromCart(item.product)}
                          >
                     </CloseButton>             
                     
                          <Image height={175} width={210} id='imageProduct' alt="product" src={item.image}/>
                         
                        <h2 id='productTitle'>{item.title}</h2>
                        <h3 id='productPrice'>{item.price}€</h3>
                        
                    <hr></hr>
             

                    </Fragment>
                    

                )}
            </Stack> 
          
            
            <h3 id='totalPrice'>Total amount : {cartItems.reduce((acc, item) => acc  + item.price, 0).toFixed(2)} €</h3>
         
              <Button  variant='primary' component={Link} to='/shipping'
                    id="buttonCheckout"
                    onClick={() => checkoutHandler()}
                    disabled={cartItems.length === 0  ? true : false}
                    type="button"
                             
                    >Order now
              </Button>
             
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
