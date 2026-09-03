import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?auto=format&fit=crop&w=600&q=80", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=600&q=80", description: "Calming scent, helps reduce stress.", cost: "$18" },
        { name: "Jasmine", image: "https://www.petalrepublic.com/wp-content/uploads/2021/04/Ultimate-Guide-to-Jasmine-Flower-Meaning-Types-and-Uses-1536x1024.jpeg", description: "Sweet fragrance, promotes relaxation.", cost: "$20" },
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Aloe Vera", image: "https://growyouryard.com/wp-content/uploads/2020/09/how-long-does-it-take-for-aloe-vera-to-grow-2048x1365.jpg", description: "Soothes burns and skin irritations.", cost: "$10" },
        { name: "Mint", image: "https://www.littleyellowwheelbarrow.com/wp-content/uploads/2021/05/types-of-mint-1-2-scaled.jpg", description: "Aids digestion and freshens breath.", cost: "$8" },
      ]
    }
  ];
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" />
            <a href="/" style={{textDecoration: 'none', color: 'white'}}>
              <div>
                <h3 style={{color: 'white', margin: 0}}>Paradise Nursery</h3>
                <i style={{color: 'white', fontSize: '12px'}}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div className="ul">
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          </div>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
              <h1 className="cart">🛒 <span className="cart_quantity_count">{calculateTotalQuantity()}</span></h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1 className="plant_heading">{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className={`product-button ${addedToCart[plant.name] || cartItems.some(i => i.name === plant.name) ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(i => i.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(i => i.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
