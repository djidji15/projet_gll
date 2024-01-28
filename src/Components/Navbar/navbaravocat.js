import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Logo.png';

export const NavbarAvocat = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Accueil');

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src={logo} />
      </div>

      <ul className='navigation'>
        <li
          className={selectedNavItem === 'Accueil' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Accueil')}
        >
          <Link to='/'>Accueil</Link>
        </li>
        <li
          className={selectedNavItem === 'Avocats' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Avocats')}
        >
          <Link to='/Avocat'>Avocats</Link>
        </li>
        <li
          className={selectedNavItem === 'Contact' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Contact')}
        >
          <Link to='/Contact'>Contact</Link>
        </li>
        <li
          className={selectedNavItem === 'FAQ' ? 'selected' : ''}
          onClick={() => handleNavItemClick('FAQ')}
        >
          <Link to='/FAQ'>FAQ</Link>
        </li>
      </ul>

      <div className='buttonavocat'>
        <div className='espaceavocat'>
          <Link to='/EspaceA'>
            <button>Espace Avocat</button>
          </Link>
        </div>
        <div className='deconnexion'>
          <Link to='/connexion'>
            <button>Déconnexion</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
