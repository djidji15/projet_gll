import React from 'react';
import axios from 'axios';
import "./rendezvousitem.css";

const RendezVousItem = ({ date, heure, client }) => {
  const handleSupprimer = async () => {
    try {
      await axios.delete('URL_DE_VOTRE_API_DJANGO_SUPPRESSION', {
        data: {
          date: date,
          heure: heure,
          client: client,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mettre à jour l'interface utilisateur ou faire d'autres actions si nécessaire

    } catch (error) {
      console.error('Error deleting rendez-vous:', error);
    }
  };

  return (
    <div className="rendezvous-item">
      <h3>{date}</h3>
      <h3>{heure}</h3>
      <h3>{client}</h3>
      <button onClick={handleSupprimer}>Supprimer</button>
    </div>
  );
};

export default RendezVousItem;

