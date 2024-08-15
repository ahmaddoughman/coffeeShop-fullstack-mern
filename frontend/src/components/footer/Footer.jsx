import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h2>Coffee Shop</h2>
            <p>A coffee shop is a warm, inviting space where people enjoy freshly brewed coffee, tea, and light snacks. It serves as a social hub for meetings, work, or relaxation, with a cozy atmosphere and the aroma of roasted beans filling the air.</p>
            <div className='footer-social-icons'>
                
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+961 71 653 043</li>
                <li>amd040@live.aul.edu.lb</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Coffee.com - All Right Reversed.</p>
    </div>
  )
}

export default Footer
