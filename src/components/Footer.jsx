import React from 'react';
import { motion } from 'framer-motion';
// Github komponenti endi pastda ishlatiladi, shuning uchun xatolik yo'qoladi
import { Github, Instagram, Send, Youtube, ChevronUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="ultra-footer">
      <div className="footer-glow"></div>

      <div className="footer-main-container">
        
        <div className="footer-top-section">
          <motion.div 
            className="brand-block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="glitch-logo">CINEMIX</h1>
            <p className="brand-slogan">Kelajak kinosi, bugun siz bilan.</p>
          </motion.div>

          <div className="footer-nav-grid">
            <div className="nav-col">
              <h4>Katalog</h4>
              <span>Janrlar</span>
              <span>Yangi filmlar</span>
              <span>Top 100</span>
            </div>
            <div className="nav-col">
              <h4>Yordam</h4>
              <span>FAQ</span>
              <span>Qo'llab-quvvatlash</span>
              <span>Tariflar</span>
            </div>
          </div>
        </div>

        <div className="footer-middle-big-text">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5 }}
          >
            UNLIMITED FILMS CINEMIX STUDIOS
          </motion.h2>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © 2025 <span>CINEMIX STUDIO</span>. All Rights Reserved.
          </div>
          
          {/* Ijtimoiy tarmoqlar havolalari */}
          <div className="social-circles">
            <a href="https://t.me/apexionAPEX" target="_blank" rel="noreferrer" className="icon-circle">
              <Send size={20} />
            </a>
            <a href="https://instagram.com/kamolovsaiko" target="_blank" rel="noreferrer" className="icon-circle">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com/mrbeast" target="_blank" rel="noreferrer" className="icon-circle">
              <Youtube size={20} />
            </a>
            <a href="https://github.com/saidbek18" target="_blank" rel="noreferrer" className="icon-circle">
              <Github size={20} />
            </a>
          </div>

          <motion.button 
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileActive={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;