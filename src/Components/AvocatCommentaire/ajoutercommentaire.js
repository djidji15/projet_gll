
import React from 'react';
import { useState } from 'react';
import "./ajoutercommentaire.css"

const AjouterCommentaire = ({ utilisateurConnecte, onAjouterCommentaire }) => {
    const [commentaire, setCommentaire] = useState('');
  
    const handleAjouterCommentaire = (e) => {
      e.preventDefault();
  

  
      const nouveauCommentaire = {
        nom: utilisateurConnecte.nom,
        commentaire,
      };
  
      onAjouterCommentaire(nouveauCommentaire);
      setCommentaire('');
    };
  
    return (
      <div className='commentaire'>
        <h2>Ajouter un commentaire</h2>
        <div className='ajoutercommentaire'>
        <form onSubmit={handleAjouterCommentaire}>
          
          
          <label></label>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            required
          />
          
          <button type="submit">Commenter</button>
        </form>
        </div>
      </div>
    );
  };
export default AjouterCommentaire;

/*
<div className='ajouternote'>
          <label>Note:</label>
          <input
            type="number"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            min="1"
            max="5"
            required
          />
          </div>
          */
