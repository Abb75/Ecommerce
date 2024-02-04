import React,{ useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOrderDetails } from "../../../redux/actions/orderActions"
import {Col, ListGroup, ListGroupItem, Row, Image, Card} from 'react-bootstrap'
import '../OrderDetails/orderDetails.css'

export const OrderDetails = () => {

    const orderDetails = useSelector(state => state.orderDetails)
    const {order} = orderDetails 
    const products = order?.order_items
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(() => {
    
        dispatch(getOrderDetails(id))
           // eslint-disable-next-line
      }, [dispatch]
    )

    return (
        <div>
            <Row>
                <Col md={10}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2> 
                                <p>
                                    <strong style={{textAlign: 'center'}}>Details de ma commande</strong>
                                  
                                   
                                </p>
                            </h2>

                        </ListGroupItem>
                        <ListGroupItem>

                            <h2>Livraison</h2>
                            <p>
                               {order?.user.first_name} {order?.user.last_name}
                               <br></br>
                               {order?.user.address}   
                               <br></br>     
                               {order?.user.postcode}    
                               <br></br>     
                               {order?.user.city}                   
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Montant Total</h2>
                            <p>
                            {order?.totalPrice} €
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Articles</h2>
                            <br></br>
                            {products ? products.map((item, index) => ( 
                                 <ListGroupItem varinat="flush" key={index}>
                                    <Row >
                                        <Col  md={1}>
                                         <Image id='imgProduct' alt='product' src={item.image}  />
                                         </Col>
                                            <Col  md={2}>
                                                {item.name}
                                            </Col>
                                            <Col md={8}>
                                                quantité: {item.quantity}
                                            </Col>
                                    </Row>
                                    
                                </ListGroupItem>
                            )) : ( <p>aucune commande</p>)}
                                        
                           
                        </ListGroupItem>


                    </ListGroup>
                
                </Col>

                

            </Row>
            
        </div>
    )

}