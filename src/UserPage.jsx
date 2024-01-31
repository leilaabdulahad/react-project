import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectOrders, fetchOrders } from './slices/authSlice';
import { fetchOrderById, selectSelectedOrder, clearSelectedOrder } from './slices/ordersSlice';
import { Modal } from 'react-bootstrap'

const UserPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const orders = useSelector(selectOrders);
  const selectedOrder = useSelector(selectSelectedOrder);
  const [clickedOrder, setClickedOrder] = useState(null); 

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleOrderClick = (orderId) => {
    if (orderId === clickedOrder) {
      setClickedOrder(null);
      dispatch(clearSelectedOrder());
    } else {
      setClickedOrder(orderId);
      dispatch(clearSelectedOrder());
      dispatch(fetchOrderById(orderId));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6"> 
          {isAuthenticated ? (
            <div>
              <h1 className="mb-4 text-center">Min sida</h1>
              <section>
                <h2 className="mb-3">Order historik:</h2>
                {orders.map(order => (
                  <div key={order._id} className="order-container card mb-3" onClick={() => handleOrderClick(order._id)}>
                    <div className="card-body">
                      <p className="card-title h6 pb-2 mb-0">Ordernummer: {order._id}</p>
                      <p className="card-text">Beställningsdatum: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Modal show={clickedOrder === order._id && selectedOrder} onHide={() => handleOrderClick(order._id)}>                      
                    <Modal.Header closeButton>
                        <Modal.Title>Order detaljer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedOrder && selectedOrder.products.map((item, index) => {
                          return (
                            <div key={item.product._id} className={`card-body py-3 ${index < selectedOrder.products.length - 1 ? 'border-bottom' : ''}`}>
                              <h4 className="card-title">{item.product.name}</h4>
                              {index === 0 && (
                                <>
                                  <p className='border-bottom'> Ordernummer: {order._id}</p>
                                  <p className='border-bottom'>Betalningsmetod: Kort / Internetbank / Swish </p>
                                  <p className='border-bottom'>Leveranssätt: Postpaket</p>
                                </>
                              )}
                              <img src={item.product.images[0]} alt={item.product.name} className="img-fluid" />
                              <p className="card-text border-bottom">{item.product.price}:-</p>
                              <p className="card-text border-bottom">Antal: {item.quantity}</p>
                            </div>
                          );
                        })}
                        <p className='border-bottom'>Totalsumma: {
                          selectedOrder && selectedOrder.products.reduce((total, item) => total + item.product.price * item.quantity, 0)
                        }:-</p>
                        <p className='border-bottom'>Totalt antal produkter: {
                          selectedOrder && selectedOrder.products.reduce((total, item) => total + item.quantity, 0)
                        }</p>
                      </Modal.Body>
                    </Modal>
                  </div>
                ))}
              </section>
            </div>
          ) : (
            <div className="alert alert-warning">
              <p>Du måste logga in.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
          }
    export default UserPage