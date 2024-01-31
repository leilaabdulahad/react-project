import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal, clearCart } from '../slices/cartSlice'
import 'bootstrap/dist/css/bootstrap.min.css'
import { selectToken } from '../slices/authSlice.jsx'
import { purchaseStart, purchaseSuccess, purchaseFailure } from '../slices/purchaseSlice'

const Payment = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const token = useSelector(selectToken);
  const [formErrors, setFormErrors] = useState({})
  const [message, setMessage] = useState(null)

  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!billingInfo.fullName.trim()) {
      formIsValid = false;
      errors["fullName"] = "Var god fyll i ditt namn";
    }

    if (!billingInfo.email.trim()) {
      formIsValid = false;
      errors["email"] = "Var god fyll i din e-postadress";
    }

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!pattern.test(billingInfo.email)) {
      formIsValid = false;
      errors["email"] = "Var god fyll i en giltig e-postadress";
    }

    if (!billingInfo.address.trim()) {
      formIsValid = false;
      errors["address"] = "Var god fyll i din adress";
    }

    if (!billingInfo.cardNumber.trim()) {
      formIsValid = false;
      errors["cardNumber"] = "Var god fyll i ditt kortnummer";
    }

    if (!billingInfo.expirationDate.trim()) {
      formIsValid = false;
      errors["expirationDate"] = "Var god fyll i utgångsdatum";
    }

    if (!billingInfo.cvv.trim()) {
      formIsValid = false;
      errors["cvv"] = "Var god fyll i CVV";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  

  const handleProceedToPayment = async () => {
    if(cartItems.length === 0){
      setMessage('Kundvagnen är tom.')
      return
    }
    if(!validateForm()){
      return
    }
    dispatch(purchaseStart());
    try {
      const orderData = {
        products: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        address: billingInfo.address, 
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/orders', orderData, { headers });

      // Logs the response data
      console.log(response.data); 

      response.data.order.products.forEach(product => {
        console.log('Product ID:', product.product);
        console.log('Quantity:', product.quantity);
      });
      if (response.status === 201) {
        dispatch(purchaseSuccess()); //Dispatchs the purchaseSuccess action
        handleClearCart(); //Clears the cart after the order is saved
        setMessage('Betalt.');

        // Clear the fields
        setBillingInfo({
          fullName: '',
          email: '',
          address: '',
          cardNumber: '',
          expirationDate: '',
          cvv: '',
        });
      } else {
        //Handles non-successful status codes
        console.error('Order error:', response);
        setMessage('Failed to save the order');
        dispatch(purchaseFailure('Failed to save the order'));
      }
    } catch (error) {
  console.error('Order error:', error);
  if (error.response) {
    console.error('Server response:', error.response.data);
  }
  setMessage('Failed to save the order');
  dispatch(purchaseFailure('Failed to save the order'));
}
  };




  
  return (
    <div className="container mt-5">
      <div className="card col-12 col-md-8 col-lg-6 mx-auto">
        <div className="card-body">
        {message && <div className="alert alert-info">{message}</div>}
          <h2 className="card-title text-center mb-4">Betalning</h2>
          {cartItems.map((item, index) => (
            <div key={item._id || index} className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Pris: {item.price}:-</p>
                  </div>
                  <div className="col-4 d-flex justify-content-end align-items-center">
                    <p className="card-text">Antal: {item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <p className="font-weight-bold text-end">Total: {total}:-</p>

          <form>
            <div className="mb-3">
              <label className="form-label">Namn:</label>
              <input type="text" name="fullName" value={billingInfo.fullName} onChange={handleInputChange} className="form-control" data-cy="fullName" />
              <div className="text-danger">{formErrors["fullName"]}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">E-postadress:</label>
              <input type="email" name="email" value={billingInfo.email} onChange={handleInputChange} className="form-control" />
              <div className="text-danger">{formErrors["email"]}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Adress:</label>
              <input type="text" name="address" value={billingInfo.address} onChange={handleInputChange} className="form-control" />
              <div className="text-danger">{formErrors["address"]}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Kortnummer:</label>
              <input type='text' name="cardNumber" value={billingInfo.cardNumber} onChange={handleInputChange} className="form-control" required />
              <div className="text-danger">{formErrors["cardNumber"]}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Datum:</label>
              <input type='text' name='expirationDate' value={billingInfo.expirationDate} onChange={handleInputChange} className="form-control" required />
              <div className="text-danger">{formErrors["expirationDate"]}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">CVV:</label>
              <input type='text' name='cvv' value={billingInfo.cvv} onChange={handleInputChange} className="form-control" required />
              <div className="text-danger">{formErrors["cvv"]}</div>
            </div>
          </form>

          <div className="text-end">
            <button onClick={handleClearCart} className="btn btn-danger me-2">Töm kundvagnen</button>
            <button onClick={handleProceedToPayment} className="btn btn-primary">Betala nu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;