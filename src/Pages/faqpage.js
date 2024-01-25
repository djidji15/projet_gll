import React from 'react'
import FAQs from '../Components/FAQ/faqs'
import NavbarClient from '../Components/Navbar/navbarclient'
import Footer from '../Components/Footer/footer'

export const FAQPage = () => {
  const style = {
    backgroundColor: '#9E9E9E' 
  };
  return (
    <div style={style}>
        <NavbarClient/>
        <FAQs/>
        <Footer/>
    </div>
  )
}
export default FAQPage;
