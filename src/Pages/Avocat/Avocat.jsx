import React from 'react';
import avocat from '../../Assets/avocat';
import './Avocat.css';
import Contavocat from '../../Components/Contavocat/Contavocat';

const Avocat = () => {
  return (
    <div>
      <div className='Trouver-avocat-container'>
        <p>Trouvez l'Avocat Idéal</p>
        <div className='all-container'>
          <input type='text' placeholder='Nom' />
          <input type='text' placeholder='Specialte' />
          <input type='text' placeholder='Region' />
          <button>Rechercher</button>
        </div>
      </div>
      <div className='avocat-container'>
        {avocat.map((avocat, i) => {
          return (
            <Contavocat
              key={i}
              id={avocat.id}
              name={avocat.name}
              specialité={avocat.specialité}
              image={avocat.cover}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Avocat;
