import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './styles/OrderDetailsPage.css';
import { Link } from "react-router-dom";
import NavbarBuyer from "./NavbarBuyer";


const OrderDetailsPage = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();


   
  
  const orderName = localStorage.getItem("userName");

  useEffect(() => {
    // Fetch the order by its ID from the backend API when the component mounts
    axios
      .get(`http://localhost:8085/order/getOrderById/${orderId}`)
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setLoading(false);
      });
  }, [orderId]); // Include orderId in the dependency array

  return (
    <div>
      <NavbarBuyer/>
      <h1>Order Details</h1>
      {loading ? (
        <p className="loading-message">Loading order details...</p>
      ) : (
        <div>
          {order ? (
            <div className="order-details-container">
              <p>Order ID: {order.id}</p>
              <p>Order Date: {order.orderDate}</p>
              <p>Ordered For: {orderName}</p>
              <p>User Name: {order.userName}</p>
              <p>Total Price: ₹{order.totalPrice.toFixed(2)}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>City: {order.address.city}</p>
              <p>Pin Code: {order.address.pinCode}</p>
              <p>House Number: {order.address.houseNumber}</p>
              <p>Area: {order.address.area}</p>
              <p>State: {order.address.state}</p>
              <h2>Ordered Crops:</h2>
              <ul className="ordered-crops-list">
                {order.orders.map((crop) => (
                  <li key={crop.cropId}>
                    {crop.cropName} - Quantity: {crop.quantity} - Subtotal: ₹{crop.subTotal.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Order not found.</p>
          )}

          <button className="proceed-button"> <Link to={'/payment'}> Proceed to Payment</Link>
           
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
