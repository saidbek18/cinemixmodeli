import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Skroll hodisasini kuzatish
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="/" className="nav-logo">
          CINEMA<span>PRO</span>
        </a>

        {/* Menu Linklari */}
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Asosiy</a>
          <a href="#movies" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Filmlar</a>
          <a href="#series" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Seriallar</a>
          <a href="#categories" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Kategoriyalar</a>
          <a href="#login" className="nav-login-mobile" onClick={() => setIsMobileMenuOpen(false)}>Kirish</a>
        </div>

        {/* O'ng tarafdagi harakatlar */}
        <div className="nav-actions">
          <button className="search-btn" aria-label="Search">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <a href="#login" className="btn-login">Kirish</a>

          {/* Hamburger (Mobile Toggle) */}
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;