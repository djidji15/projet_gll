import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './avocatinfo.css';

const AvocatInfo = () => {
  const [avocat, setAvocat] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('URL');
        setAvocat(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='infoavocat'>
      <div className='photoinfonotee'>
        <div className='photoinfonote'>
          <div className='photoavocat'>
            <img src={avocat.image} alt={avocat.nom} />
          </div>
          <div className='infonote'>
            <div className='info'>
              <div className='infoligne'>
                <p>Nom et prénom : </p> <h3> {avocat.nom}</h3>
              </div>
              <div className='infoligne'>
                <p>Adresse : </p>
                <h3> {avocat.adresse}</h3>
              </div>
              <div className='infoligne'>
                <p>Spécialité : </p>
                <h3> {avocat.specialite}</h3>
              </div>
            </div>
            <div className='note'>
              <div className='infoligne'>
                <p>Note : </p>
                <h3> {avocat.note}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvocatInfo;



