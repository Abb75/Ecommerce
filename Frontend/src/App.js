
import './App.css';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer/Footer';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/MenuPage/Products/product';
import { Cart } from './components/Cart/cart';
import Login from './components/AccountUser/LoginUser/Login';
import Registration from './components/AccountUser/RegistrationUser/Registration';
import Logout from './components/AccountUser/LogoutUser/logout';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from 'react-use-cart';
import { Offcanvas } from "react-bootstrap"
import ErrorPages from './components/ErrorPages/errorPages';
import ProductDetail from './components/MenuPage/Products/ProductDetail';
import ProfileUser from './components/AccountUser/ProfileUser/profileUser';
import Shipping from './components/Shipping/shipping';
import Payment from './components/Payment/payment';
import StripeContainer from './components/Stripe/StripeContainer';
//import StripeContainer from './components/Stripe/StripeContainer'
import { Elements } from '@stripe/react-stripe-js';
import { OrderHistory } from './components/AccountUser/OrderHistory/orderHistory';
import { OrderDetails } from './components/AccountUser/OrderDetails/orderDetails';
//import { Provider } from 'react-redux';
import { PasswordReset } from './components/AccountUser/PasswordReset/passwordReset';
import { UserList } from './components/Admin/usersList';
import { Toaster } from 'sonner';




function App() {
  return (
    ///<div  style={{backgroundColor: '#dbdbe2'}}>
    
      
      <BrowserRouter>
    
      <ToastContainer/> 
      
      
      <Toaster richColors/>

      <CartProvider>
        <div class="main-container">
          <Navbar />
              <Routes>
                <Route path='*' element={<ErrorPages/>}/> 
                <Route path='/' element={<Products /> } />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/login' element={<Login />}/>
                <Route path='/product/:id' element={<ProductDetail />}/>
                <Route path='/register' element={<Registration />}/>
                <Route path='/profile' element={<ProfileUser/>}/>
                <Route path='/shipping' element={<Shipping />}/>
                <Route path='/payment' element={<StripeContainer />} />
                <Route path='/order_history' element={<OrderHistory />} />
                <Route path='/order/:id' element={<OrderDetails />} />
                <Route path='/password_reset' element={<PasswordReset />} />
                <Route path='/admin/users_list' element={<UserList />} />

                


                

              
               
              </Routes> 
          <Footer />
        </div>
      </CartProvider>
        
      </BrowserRouter>
    
   
  );
}

export default App;
