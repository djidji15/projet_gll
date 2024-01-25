import React from 'react'
import "./navbar.css"

export const NavbarAvocat = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <img></img>
        </div>

        <div className='buttonavocat'>
            <div className='espaceavocat'><button>Espace Avocat</button></div>
            <div className='deconnexion'><button>Déconnexion</button></div>
        </div>
    </div>
  )
}