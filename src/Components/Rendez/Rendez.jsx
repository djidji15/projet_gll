import React from 'react';
import './Rendez.css';

const Rendez = () => {
  return (
    <div>
      <div className='rendez'>
        <div className='info-container4'>
          <p>
            {props.date}
            {props.heure}
          </p>
          <p>{props.avocat}</p>
        </div>
      </div>
    </div>
  );
};

export default Rendez;
