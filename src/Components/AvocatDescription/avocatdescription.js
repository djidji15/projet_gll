import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './avocatdescription.css';

const AvocatDescription = () => {
  const [avocat, setAvocat] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('URL');
        setAvocat(response.data);
      } catch (error) {
        console.error('Error fetching avocat data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='description'>
      <div className='titre'>
        <h1>Description :</h1>
      </div>
      <div className='contenu'>
        <p>{avocat.description}</p>
      </div>
    </div>
  );
};

export default AvocatDescription;


