import React,{useState, useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "../Payment/payment";
import { useSelector } from "react-redux";
import { convertLength } from "@mui/material/styles/cssUtils";

const PUBLIC_KEY = 'pk_test_51Jyg7eGk75zbcxVeN4uGKWm205YsZo0R4Qn5c2rYok07G2G0PCj9wqtqGe08tcABT4v2qMHoI3OcjqruzNln7qdj00RimaDJHq'
const SECRET_KEY = 'sk_test_51Jyg7eGk75zbcxVe1clNVNbhNAATOVvuC0xuz6RST5pKtIPVSETBBeJHO9ReQM0t8gqfco9xJJ6LlaREWKHPGCnk00Zofrs8Un'
const stripeTestPromise = loadStripe(PUBLIC_KEY)
    



const Stripe = () => {
    const [clientSecret, setClientSecret] = useState("");
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const token = userInfo.token
    const orderCreate = useSelector(state => state.orderCreate)
    const {orderUser} = orderCreate
    const totalPrice = orderUser?.[0]?.totalPrice
   
    
  
    useEffect(() => {
        
       
      if(totalPrice){
        
        fetch("http://127.0.0.1:8000/api/stripe/create-payment-intent/", {
          method: "POST",
          headers: { "Content-Type": "application/json",
                     Authorization: `Bearer ${token}` },
          body: JSON.stringify({ amount:  [totalPrice] }),
               
    })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
       // eslint-disable-next-line 
      }}, [totalPrice]);
    

    const appearance = {
        theme: 'stripe',
      };

const options = {
    clientSecret,
    appearance,
    };
    return (
        <div className="">
          {clientSecret && (
            <Elements options={options} stripe={stripeTestPromise}>
              <Payment />
            </Elements>
          )}
        </div>
      );
    }
export default Stripe