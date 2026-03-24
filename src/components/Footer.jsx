import React from 'react';
import './Footer.css';
import logo from '../assets/logo-vector-user.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer section-padding">
            <div className="footer-container container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={logo} alt="The Mane Space" className="footer-logo-image" />
                        <div className="footer-logo-text-container">
                            <span className="footer-logo-text-top">THE MANE</span>
                            <span className="footer-logo-text-bottom">SPACE</span>
                        </div>
                    </div>
                    {/* Removed social links */}
                </div>
                <div className="footer-bottom">
                    <p>&copy; {currentYear} The Mane Space. All rights reserved.<br/>By BridgePoint Automations LLC</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
