import React, {useState, useEffect, Fragment} from "react"
import { Row, Col,Image,ListGroup, Button, ListGroupItem , Card, Form} from "react-bootstrap"
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider"
import {Link, useParams} from "react-router-dom"
import './productDetail.css'
import {useDispatch, useSelector} from 'react-redux'
import CircularIndeterminate from "../../Loader";
import { Rating } from "@mui/material"
import { getListProductDetails } from "../../../redux/actions/productActions"
//import { CartProvider, useCart } from "react-use-cart";
import { addToCart } from "../../../redux/actions/cartActions"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Typography, CardContent, CardMedia, Select, MenuItem } from '@mui/material';





const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail.productDetail)
    const dataProduct = productDetail
    const productLoading = useSelector(state => state.productDetail)
    const {loading, error, product } = productLoading
    const {id} = useParams()

    const addItemToCart = (id, quantity) => {
        dispatch(addToCart(id, quantity))
        
    }

    useEffect(() => {
    
      dispatch(getListProductDetails(id))
         
    }, [dispatch]
    )


   
 
    return (
        <div className="product-details-page">
          <Link to="/" className="btn btn-light my-3">
            Go back
          </Link>
    
          {loading ? (
            <CircularIndeterminate />
          ) : (
            <Fragment>
              <Grid  container spacing={1}>
                <Grid  item md={6} xs={12} lg={4} >
                    <CardMedia
                      className="imgProduct"
                      component="img"
                      alt={dataProduct?.title}
                      height="auto"
                      image={dataProduct?.image}
                     
                    />
                 
                </Grid>
                <Grid    item md={6} xs={12} >
             
                  <Card className="cardDetailsProduct" >
                    <CardContent  >
                      <Typography variant="h5" component="div">
                        {dataProduct?.title}
                      </Typography>
                      <Rating />
                      <Typography variant="h6" color="textSecondary">
                        {dataProduct?.price}€ 
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {dataProduct?.description}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="h6" color="textSecondary">
                        Status: {dataProduct?.stock > 0 ? 'In stock' : 'Not in stock'}
                      </Typography>
                      {dataProduct?.stock > 0 && (
                        <div>
                          <Typography variant="h6" color="textSecondary">
                            Quantity:
                          </Typography>
                          <Select
                            label="Quantité"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            fullWidth
                          >
                            {[...Array(dataProduct?.stock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      )}
                      <Button
                        onClick={() => addItemToCart(dataProduct?.id, parseInt(quantity))}
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{width: '110px', marginLeft: '0px'}}
                      >
                        add to cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </div>
      );
    };
            
export default ProductDetail