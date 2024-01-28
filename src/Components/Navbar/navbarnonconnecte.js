import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../Assets/Logo.png';

export const NavbarNonConnecte = () => {
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
          <Link to='/AvocatNC'>Avocats</Link>
        </li>
        <li
          className={selectedNavItem === 'Contact' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Contact')}
        >
          <Link to='/ContactNC'>Contact</Link>
        </li>
        <li
          className={selectedNavItem === 'FAQ' ? 'selected' : ''}
          onClick={() => handleNavItemClick('FAQ')}
        >
          <Link to='/FAQNC'>FAQ</Link>
        </li>
      </ul>

      <div className='buttonconnexion'>
        <Link to='/connexion'>
          <button>connecion</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};
export default NavbarNonConnecte;
