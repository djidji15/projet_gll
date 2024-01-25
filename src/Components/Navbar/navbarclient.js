import React, { useState } from 'react';
import './navbar.css';

export const NavbarClient = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Accueil');

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <img alt='logo' />
      </div>

      <ul className='navigation'>
        <li
          className={selectedNavItem === 'Accueil' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Accueil')}
        >
          Accueil
        </li>
        <li
          className={selectedNavItem === 'Avocats' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Avocats')}
        >
          Avocats
        </li>
        <li
          className={selectedNavItem === 'Contact' ? 'selected' : ''}
          onClick={() => handleNavItemClick('Contact')}
        >
          Contact
        </li>
        <li
          className={selectedNavItem === 'FAQ' ? 'selected' : ''}
          onClick={() => handleNavItemClick('FAQ')}
        >
          FAQ
        </li>
      </ul>

      <div className='buttonclient'>
        <div className='espaceclient'>
          <button>Espace Client</button>
        </div>
        <div className='deconnexion'>
          <button>Déconnexion</button>
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;
