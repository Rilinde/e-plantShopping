import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
          description: "Calming scent used in aromatherapy.",
          cost: "$20"
        },
        {
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma used in teas.",
          cost: "$12"
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating scent for cooking.",
          cost: "$15"
        }
      ]
    }
  ];

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <a href="/" onClick={handleHomeClick} className="tag_home_link">
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </a>
        </div>

        <div>
          <a href="#" onClick={handlePlantsClick} className="nav-link">
            Plants
          </a>
          <a href="#" onClick={handleCartClick} className="nav-link">
            🛒 {totalQuantity}
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((item, index) => (
            <div key={index}>
              <div className="plantname_heading">
                <h2 className="plant_heading">{item.category}</h2>
              </div>

              <div className="product-list">
                {item.plants.map((plant, i) => (
                  <div key={i} className="product-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="product-image"
                    />
                    <h3 className="product-title">{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => dispatch(addItem(plant))}
                      disabled={isAddedToCart(plant.name)}
                      style={{
                        backgroundColor: isAddedToCart(plant.name) ? 'gray' : ''
                      }}
                    >
                      {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
