import React from 'react';
import './EspaceC.css';
import InfoC from '../../Components/InfoC/InfoC';
import AvocaUseFav from '../../Components/AvocaUseFav/AvocaUseFav';
import Rendezvous from '../../Components/Rendezvous/Rendezvous';
import Trouvezavo from '../../Components/Trouvezavo/Trouvezavo';
import NavbarClient from '../../Components/Navbar/navbarclient';
import Footer from '../../Components/Footer/footer';

const EspaceC = () => {
  return (
    <div>
      <NavbarClient />
      <InfoC />
      <AvocaUseFav />
      <Rendezvous />
      <Trouvezavo />
      <Footer />
    </div>
  );
};

export default EspaceC;
