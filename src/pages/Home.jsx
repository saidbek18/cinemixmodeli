import React from 'react';
import { motion } from 'framer-motion';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar'; // Nuqta xatosi tuzatildi
import SearchBox from '../components/SearchBox';
import CinemaCarousel from '../components/CinemaCarousel';
import MovieGrid from '../components/MovieGrid';
import MovieSlider from '../components/MovieSlider';
import Footer from '../components/Footer';
import CategoryShowcase from '../components/CategoryShowcase';

import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Navbar doim tepada qotib turishi uchun */}
      <Navbar />

      {/* 1. Asosiy Banner (Orqa fonda turadi) */}
      <Banner />

      {/* 2. Asosiy Kontent - Animatsiya bilan chiqadi */}
      <motion.div 
        className="home-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Qidiruv tizimi */}
        <SearchBox />
        
        {/* 3D Karusel */}
        <CinemaCarousel />

        {/* Eng muhim qismlar (Grid) */}
        <MovieGrid />

        {/* Yo'nalishlar (Jahon kinolari, Anime...) */}
        <CategoryShowcase />

        {/* Kinolar qatorlari (Sliderlar) */}
        <div className="sliders-section">
          <MovieSlider categoryTitle="Trenddagi kinolar" />
          <MovieSlider categoryTitle="Siz uchun tanlanganlar" />
          <MovieSlider categoryTitle="Yangi seriallar" />
          <MovieSlider categoryTitle="Mashhur filmlar" />
        </div>

        {/* Footer - Eng pastda */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;