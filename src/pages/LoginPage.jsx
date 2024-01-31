import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailed } from '../slices/userSlice';
import { login, fetchOrders } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/auth/login', {
        email: data.email,
        password: data.password,
      })

      console.log('Login response:', response.data)

      if (response.data && response.data.token) {
        dispatch(loginSuccess(response.data));
        dispatch(login({ token: response.data.token })); //Removes the userId
        navigate('/userpage'); //Adjusts the route based on your application structure

        console.log('Login successful')
        setStatus('Login successful')
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login error:', error); //Logs the error object to the console
      dispatch(loginFailed(error.message)); //Dispatchs the error message instead of the error object

      console.log('Login failed');
      setStatus('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card">
        
            <div className="card-header">
              <h2 className="card-title">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-group">
                  <label htmlFor="email">E-postadress:</label>
                  <input id="email" {...register('email', { required: true })} autoComplete="username" className="form-control" />
                  {errors.email && <p className="text-danger">E-postadress är obligatoriskt</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input id="password" type="password" {...register('password', { required: true })} autoComplete="current-password" className="form-control" />
                  {errors.password && <p className="text-danger">Lösenord är obligatoriskt</p>}
                </div>
                <button type="submit" className="btn btn-primary btn-lg mt-3">Logga in</button>
                <p className='mt-3'> Har du inte ett konto? <Link to='/register'>Registerera dig här!</Link></p>
              </form>
              {status && <p className="mt-3 text-success">{status}</p>}
              {status === 'Login failed' && <p className="mt-3 text-danger">Ogiltig e-postadress och/eller lösenord</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;