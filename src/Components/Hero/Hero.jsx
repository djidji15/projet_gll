import React from 'react';
import img1 from '../../Assets/Hero.png';
import './Hero.css';

const Hero = () => {
  return (
    <div className='Hero'>
      <div className='Image'>
        <img src={img1} alt='' />
      </div>
      <div className='hero-text-container'>
        <p>Bienvenue sur</p>
        <p>Mouhami DZ</p>
        <p>Trouvez l'Avocat Parfait en Algérie</p>
      </div>
      <div className='Trouver-avocat-container'>
        <p>Trouvez l'Avocat Idéal</p>
        <div className='all-container'>
          <input type='text' placeholder='Nom' />
          <input type='text' placeholder='Specialte' />
          <input type='text' placeholder='Region' />
          <button>Rechercher</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
