import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './MovieSlider.css';

const movies = [
  { id: 1, title: "Oppenheimer", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400" },
  { id: 2, title: "The Batman", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400" },
  { id: 3, title: "Dune", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400" },
  { id: 4, title: "Interstellar", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400" },
  { id: 5, title: "Joker", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400" },
  { id: 6, title: "Avengers", img: "https://images.unsplash.com/photo-1560169897-bb334ee5b3e5?q=80&w=400" },
  { id: 7, title: "Spider-Man", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400" },
];

const MovieSlider = ({ categoryTitle }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="slider-section">
      <h2 className="slider-title">{categoryTitle}</h2>
      
      <div className="slider-container">
        {/* Chapga o'tkazish tugmasi */}
        <button className="nav-btn left" onClick={() => scroll('left')}>
          <ChevronLeft size={30} />
        </button>

        <div className="movie-track" ref={scrollRef}>
          {movies.map((movie) => (
            <motion.div 
              key={movie.id} 
              className="movie-item-box"
              whileHover={{ scale: 1.05 }}
            >
              <div className="poster-wrapper">
                <img src={movie.img} alt={movie.title} />
                <div className="poster-overlay">
                   <Play fill="white" size={40} />
                </div>
              </div>
              <p className="movie-box-title">{movie.title}</p>
            </motion.div>
          ))}
        </div>

        {/* O'ngga o'tkazish tugmasi */}
        <button className="nav-btn right" onClick={() => scroll('right')}>
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;