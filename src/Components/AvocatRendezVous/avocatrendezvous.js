import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RendezVousItem from './rendezvousitem';
import './avocatrendezvous.css';

const AvocatRendezVous = () => {
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
    <div className='avocatrendezvous'>
      <div className='title'>
        <h1>Mes Rendez-Vous</h1>
      </div>
      <div className='titre'>
        <h2>Date</h2>
        <h2>Heure</h2>
        <h2>Client</h2>
        <h2>Option</h2>
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
  );
};

export default AvocatRendezVous;


