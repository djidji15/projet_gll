import React from 'react';
import './AvocatfavUse.css';

const AvocatfavUse = (props) => {
  return (
    <div className='avocat2'>
      <div className='image2'>
        <img src={props.image} alt='' />
      </div>
      <div className='info-container3'>
        <p>
          {props.name}
          {props.prenom}
        </p>
        <p>{props.specialité}</p>
        <button>supprimer</button>
      </div>
    </div>
  );
};

export default AvocatfavUse;
