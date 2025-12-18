import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './CategoryShowcase.css';

const categories = [
  { id: 1, title: "Jahon Kinolari", img: "https://images.unsplash.com/photo-1574267431264-b4a12530c0e7?q=80&w=400" },
  { id: 2, title: "Anime", img: "https://images.unsplash.com/photo-1618386629986-749e7987a071?q=80&w=400" },
  { id: 3, title: "Doramalar", img: "https://images.unsplash.com/photo-1627876807038-1a550ce7ed41?q=80&w=400" },
  { id: 4, title: "Marvel Olami", img: "https://images.unsplash.com/photo-1620336655000-dc0808c72477?q=80&w=400" },
  { id: 5, title: "Detektiv", img: "https://images.unsplash.com/photo-1544427464-9842a22f3ed0?q=80&w=400" },
  { id: 6, title: "Hujjatli", img: "https://images.unsplash.com/photo-1601712808246-81498b3f11d1?q=80&w=400" },
];

const CategoryShowcase = () => {
  return (
    <div className="category-showcase-section">
      <h2 className="category-section-title">Kerakli qismlarni tanlang</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <motion.div 
            key={category.id} 
            className="category-card"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: category.id * 0.08 }}
          >
            <img src={category.img} alt={category.title} />
            <div className="category-info-overlay">
              <h3>{category.title}</h3>
              <div className="explore-button">
                Kashf etish <ChevronRight size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryShowcase;