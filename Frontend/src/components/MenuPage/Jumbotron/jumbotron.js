import Carousel from 'react-bootstrap/Carousel';
import React from 'react'

export const  Jumbotron = () => {
  return (
    <Carousel className='bg-dark' pause='hover' fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={'500px'}
          width= {'500px'}
          src= {process.env.REACT_APP_API_URL + "photo/Odinateur_o6sYyJh.jpg"}
          alt="First slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        height={'500px'}
          width= {'50px'}
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL + "photo/pexels-pixabay-38568.jpg"} 
          alt="Second slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        height={'500px'}
       
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL + "photo/pexels-toni-cuenca-585752.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
        height={'500px'}
       
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL + "photo/pexels-kaboompics-com-6416.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

