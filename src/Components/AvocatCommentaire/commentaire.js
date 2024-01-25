
import React from 'react';
import './commentaire.css'

const commentaire = ({ nom, commentaire }) => (
    <div className='commentaires'>
        <div className='nomnote'>
            <h4>{nom}</h4>
        </div>
        <div className='comment'>
            <h3>{commentaire}</h3>
        </div>
    </div>
  );

export default commentaire;
