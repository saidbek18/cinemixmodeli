import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Tv } from 'lucide-react';
import './CinemaCarousel.css';

const movies = [
  { 
    id: 1, 
    title: "Koinot sirlari", 
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000", 
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E" 
  },
  { 
    id: 2, 
    title: "Sarguzashtlar dunyosi", 
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000", 
    trailer: "https://www.youtube.com/watch?v=d9MyW72ELq0" 
  },
  { 
    id: 3, 
    title: "Texnologiya asri", 
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000", 
    trailer: "https://www.youtube.com/watch?v=mqqft22Skle" 
  }
];

const CinemaCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [index]);

  const getIndex = (offset) => (index + offset + movies.length) % movies.length;

  return (
    <div className="carousel-section">
      <div className="carousel-container">
        
        {/* Chapdagi yon banner (Faqat Desktop) */}
        <div className="side-banner left">
          <img src={movies[getIndex(-1)].img} alt="prev" />
        </div>

        {/* Markazdagi asosiy banner */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={movies[index].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="main-banner"
          >
            <img src={movies[index].img} alt="active" />
            
            {/* Rasm ustidagi qora qatlam (Vignette) */}
            <div className="banner-vignette"></div>
            
            <div className="banner-overlay-content">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="movie-title"
              >
                {movies[index].title}
              </motion.h2>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="banner-controls"
              >
                <button className="btn-watch" onClick={() => alert("Kino boshlandi!")}>
                  <Play size={22} fill="currentColor" />
                  Ko'rish
                </button>
                <button className="btn-trailer" onClick={() => window.open(movies[index].trailer)}>
                  <Tv size={22} />
                  Treyler
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ongdagi yon banner (Faqat Desktop) */}
        <div className="side-banner right">
          <img src={movies[getIndex(1)].img} alt="next" />
        </div>

      </div>
    </div>
  );
};

export default CinemaCarousel;