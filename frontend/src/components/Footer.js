import React from 'react';
import '../styles/Footer.css';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-column">
          <h3>BUDDY’s Vadapav</h3>
          <p>Address: Near XYZ Circle, Surat, Gujarat</p>
          <p>Email: buddysvadapav@gmail.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>  
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Find Us on Map</h4>
            <a 
              href="https://www.google.com/maps/search/buddy's+vadapav+stores+in+gujarat+on+google+map+with+exact+location/@21.0174752,72.7844273,10z?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noreferrer"
            >
            <img 
              src="/images/gmap.png" 
              alt="Google Map of Buddy's Vadapav" 
              className="footer-map"
            />
            </a>
        </div>


      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BUDDY’s Vadapav. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
