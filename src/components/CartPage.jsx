import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/CartPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarBuyer from './NavbarBuyer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItem, setCartItem] = useState({ quantity: 1 });

  const navigate = useNavigate();
  const username = localStorage.getItem("id");



 

  
  const fetchCartItems = async () => {
    try {
      
      const response = await axios.get(`http://localhost:8082/cart/viewCartByUser/${username}`);
      setCart(response.data);
      setCartItems(response.data.items);
      
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (cropId) => {
    try {
  
      await axios.post(`http://localhost:8082/cart/add/${cropId}/${username}`, cartItem);
      fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  const removeFromCart = async (cartId, cropId, quantity) => {
    try {
      if (quantity > 1) {
        await axios.delete(`http://localhost:8082/cart/remove/${cartId}/${cropId}/${1}`);
      } else {
        await axios.delete(`http://localhost:8082/cart/remove/${cartId}/${cropId}/${quantity}`);
      }
      fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleOnClick = async (id) => {
    try {
        const response = await axios.post(
          `http://localhost:8085/order/placeOrder/${id}`
        );
        console.log(response.data)
        console.log(response.data.id)
        const orderId = response.data.id;
       // alert("Order Created Successfully!!!");

      navigate(`/order/getOrderById/${orderId}`);
      } catch (error) {
        console.error('Error creating the order:', error);
      }   
    
  };


  // const getItemCountInCart = () => {
  //   return cartItems.reduce((count, item) => count + item.quantity, 0);
  // };

  // const resetQuantity= () =>{
  //   let newCartItems = [...cartItems];
  //   newCartItems.map((item)=>{
  //     item.quantity = 0;
  //   })
  //   setCartItems(newCartItems);
  //   setTotalPrice(0);
  // }

  return (
    <div className="cart-container ">
      <NavbarBuyer/>
      <header className='cart-header'>
        <h1 ><FontAwesomeIcon icon={faCartShopping}/>
        {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
   {getItemCountInCart()}
    
  </span> */}
        Your Shopping Cart
        </h1>
        </header>
      
      {cartItems.length === 0 ? (
        <p style={{fontWeight:"bold"}}>Your cart is empty!! <Link to={'/buyer'}>Go Back to Shopping?</Link></p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            
            <li key={item.id} className="cart-item">
              <span>{item.cropName} - ₹{item.subTotal}</span>
  
              <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeFromCart(cart.id, item.cropId, item.quantity)}
                >
                  -
                </button>
                <button type="button" className="btn btn-warning">
                  {item.quantity}
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => addToCart(item.cropId)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <p className="cart-total">
          <button
            type="button"
            className="btn btn-primary col-8 bg-light text-black text-center"
          >
            Total: ₹{totalPrice}
          </button>
          <button type="button" className="btn btn-primary col-8"
          onClick={() => handleOnClick(cart.id)}>
          
            Proceed to Checkout
            
          </button>
        </p>
      )}
    </div>
  );
  
}
export default CartPage;
