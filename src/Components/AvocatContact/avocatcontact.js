import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentForm from '../prendrerendezvous/prendrerendezvous'; 
import email from "../../img/email.png";
import phone from "../../img/phone.png";
import "./avocatcontact.css";

const AvocatContact = () => {
  const [avocat, setAvocat] = useState({});
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    const fetchAvocatData = async () => {
      try {
        const response = await axios.get('URL'); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'avocat:', error);
      }
    };

    fetchAvocatData();
  }, []);

  const handleShowForm = () => {
    setShowAppointmentForm(true);
  };

  const handleCloseForm = () => {
    setShowAppointmentForm(false);
  };

  return (
    <div className='contactrendezvous'>
      <div className='contact'>
        <div className='titre'>
          <h1>Contactez l'avocat :</h1>
        </div>
        <div className='phoneemail'>
          <div className='phone'>
            <img src={phone} alt="Phone Icon" />
            <h4>{avocat.tel}</h4>
          </div>
          <div className='email'>
            <img src={email} alt="Email Icon" />
            <h4>{avocat.email}</h4>
          </div>
        </div>
      </div>
      <div className='buttonrendezvous'>
        <button onClick={handleShowForm}>Prendre un rendez-vous</button>
      </div>
      {showAppointmentForm && (
        <div className="overlay">
          <div className="formContainer">
            <button className="closeButton" onClick={handleCloseForm}>
              Fermer
            </button>
            <AppointmentForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvocatContact;

