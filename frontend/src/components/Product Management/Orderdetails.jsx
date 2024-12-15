import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import './Orderdetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();  // Get the order ID from the URL params
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the order details from the backend
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (err) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { customer, items, paymentDetails, shippingDetails, orderSummary, status, adminNotes } = orderDetails;

  return (
    <div className="order-details">
      <h2>Order ID: {orderId}</h2>

      <div className="customer-info">
        <h3>Customer Information</h3>
        <p>Name: {customer.name}</p>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Shipping Address: {customer.shippingAddress}</p>
      </div>

      <div className="payment-info">
        <h3>Payment Information</h3>
        <p>Payment Status: {paymentDetails.status}</p>
        <p>Payment Method: {paymentDetails.method}</p>
        <p>Amount Paid: ${paymentDetails.amount}</p>
      </div>

      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <p>Shipping Status: {shippingDetails.status}</p>
        <p>Shipping Method: {shippingDetails.method}</p>
        <p>Tracking Number: {shippingDetails.trackingNumber}</p>
        <p>Expected Delivery Date: {shippingDetails.expectedDeliveryDate}</p>
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        {items.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Unit Price: ${item.price}</p>
            <p>Total: ${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ${orderSummary.subtotal}</p>
        <p>Discount: ${orderSummary.discount}</p>
        <p>Taxes: ${orderSummary.taxes}</p>
        <p>Shipping: ${orderSummary.shipping}</p>
        <h4>Total Amount: ${orderSummary.total}</h4>
      </div>

      <div className="order-status">
        <h3>Order Status</h3>
        <p>Status: {status}</p>
      </div>

      <div className="admin-notes">
        <h3>Admin Notes</h3>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Add internal notes"
        />
      </div>

      <div className="order-actions">
        <Button variant="contained" color="primary">Mark as Shipped</Button>
        <Button variant="contained" color="secondary">Cancel Order</Button>
        <Button variant="outlined">Generate Invoice</Button>
      </div>
    </div>
  );
};

export default OrderDetails;
