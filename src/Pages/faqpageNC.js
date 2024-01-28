import React from 'react';
import FAQs from '../Components/FAQ/faqs';
import NavbarClient from '../Components/Navbar/navbarclient';
import Footer from '../Components/Footer/footer';
import NavbarNonConnecte from '../Components/Navbar/navbarnonconnecte';

export const FAQPageNC = () => {
  const style = {
    backgroundColor: '#9E9E9E',
  };
  return (
    <div style={style}>
      <NavbarNonConnecte />
      <FAQs />
      <Footer />
    </div>
  );
};
export default FAQPageNC;
