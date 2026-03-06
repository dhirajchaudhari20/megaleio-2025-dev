import React from "react";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import logo from "../assets/images/logo.webp"; // Import the logo
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer id="contact" className="footer-container">
      <div className="footer-content">
        {/* Logo and Subtext */}
        <div className="footer-section">
          <img src={logo} alt="Megalio Logo" className="footer-logo" />
          <h2 className="footer-title">MEGALEIO</h2>
          <p className="footer-subtext">
            A National Level Intercollegiate Technical Event where innovation
            meets excellence.
          </p>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3 className="footer-heading">CONTACT US</h3>
          <div className="footer-contact">
            <h4>Faculty Coordinators:</h4>
            <p>☎️ Mr. Swapnil Malipatil: +91 81473 34657</p>
            <p>☎️ Mrs. Vishakha Rane: +91 97303 71605</p>
            <h4>Student Coordinators:</h4>
            <p>☎️ Mr. Dev sarkar : +91 70284 55752</p>
            <p>☎️ Ms. Gracy Yadav: +91 87678 20269</p>
            <p>☎️ Mr. Meghana kamath: +91 91683 97791</p>
          </div>
        </div>

        {/* Social Media and Form */}
        <div className="footer-section">
          <h3 className="footer-heading">FOLLOW US</h3>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com/megaleio2025" className="footer-social-icon">
              <FaInstagram size={30} />
            </a>
            <a href="https://youtube.com/@megaleiosjcem6968?si=8jfVcyREsO4NPEp3" className="footer-social-icon">
              <FaYoutube size={30} />
            </a>
            <a href="https://www.facebook.com/" className="footer-social-icon">
              <FaFacebookF size={30} />
            </a>
          </div>
          <form className="footer-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="footer-input"
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              maxLength="10"
              id="phone"
              placeholder="Phone Number"
              className="footer-input"
            />
            <label htmlFor="query">Your Query</label>
            <textarea
              id="query"
              rows="3"
              placeholder="Your Query..."
              className="footer-textarea"
            ></textarea>
            <button type="submit" className="footer-button">
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="footer-bottom">
        © 2026 Megaleio. All rights reserved. St. John College of Engineering
        and Management is the organizer of the event.
      </div>
    </footer>
  );
};

export default Footer;