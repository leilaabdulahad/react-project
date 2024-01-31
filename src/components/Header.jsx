import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItemsCount } from '../slices/cartSlice'
import { selectIsAuthenticated } from '../slices/authSlice' 
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Header = () => {
    const cartCount = useSelector(selectCartItemsCount)
    const isAuthenticated = useSelector(selectIsAuthenticated) 

    return (
        <div className='header-container p-0 m-0'>
            <Link to='/' className='text-decoration-none'>
                <p data-cy = "webPageTitle" className='brand-name ms-2 mt-2'>Tech Torget</p>
            </Link>

            <div className='d-flex justify-content-end align-items-center m-0'>
                {isAuthenticated ? (
                    <Link to='/userpage'>
                        <i className="bi bi-person login-icon"></i> 
                    </Link>
                ) : (
                    <Link to='/loginpage'>
                        <i className="bi bi-person login-icon"></i>
                    </Link>
                )}

                <Link to='/cartpage' className='text-decoration-none m-2' >
                    <div className='d-flex align-items-center'>
                        <i className="bi bi-cart header-cart mr-1 ms-1"></i> 
                        <small className='cart-count mb-4 m-0 postion-relative' style={{ opacity: cartCount > 0 ? 1 : 0 }}>{cartCount}</small>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header