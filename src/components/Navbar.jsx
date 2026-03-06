import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import './Navbar.css';
import logo from '../assets/logo-vector-user.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { openBookingModal } = useBooking();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Hide navbar if scrolling down, show if scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
            <div className="navbar-container container">
                <div className="nav-left">
                    <a href="#" className="navbar-logo" onClick={() => setIsOpen(false)}>
                        <img src={logo} alt="The Mane Space" className="logo-image" />
                        <span className="logo-text">The Mane Space</span>
                    </a>
                </div>

                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <a href="#pricing" className="nav-item" onClick={() => setIsOpen(false)}>Pricing</a>
                    <a href="#reviews" className="nav-item" onClick={() => setIsOpen(false)}>Reviews</a>
                    <a href="#team" className="nav-item" onClick={() => setIsOpen(false)}>Team</a>
                    <a href="#faq" className="nav-item" onClick={() => setIsOpen(false)}>FAQ</a>
                    <a href="#contact" className="nav-item" onClick={() => setIsOpen(false)}>Location</a>
                </div>

                <div className="nav-right">
                    <button className="btn btn-primary nav-cta" onClick={openBookingModal}>
                        Book Now
                    </button>
                    <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={32} color="var(--color-black)" /> : <Menu size={32} color="var(--color-black)" />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
