import React from 'react';
import AvocatInfoPerson from '../Components/AvocatInfoPerso/avocatinfoperso';
import { AvocatNote } from '../Components/AvocatNote/avocatnote';
import AvocatRendezVous from '../Components/AvocatRendezVous/avocatrendezvous';
import { ProfilAJour } from '../Components/ProfilAJour/profilajour';
import Footer from '../Components/Footer/footer';
import { NavbarAvocat } from '../Components/Navbar/navbaravocat';

export const EspaceAvocatPage = () => {
  const style = {
    backgroundColor: '#9E9E9E',
  };
  return (
    <div style={style}>
      <NavbarAvocat />
      <AvocatInfoPerson />
      <AvocatNote />
      <AvocatRendezVous />
      <ProfilAJour />
      <Footer />
    </div>
  );
};
export default EspaceAvocatPage;
