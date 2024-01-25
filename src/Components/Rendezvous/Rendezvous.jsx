import React from 'react';
import './Rendezvous.css';

const Rendezvous = () => {
  return (
    <div className='everything-all'>
      <h1>Mes Rendez-Vous</h1>
      <div className='Rendez-passe-container'>
        <p>Rendez-vous passés</p>
        <div className='p-tags'>
          <p>Date</p>
          <p>Heure</p>
          <p>Avocat</p>
          <p>Option</p>
        </div>
      </div>
      <div className='Rendez-venir-container'>
        <p>Rendez-vous a venir</p>
        <div className='p-tags'>
          <p>Date</p>
          <p>Heure</p>
          <p>Avocat</p>
          <p>Option</p>
        </div>
      </div>
    </div>
  );
};

export default Rendezvous;
