import React, { Fragment, useEffect, useState } from "react"
import axios from 'axios';
import './welcome.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from "react-toastify";
import { CartProvider, useCart } from "react-use-cart";
import { ButtonBase, Rating } from "@mui/material";
import { CardImg } from "react-bootstrap";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from "./ProductDetail";
import { Link,LinkConait  } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {getAllProductFromApi} from "../../../redux/actions/productActions";
import Loader from "../../Loader";
import CircularIndeterminate from "../../Loader";
import { Jumbotron } from "../Jumbotron/jumbotron";
import { Figure } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import { LinkContainer } from "react-router-bootstrap";

import { getListImagesProductFromApi } from "../../../redux/actions/productActions";



const Products = () => {


const Img = styled('img')({
      margin: 'auto',
      display: 'block',
      width: '400%',
      height: '400%',
});
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

   // const [showListProduct, setShowListProduct] = useState()
    //const [loader, setLoader] = useState(false)
  console.log(getListImagesProductFromApi())

    useEffect(() => {
      dispatch(getAllProductFromApi())
     
       
  }, [dispatch])

 

        const theme = createTheme();

        
        return (
       
        
            <ThemeProvider theme={theme}> 
              <ToastContainer />
            
              <CssBaseline />
              <AppBar position="relative">
              <Toolbar>
                </Toolbar>
               
              </AppBar>
             
              <main>
                {/* Hero unit */}
               
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    pt: 9,
                    pb: 6,
                  }}
                >
                  <Container maxWidth="md">
                  <Jumbotron/>
                 
                    <Stack
                      sx={{ pt: 1}}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                     
                    </Stack>
                  </Container>
                </Box>
                <Container sx={{ py: 1 }} maxWidth="fixed">
                  {/* End hero unit */}
                  <Grid container paddingRight={2} paddingTop={'50px'} xs={10} md={4} lg={11} paddingLeft={25} spacing={3}  rowSpacing={7} direction={'row'}>
                    {products ? products.map((items) => ( 
                     
                      <Grid item key={items.id}   xs={11} md={6} lg={4}>
                        <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Link to={`/product/${items.id}`}>
                      <CardImg
                        
                        component="img"
                        sx={{
                          // 16:9
                          pt: '56.25%',
                        }}
                        src={items.image}
                        alt="random"
                      />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {items.title}
                    </Typography>
                    <Typography>
                    {items.description}
                  
                    </Typography>
                    <Typography>
                    {items.price}€ 
                  
                    </Typography>
                  
                  
                  </CardContent>
                  <CardActions>
                  
                  </CardActions>
                </Card>
                        
                   
                      </Grid>
                    )): ( 
                      <CircularIndeterminate />
                    )}
                  </Grid>
                </Container>
          
              </main>
              {/* Footer */}
              
              {/* End footer */}
            </ThemeProvider>
                    
                                              
    );
}

export default Products;