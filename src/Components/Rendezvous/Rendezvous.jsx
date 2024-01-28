import React, { useEffect, useState } from 'react';
import './Rendezvous.css';
import axios from 'axios';
import RendezVousItem from '../AvocatRendezVous/rendezvousitem';

const Rendezvous = () => {
  const [rendezVousList, setRendezVousList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('URL'); // Remplacez 'URL' par l'URL réelle de votre endpoint
        setRendezVousList(response.data);
      } catch (error) {
        console.error('Error fetching rendezvous data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='everything-all'>
      <h1>Mes Rendez-Vous</h1>
      <div className='Rendez-passe-container'>
        <p>Rendez-vous : </p>
        <div className='p-tags'>
          <p>Date</p>
          <p>Heure</p>
          <p>Avocat</p>
          <p>Option</p>
        </div>
        {rendezVousList.map((rendezVous, index) => (
          <RendezVousItem
            key={index}
            date={rendezVous.date}
            heure={rendezVous.heure}
            client={rendezVous.client}
          />
        ))}
      </div>
    </div>
  );
};

export default Rendezvous;
