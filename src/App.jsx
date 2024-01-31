import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import Contact from './pages/ContactPage'
import CartPage from './pages/CartPage'
import Payment from './pages/PaymentPage'
import Register from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import UserPage from './UserPage'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from './slices/authSlice'
import OrderHistoryPage from './pages/OrderHistoryPage'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
//When the App mounts the useEffect hook checks if auth.token is truthy(=if user is logged in)
//If the user is logged in, the fetchOrders dispatch is called to fetch the user's order history
//Placing the this here is to ensure that the fetchOrders action is dispatched at the application level
  useEffect(() => {
    if (auth.token) {
      dispatch(fetchOrders());
    }
  }, [auth.token, dispatch]);


  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:_id" element={<DetailPage />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/userpage" element={auth.token ? <UserPage /> : <Navigate to="/loginpage" />} />
        <Route path="/orders/:orderId" element={auth.token ? <OrderHistoryPage /> : <Navigate to="/loginpage" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;