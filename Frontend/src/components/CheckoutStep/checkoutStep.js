import React from "react"
import { Nav } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import Link from '@mui/material/Link';
import '../CheckoutStep/checkoutStep.css'



const CheckoutStep = (step1, step2, step3) => {
    return (
        <Nav id="checkout-step" className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ?( 
                <LinkContainer to='/cart'>
                    <Nav.Link>Panier</Nav.Link>
                </LinkContainer>) : (
                <Nav.Link disabled >Panier</Nav.Link> )}
            </Nav.Item>

            <Nav.Item>
                {step2 ?( 
                <LinkContainer to='/shipping'>
                    <Nav.Link>Livraison</Nav.Link>
                </LinkContainer>) : (
                <Nav.Link disabled >Livraison</Nav.Link> )}
            </Nav.Item>

            <Nav.Item>
                {step3 ?( 
                <LinkContainer to='/login'>
                    <Nav.Link>Paiement</Nav.Link>
                </LinkContainer>) : (
                <Nav.Link disabled >Paiement</Nav.Link> )}
            </Nav.Item>
        </Nav>
    )
}
export default CheckoutStep