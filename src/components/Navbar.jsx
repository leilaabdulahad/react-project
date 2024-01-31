import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItemsCount } from '../slices/cartSlice'
import { selectIsAuthenticated, logout } from '../slices/authSlice'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import '../App.css';

const NavigationBar = () => {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartItemsCount)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" expand="lg" className="justify-content-between navbar">
      <Navbar.Toggle className='toggle' aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center custom-navbar-collapse">
        <Nav className="d-flex justify-content-center">
          <Nav.Link className='d-flex justify-content-center navbar-links' as={Link} to="/">Hem</Nav.Link>
          <Nav.Link className='d-flex justify-content-center navbar-links' as={Link} to=''>Om oss</Nav.Link>
          <Nav.Link className='d-flex justify-content-center navbar-links' as={Link} to='/contact'>Kontakta oss</Nav.Link>
          {!isAuthenticated && <Nav.Link className='d-flex justify-content-center navbar-links' as={Link} to='/register'>Registrera</Nav.Link>}
          {isAuthenticated ? (
            <>
              <Nav.Link className='d-flex justify-content-center navbar-links' as={Link} to='/userpage'>Mitt konto</Nav.Link>
              <Nav.Link className='d-flex justify-content-center navbar-links' onClick={handleLogout}>Logga ut</Nav.Link>
            </>
          ) : (
            <Nav.Link className='d-flex justify-content-center navbar-links' as={Link} to='/loginpage'>Logga in</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;