import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getNumericCost = (cost) => Number(String(cost).replace('$', ''));

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + getNumericCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: -1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (getNumericCost(item.cost) * item.quantity).toFixed(2);
  };

  const totalPlants = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Plants: {totalPlants}</h3>

      <div>
        {cart.length === 0 ? (
          <p style={{ color: 'black', textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>

                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        Grand Total: ${calculateTotalAmount()}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
