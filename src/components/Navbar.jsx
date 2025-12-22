import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Login holatini har safar sahifa yangilanganda olish
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userImage = localStorage.getItem('userImage');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sahifa o'zgarganda menyuni yopish
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          CINEMA<span>PRO</span>
        </Link>

        {/* Menu Linklari */}
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item">Asosiy</Link>
          <a href="#movies" className="nav-item">Filmlar</a>
          <a href="#series" className="nav-item">Seriallar</a>
          
          {/* Faqat mobil menyuda chiqadigan login tugmasi */}
          {!isLoggedIn && (
            <Link to="/login" className="nav-login-mobile">Kirish</Link>
          )}
        </div>

        {/* O'ng tarafdagi harakatlar */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <Link to="/profile" className="nav-profile-link">
              <div className="profile-circle-wrapper">
                <img 
                  src={userImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                  alt="Profile" 
                  className="nav-profile-img" 
                />
              </div>
            </Link>
          ) : (
            <Link to="/login" className="btn-login">Kirish</Link>
          )}

          {/* Hamburger tugmasi */}
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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