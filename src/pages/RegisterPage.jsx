import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setField, setRegistrationStatus, setPasswordsMatch, setFirstNameError, setLastNameError, setPasswordError, setEmailError } from '../slices/registerSlice';
import { Link } from 'react-router-dom';
import { login } from '../slices/authSlice';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.register);
  const { firstNameError, lastNameError, passwordError, passwordsMatch, registrationStatus, emailError } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim()
    dispatch(setField({ field: name, value: trimmedValue }));

    if (name === 'firstName') {
      dispatch(setFirstNameError(''));
    }

    if (name === 'lastName') {
      dispatch(setLastNameError(''));
    }

    if (name === 'password' || name === 'confirmPassword') {
      dispatch(setPasswordError(''));
      if (formData.password !== formData.confirmPassword) {
        dispatch(setPasswordsMatch('Lösenorden matchar inte. Var god försök igen.'));
      } else {
        dispatch(setPasswordsMatch(''));
      }
    }

    if (name === 'email' && !validateEmail(trimmedValue)) {
      dispatch(setEmailError('Ogiltig e-postadress. Vad god försök igen.'))
    } else {
      dispatch(setEmailError(''))
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  } 

  const validatePassword = () => {
    const { password } = formData;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{5,}$/;
    return passwordRegex.test(password);
  };

  const register = async (formData) => {
    try {
      const res = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if(res.status !== 201) {
        throw new Error(data)
      }

      localStorage.setItem('token', data.token);
      dispatch(setRegistrationStatus('success'));
      return data; // return the data from the API response
        
    } catch (error) {
      console.error('Registration failed:', error.message);
      dispatch(setRegistrationStatus('failure'));
      return { error: error.message }
    }
  } 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    } else {
      dispatch(setFirstNameError(''));
    }

    if (formData.lastName.length < 2) {
      dispatch(setLastNameError('Efternamn måste innehålla minst 2 bokstäver.'));
      return;
    } else {
      dispatch(setLastNameError(''));
    }

    if (!validatePassword()) {
      dispatch(setPasswordError('Lösenordet måste innehålla minst 5 tecken, en stor bokstav, en siffra och ett specialtecken.'));
      return;
    } else {
      dispatch(setPasswordError(''));
    }  if (!validateEmail(formData.email)) {
      dispatch(setEmailError('Ogiltig e-postadress. Vad god försök igen.'));
      return;
    } else {
      dispatch(setEmailError(''));
    }
    // Call the register function instead of the fetch API directly
    const result = await register(formData);
    console.log(result);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Registrera konto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Förnamn:
            </label>
            <input
              type="text"
              className={`form-control ${firstNameError ? 'is-invalid' : ''}`}
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete='off'
            />
            {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Efternamn:
            </label>
            <input
              type="text"
              className={`form-control ${lastNameError ? 'is-invalid' : ''}`}
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete='off'
            />
            {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-postadress:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            {emailError && <div className="invalid">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Lösenord:
            </label>
            <input
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
           
            <small className="text-muted">
              Lösenordet måste vara minst 5 tecken långt, innehålla minst en stor bokstav och en siffra.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Bekräfta lösenord:
            </label>
            <input
              type="password"
              className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {!passwordsMatch && (
              <div className="invalid-feedback">Lösenorden matchar inte. Var god försök igen.</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        {registrationStatus === 'success' && (
          <div className="alert alert-success mt-3" role="alert">
            Registrering lyckades! Du kan nu logga in.
          </div>
        )}

        {registrationStatus === 'failure' && (
          <div className="alert alert-danger mt-3" role="alert">
            Registrering misslyckades. Var god försök igen.
          </div>
        )}

        <div className='mt-3'>
          <p>Har du redan ett konto? <Link to='/loginpage'>Logga in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm; 