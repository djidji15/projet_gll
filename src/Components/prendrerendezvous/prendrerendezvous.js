import React, { useState } from 'react';
import axios from 'axios';
import './prendrerendezvous.css';

const AppointmentForm = ({ onBookAppointment, existingAppointments }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const availableTimes = generateAvailableTimes(existingAppointments);

  function generateAvailableTimes(existingAppointments) {
    const availableTimes = [];
    const startHour = 8;
    const endHour = 17;

    if (existingAppointments && existingAppointments.length > 0) {
      for (let hour = startHour; hour <= endHour; hour++) {
        const time = `${hour}:00`;

        // Vérifiez si l'heure est déjà prise
        const isTimeTaken = existingAppointments.some(appointment => appointment.time === time);

        if (!isTimeTaken) {
          availableTimes.push(time);
        }
      }
    } else {
      // Si existingAppointments est undefined ou vide, toutes les heures sont disponibles
      for (let hour = startHour; hour <= endHour; hour++) {
        availableTimes.push(`${hour}:00`);
      }
    }

    return availableTimes;
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
    // Réinitialisez l'heure lorsqu'une nouvelle date est sélectionnée
    setTime('');
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleBookAppointment = async () => {
    // Vérifiez si l'heure est parmi les heures disponibles
    const isTimeAvailable = availableTimes.includes(time);

    if (isTimeAvailable) {
      // Validation des données et traitement du rendez-vous
      if (date && time) {
        const appointmentDetails = {
          date,
          time,
        };

        try {
          // Utilisation d'Axios pour soumettre les données du formulaire
          await axios.post('URL_DE_VOTRE_API_DJANGO_RESERVATION', appointmentDetails);
          onBookAppointment(appointmentDetails);
          setSuccess(true); // Indique que la réservation a réussi
          setError(''); // Réinitialisez l'erreur s'il y en avait une précédemment
        } catch (error) {
          console.error('Error submitting appointment:', error);
          setError('Une erreur s\'est produite lors de la réservation. Veuillez réessayer.');
        }
      } else {
        setError('Veuillez sélectionner une date et une heure.');
      }
    } else {
      setError('Ce créneau horaire est déjà réservé. Veuillez choisir un autre créneau.');
    }
  };

  // Affiche le message de succès si la réservation a réussi
  if (success) {
    return (
      <div className="success-message">
        <p>Votre rendez-vous a été réservé avec succès!</p>
      </div>
    );
  }

  return (
    <div className="appointment-form">
      <h1>Prendre un rendez-vous</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Date:</label>
      <input type="date" value={date} onChange={handleDateChange} />
      <br />
      <label>Heure:</label>
      <select value={time} onChange={handleTimeChange}>
        <option value="" disabled>Sélectionnez une heure</option>
        {availableTimes.map((availableTime) => (
          <option
            key={availableTime}
            value={availableTime}
          >
            {availableTime}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleBookAppointment}>Réserver le rendez-vous</button>
    </div>
  );
};

export default AppointmentForm;



