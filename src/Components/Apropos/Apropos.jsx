import React from 'react';
import './Apropos.css';
import image from '../../Assets/status.png';

const Apropos = () => {
  return (
    <div className='main-container'>
      <div className='apropos-container'>
        <h2>À Propos de Mouhami DZ</h2>
        <p>
          Mouhami DZ est votre solution en ligne pour trouver des avocats
          compétents en Algérie. Nous simplifions le processus de recherche et
          de sélection d'avocats qualifiés.
        </p>
      </div>
      <div className='satus-container'>
        <img src={image} />
      </div>

      <div className='marche-container'>
        <h2>Comment Ça Marche ?</h2>
        <p>
          1. Recherchez : Utilisez notre barre de recherche avancée pour trouver
          des avocats en fonction de vos besoins spécifiques.
        </p>
        <p>
          2. Explorez les Profils : Découvrez les profils détaillés des avocats,
          y compris leurs compétences, expériences et évaluations.
        </p>
        <p>
          3. Prenez un Rendez-vous : Planifiez facilement des rendez-vous en
          ligne avec l'avocat de votre choix.
        </p>
      </div>
      <div className='inscrivez-container'>
        <p>Inscrivez-vous maintenant en tant </p>
        <p>qu'avocat et faites partie de Mouhami DZ</p>
        <button>S’inscrire tant qu’avocat </button>
      </div>
    </div>
  );
};

export default Apropos;
