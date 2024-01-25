
import React from 'react';
import Commentaire from './commentaire.js';
import './commentairelist.css'
const commentaireslist = ({ commentaires }) => (

    <ul>
        
      {commentaires.map((commentaire) => (
        <div className='listcomment'>
        <Commentaire key={commentaire.id} {...commentaire} />
        </div>
      ))}

    </ul>

  );

export default commentaireslist;
