import React from 'react';
import Hero from '../../Components/Hero/Hero';
import AvocatFav from '../../Components/AvocatFav/AvocatFav';
import Apropos from '../../Components/Apropos/Apropos';
import NavbarClient from '../../Components/Navbar/navbarclient';
import Footer from '../../Components/Footer/footer';
import NavbarNonConnecte from '../../Components/Navbar/navbarnonconnecte';

const HomeNC = () => {
  return (
    <div>
      <NavbarNonConnecte />
      <Hero />
      <AvocatFav />
      <Apropos />
      <Footer />
    </div>
  );
};

export default HomeNC;
