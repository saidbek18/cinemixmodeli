import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Tv, Star } from 'lucide-react';
import './MovieGrid.css';

const movieData = [
  { id: 1, title: "Oppenheimer", rating: "8.6", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500", trailer: true },
  { id: 2, title: "Dark Knight", rating: "9.0", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500", trailer: false },
  { id: 3, title: "Dune 2", rating: "8.8", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500", trailer: true },
  { id: 4, title: "Interstellar", rating: "8.8", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=500", trailer: true },
  { id: 5, title: "Joker", rating: "8.4", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500", trailer: false },
  { id: 6, title: "Spider-Man", rating: "8.1", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=500", trailer: true },
  { id: 7, title: "Avengers", rating: "8.5", img: "https://images.unsplash.com/photo-1560169897-bb334ee5b3e5?q=80&w=500", trailer: true },
  { id: 8, title: "Batman", rating: "8.0", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500", trailer: false },
];

const MovieGrid = () => {
  const scrollRef = useRef(null);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = dir === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-grid-container">
      <h2 className="grid-main-title">Tavsiya etilganlar</h2>
      
      <div className="slider-wrapper">
        {/* Chap taraf tugmasi */}
        <button className="nav-arrow left" onClick={() => handleScroll('left')}>
          <ChevronLeft size={40} />
        </button>

        <div className="grid-scroll-track" ref={scrollRef}>
          {movieData.map((movie) => (
            <motion.div 
              key={movie.id} 
              className="movie-box-item"
              whileHover={{ y: -5 }}
            >
              <div className="movie-poster-area">
                <img src={movie.img} alt={movie.title} />
                <div className="rating-badge">
                  <Star size={12} fill="#fbbf24" stroke="none" /> {movie.rating}
                </div>
                
                {/* Hover Overlay */}
                <div className="movie-hover-content">
                  <button className="green-play-btn">
                    <Play size={18} fill="white" /> Ko'rish
                  </button>
                  {movie.trailer && (
                    <button className="glass-trailer-btn">
                      <Tv size={18} /> Treyler
                    </button>
                  )}
                </div>
              </div>
              <p className="movie-box-name">{movie.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Ong taraf tugmasi */}
        <button className="nav-arrow right" onClick={() => handleScroll('right')}>
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;