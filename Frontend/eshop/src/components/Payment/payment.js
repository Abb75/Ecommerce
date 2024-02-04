import { maxWidth } from "@mui/system";
import "./payment.css";
import axios from "axios"
import { CreatePayment } from "../../redux/actions/paymentAction";
import React, { useState, useEffect,  } from "react";
import { API_URL } from "../Stripe/StripeContainer";
import { useDispatch, useSelector } from "react-redux";
import { Row ,Col, ListGroup, Image, Button, FormControl, Form} from "react-bootstrap";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { payOrder } from "../../redux/actions/orderActions";
import { SendErrorNotification, SendSuccessNotification } from "../Alerts";

const Payment = () => {

    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
  
    
    const orderCreate = useSelector(state => state.orderCreate)
    const {orderUser} = orderCreate
    const orderId = orderUser?.[0]?.id
    
    //const name = orderUser?.[0]?.user.email
  
    const totalPrice = orderUser?.[0]?.totalPrice
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =  userLogin
    const dispatch = useDispatch()
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');

    

    

      useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              SendSuccessNotification('Payment success')
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              SendErrorNotification('Something went wrong.')
              break;
          }
        });
      }, [stripe]);
  

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
           const { error } = await stripe.confirmPayment({
              elements,
              confirmParams: {
                // Make sure to change this to your payment completion page
                
                return_url: "http://localhost:3000",
              
              }, 
        } , dispatch(payOrder(orderId)) ,);
    
        
       
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
        
       
        
        setIsLoading(false);
      };
    

   


    

        return (
            <form id="payment-form" onSubmit={handleSubmit}>
              <PaymentElement id="payment-element" />
              <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </form>
          );
        }
    


 
  
 





 


            

   

export default Payment