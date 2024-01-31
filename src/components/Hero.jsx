import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../assets/detailhero.jpg';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  return (
    <div className='container-fluid p-0 bg-dark'>
      <div className='container-fluid hero-container p-5' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='row align-items-center'>
          <div className='col-md-6'>
            <h1 className='display-4 text-light'>Rean fortsätter!</h1>
            <p className='lead text-light'>Storsäljare till Black Friday priser!</p>
            <ScrollLink
              to="products"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="btn btn-primary mb-4"
            >
              Shoppa nu
            </ScrollLink>
          </div>
          <div className='col-md-6'>
            <img className='img-fluid rounded' src="./src/assets/header.jpg" alt="Half shut laptop" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;