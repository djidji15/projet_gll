import React from 'react';
import avocat from '../../Assets/avocat';
import './Avocat.css';
import Contavocat from '../../Components/Contavocat/Contavocat';
import NavbarClient from '../../Components/Navbar/navbarclient';
import Footer from '../../Components/Footer/footer';
import NavbarNonConnecte from '../../Components/Navbar/navbarnonconnecte';
import { Link } from 'react-router-dom';

const AvocatNC = () => {
  return (
    <div>
      <NavbarNonConnecte />
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
            <Link to='/avocatinfo'>
              <Contavocat
                key={i}
                id={avocat.id}
                name={avocat.name}
                specialité={avocat.specialité}
                image={avocat.cover}
              />
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default AvocatNC;
