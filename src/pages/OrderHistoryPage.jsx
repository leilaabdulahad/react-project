import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder, selectOrder, selectId } from '../slices/orderHistorySlice';

import { useParams } from 'react-router-dom';

const OrderHistoryPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Use the selector directly without wrapping it with useMemo
    const selectedOrder = useSelector(selectOrder);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrder(id));
        }
    }, [dispatch, id]);

    return (
        <div>
            <h1>Order History</h1>
            {selectedOrder ? (
                <div>
                    <h4>Order ID: {selectedOrder._id}</h4>
                    <p>Total Price: {selectedOrder.totalPrice}</p>
                 
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderHistoryPage;
