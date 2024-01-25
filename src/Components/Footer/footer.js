import React from 'react'
import facebook from "../../img/facebook.png"
import instagram from "../../img/instagram.png"
import twitterx from "../../img/twitterx.png"
import "./footer.css"

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='contact'>
                <div className='email'>
                    <h3>Contactez nous</h3>
                    <h4>MouhamiDZ@gmail.com</h4>
                </div>
                <div className='social-network'>
                    <h3>Nos réseaux sociaux</h3>
                    <div className='icons'>
                        <img src={facebook} alt=''/>
                        <img src={instagram} alt=''/>
                        <img src={twitterx} alt=''/>
                    </div>
                </div>
            </div>
                <div className='copyright'>
                    <p>© MouhamiDZ Inc. All Rights Reserved 2024</p>
                </div>
        </div>
      )
}
export default Footer;
