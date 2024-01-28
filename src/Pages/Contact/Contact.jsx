import React from 'react';
import './Contact.css';
import phone from '../../Assets/Phone.png';
import mail from '../../Assets/Email.png';
import NavbarClient from '../../Components/Navbar/navbarclient';
import Footer from '../../Components/Footer/footer';

const Contact = () => {
  return (
    <div>
      <NavbarClient />
      <div className='all-page'>
        <div className='all'>
          <div className='contact-coordonnez-container'>
            <div className='contactez-container'>
              <h1>Contactez Mouhami DZ</h1>
              <div className='input-container'>
                <input type='text' placeholder='Nom' />
                <input type='text' placeholder='Prenom' />
              </div>
              <div className='email-container'>
                <input type='text' placeholder='email' />
              </div>
              <div className='message-container'>
                <input type='text' placeholder='message' />
              </div>
              <div className='envoyer-container'>
                <button>Envoyer</button>
              </div>
            </div>
            <div className='coordonnez-container'>
              <h1>Coordonnées</h1>
              <div className='phone'>
                <img src={phone} alt='' />
                <p>Téléphone / </p>
                <p> +213550547888</p>
              </div>
              <div className='mail'>
                <img src={mail} alt='' />
                <p>Mail /</p>
                <p> MouhamiDZ@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className='trouvez-avocat'>
          <h1>Trouvez l'Avocat Idéal</h1>
          <button>Cliquez ici</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
