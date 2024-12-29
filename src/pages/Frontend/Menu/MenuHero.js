import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../../Assets/images (1).jpeg'; 
import images from '../../../Assets/images.jpeg';  // Correct image import
 // Correct image import

const MenuHero = () => {
  // Hardcoded data for the featured product
  const product = {
    id: 1,
    name: 'Great Lighting Keyboard',
    price: '$129.99',
    imageUrl: image  // Assign the imported image here
  };

  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1></h1>
          <p>Happiness is a journey</p>
          <p>Resolve to keep happy, and your joy and you shall form an invincible host against difficulties</p>
          <p></p>

          <button className="cta-button" onClick={() => navigate("/product/6053576088")}>
            Add event Now
          </button>
        </div>
        <div className="banner-image">
          <img src={image} alt={product.name} className="me-4" /> 
           {/* Correctly use the imported image */}
          <img src={images} alt={product.name} /> 

        </div>
      </div>
    </section>
  );
};

export default MenuHero;
