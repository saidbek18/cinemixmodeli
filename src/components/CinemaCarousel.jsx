import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Tv } from 'lucide-react';
import './CinemaCarousel.css';

const movies = [
  { 
    id: 1, 
    title: "Koinot sirlari", 
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop", 
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E" 
  },
  { 
    id: 2, 
    title: "Sarguzashtlar dunyosi", 
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop", 
    trailer: "https://www.youtube.com/watch?v=d9MyW72ELq0" 
  },
  { 
    id: 3, 
    title: "Texnologiya asri", 
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop", 
    trailer: "https://www.youtube.com/watch?v=mqqft22Skle" 
  },
  { 
    id: 4, 
    title: "Shahar hayoti", 
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop", 
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  }
];

const CinemaCarousel = () => {
  const [index, setIndex] = useState(0);

  // 10 soniyada avtomatik almashish
  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 10000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  const getIndex = (offset) => {
    return (index + offset + movies.length) % movies.length;
  };

  return (
    <div className="carousel-section">
      <div className="carousel-container">
        
        {/* Chapdagi blur rasm */}
        <div className="side-banner left">
          <img src={movies[getIndex(-1)].img} alt="prev" />
        </div>

        {/* Markazdagi asosiy banner */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={movies[index].id}
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="main-banner"
          >
            <img src={movies[index].img} alt="active" />
            
            <div className="banner-controls">
              <button className="btn-watch" onClick={() => alert("Kino boshlandi!")}>
                <Play size={20} fill="currentColor" />
                Ko'rish
              </button>
              <button className="btn-trailer" onClick={() => window.open(movies[index].trailer)}>
                <Tv size={20} />
                Treylerni ko'rish
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ongdagi blur rasm */}
        <div className="side-banner right">
          <img src={movies[getIndex(1)].img} alt="next" />
        </div>

      </div>
    </div>
  );
};

export default CinemaCarousel;