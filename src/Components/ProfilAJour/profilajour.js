import React from 'react';
import './profilajour.css';

export const ProfilAJour = () => {
  // Fonction pour gérer le clic sur le bouton
  const handleClick = () => {
    // Sélectionnez l'élément "modifier" par son ID ou une autre méthode de sélection
    const modifierButton = document.getElementById('modifierButton');

    // Vérifiez si l'élément "modifier" existe avant de simuler le clic
    if (modifierButton) {
      modifierButton.click();
    }
  };

  return (
    <div className='maj'>
      <h1>Mettre à jour votre profil</h1>
      <div className='buttonmaj'>
        {/* Ajoutez la fonction de gestion de l'événement onClick */}
        <button onClick={handleClick}>Cliquez ici</button>
      </div>
    </div>
  );
};

export default ProfilAJour;
