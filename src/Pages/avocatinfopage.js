import React from 'react'
import NavbarClient from '../Components/Navbar/navbarclient'
import AvocatInfo from '../Components/AvocatInfo/avocatinfo'
import AvocatLocalisation from '../Components/AvocatLocalisation/avocatlocalisation'
import AvocatDescription from '../Components/AvocatDescription/avocatdescription'
import AvocatContact from '../Components/AvocatContact/avocatcontact'
import AvocatCommentaire from '../Components/AvocatCommentaire/avocatcommentaire'
import Footer from '../Components/Footer/footer'




export const AvocatInfoPage = () => {
    const style = {
        backgroundColor: '#9E9E9E' 
      };
  return (
    <div style={style}>
        <NavbarClient/>
        <AvocatInfo/>
        <AvocatDescription/>
        <AvocatLocalisation/>
        <AvocatContact/>
        <AvocatCommentaire/>
        <Footer/>
    </div>
  )
}
export default AvocatInfoPage;
