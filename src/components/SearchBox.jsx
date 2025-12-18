import React, { useState, useEffect } from 'react';
import { Search, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchBox.css';

const dummyMedia = [
  { id: 1, title: "Avatar: The Way of Water", year: "2022" },
  { id: 2, title: "Avengers: Endgame", year: "2019" },
  { id: 3, title: "Batman: The Dark Knight", year: "2008" },
  { id: 4, title: "Interstellar", year: "2014" },
];

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = dummyMedia.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-input-group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="search-input"
            placeholder=" " 
          />
          <label className="floating-label">Kino nomini yozing...</label>
        </div>
        
        <button className="button-3d">
          <Search size={20} />
          <span>Qidirish</span>
        </button>
      </div>

      {/* Qidiruv natijalari - Qop-qora list */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div 
            className="search-results-list"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {results.map((item) => (
              <div key={item.id} className="result-row">
                <Film size={18} color="#3b82f6" />
                <div className="result-text">
                  <p className="m-0 font-bold">{item.title}</p>
                  <small>{item.year}</small>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;