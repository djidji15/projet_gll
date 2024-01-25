import React from 'react'
import "./navbar.css"

export const NavbarNonConnecte = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <img></img>
        </div>
            <ul className='navigation'>
                <li>Acceuil</li>
                <li>Avocats</li>
                <li>Contact</li>
                <li>FAQ</li>
            </ul>

        <div className='buttonconnexion'>
            <button>Connexion</button>
        </div>
    </div>
  )
}
export default NavbarNonConnecte;
