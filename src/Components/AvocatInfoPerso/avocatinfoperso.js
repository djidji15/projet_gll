import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './avocatinfoperso.css';

const AvocatInfoPerson = () => {
  const [avocat, setAvocat] = useState({});
  const [originalAvocat, setOriginalAvocat] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('URL');
        setAvocat(response.data);
        setOriginalAvocat(response.data);
      } catch (error) {
        console.error('Error fetching avocat personal info:', error);
      }
    };

    fetchData();
  }, []);

  const handleModifierClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.put(
        'URL_DE_VOTRE_API_DJANGO_MODIFIER',
        formData
      );
      setAvocat(response.data);
      setOriginalAvocat(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating avocat information:', error);
    }
  };

  const handleAnnulerClick = () => {
    setAvocat(originalAvocat);
    setIsEditing(false);
  };

  return (
    <div className='bienvenueinfoavocat'>
      <h1>Bienvenue {avocat.nom}</h1>
      <div className='avocatinfoperso'>
        <div className={isEditing ? 'modifier-form-overlay' : ''}></div>
        {isEditing && (
          <div className='modifier-form-container'>
            <div className='modifier-form'>
              <h2>Modifier les informations</h2>
              <label>Nouveau nom et prénom :</label>
              <input
                type='text'
                value={avocat.nom}
                onChange={(e) => setAvocat({ ...avocat, nom: e.target.value })}
              />
              <label>Nouvelle adresse :</label>
              <input
                type='text'
                value={avocat.adresse}
                onChange={(e) =>
                  setAvocat({ ...avocat, adresse: e.target.value })
                }
              />
              <label>Nouvelle spécialité :</label>
              <input
                type='text'
                value={avocat.specialite}
                onChange={(e) =>
                  setAvocat({ ...avocat, specialite: e.target.value })
                }
              />
              <div className='button-container'>
                <div className='enregistrer'>
                  <button onClick={() => handleFormSubmit(avocat)}>
                    Enregistrer
                  </button>
                </div>
                <div className='annuler'>
                  <button onClick={handleAnnulerClick}>Annuler</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='infoperso'>
          <div className='titre'>
            <h3>Informations personnelles :</h3>
          </div>
          <div className='infopersoligne'>
            <h4>Nom et prénom : </h4> <h3> {avocat.nom}</h3>
          </div>
          <div className='infopersoligne'>
            <h4>Adresse : </h4>
            <h3> {avocat.adresse}</h3>
          </div>
          <div className='infopersoligne'>
            <h4>Spécialité : </h4>
            <h3> {avocat.specialite}</h3>
          </div>
          <div className='modifier'>
            <button id='modifierButton' onClick={handleModifierClick}>
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvocatInfoPerson;
