import React from 'react';
import backgroundImage from './images/background.jpg'; // Reemplaza 'background.jpg' con el nombre de tu imagen

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <button>Ingresa a la Home Page</button>
    </div>
  );
};

export default LandingPage;