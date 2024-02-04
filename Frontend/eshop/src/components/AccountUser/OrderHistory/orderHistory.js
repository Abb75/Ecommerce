import React, { useEffect } from "react"
import { Col, Row, ListGroup,Button, ListGroupItem, Table, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails } from "../../../redux/actions/orderActions"
import { Navigate, useParams } from "react-router-dom"
import { getOrderList } from "../../../redux/actions/orderActions"
import { USER_UPDATE_PROFILE_RESET } from "../../../redux/constants/userConstants"
import { getUsersDetails } from "../../../redux/actions/userActions"
import CircularIndeterminate from "../../Loader"
import { LinkContainer } from "react-router-bootstrap"
import '../OrderHistory/orderHistory.css'
export const OrderHistory = () => {


 
   

    const navigate = Navigate
    const dispatch = useDispatch()
    const {id} = useParams()
    
   
    const userlogin = useSelector(state => state.userLogin)
    const {userInfo} = userlogin
    const userUpdateProfile =  useSelector(state => state.userUpdateProfile)
    const { success} = userUpdateProfile
    const OrderListMyReducer = useSelector(state => state.OrderListMyReducer)
    const {loading , order, error} = OrderListMyReducer

    useEffect(() => {

        if(!userInfo){
            navigate('/login')
        } else {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(getOrderList())
        }
    }
    , [userInfo])
    
    return (
            <div>
                <Row>
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Mes commandes</h2>
                                <br></br>
                                <p> 
                                    {loading ? (
                                        <CircularIndeterminate/>
                                    ) :  
                                       (
                                        <Table striped responsive style={{ width: '80%' }} className="table-lg">
                                        <thead>
                                          <tr>
                                            <th >Date</th>
                                            <th >Total</th>
                                            <th>Paid at</th>
                                            <th >Details</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {order.map((order) => (
                                            <tr key={order.id}>
                                              <td>{order.createdAt.substring(0, 10)}</td>
                                              <td>{order.totalPrice}</td>
                                              <td>
                                                {order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times'></i>}
                                              </td>
                                              <td>
                                                  <LinkContainer to={`/order/${order.id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                  </LinkContainer> 
                                              
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
 
                                       )
                                    }
                                    <strong></strong>
                                   <Image src=""/>
                                    
                                </p>
                            </ListGroupItem>

                        </ListGroup>

                    </Col>
                </Row>

            </div>
    )

}

