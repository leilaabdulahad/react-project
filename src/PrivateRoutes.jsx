// PrivateRoutes.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoutes = ({ auth, children }) => {
  console.log('PrivateRoutes rendered');
  console.log('Auth prop:', auth); 
  
  const isAuthenticated = auth.token;

  if (isAuthenticated) {
    console.log('Authenticated')
    return <Route>{children}</Route>;
  } else {
    //Redirects to login if not authenticated
    console.log('Redirect to login')
    return <Navigate to="/loginpage" />;
  }
};

export default PrivateRoutes;
