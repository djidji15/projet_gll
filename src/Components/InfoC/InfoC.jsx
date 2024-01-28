import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InfoC.css';

const InfoC = () => {
  const [userInfo, setUserInfo] = useState({
    Nom: '',
    Prenom: '',
    AdresseEmail: '',
  });
  const [originalUser, setOriginalUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/auth/user/');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  const handleModifierClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/auth/user/',
        formData
      );
      setUserInfo(response.data);
      setOriginalUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating avocat information:', error);
    }
  };

  const handleAnnulerClick = () => {
    setUserInfo(originalUser);
    setIsEditing(false);
  };

  return (
    <div className='info-container'>
      <div className='bienvenue-container'>
        <p>
          Bienvenue
          {userInfo.Nom && userInfo.Prenom
            ? `${userInfo.Nom} ${userInfo.Prenom}`
            : ''}
        </p>
      </div>
      <div className={isEditing ? 'modifier-form-overlay' : ''}></div>
      {isEditing && (
        <div className='modifier-form-container'>
          <div className='modifier-form'>
            <h2>Modifier les informations</h2>
            <label>Nouveau nom :</label>
            <input
              type='text'
              value={userInfo.Nom}
              onChange={(e) =>
                setUserInfo({ ...userInfo, Nom: e.target.value })
              }
            />
            <label>Nouveau prenom :</label>
            <input
              type='text'
              value={userInfo.Prenom}
              onChange={(e) =>
                setUserInfo({ ...userInfo, Prenom: e.target.value })
              }
            />
            <div className='button-container'>
              <div className='enregistrer'>
                <button onClick={() => handleFormSubmit(userInfo)}>
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
      <div className='info-container2'>
        <p>Information personnelle :</p>
        <p>Nom: {userInfo.Nom}</p>
        <p>Prénom: {userInfo.Prenom}</p>
        <p>Adresse email: {userInfo.AdresseEmail}</p>
        <button onClick={handleModifierClick}>Modifier</button>
      </div>
    </div>
  );
};

export default InfoC;
