import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Banner.css';

const Banner = () => {
  const { scrollY } = useScroll();
  
  // Skrollga qarab rasm xiralashadi va yo'qoladi
  const blurValue = useTransform(scrollY, [0, 400], [0, 15]);
  const opacityValue = useTransform(scrollY, [0, 450], [1, 0]);
  const scaleValue = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <motion.div 
      className="banner-container"
      style={{ opacity: opacityValue, scale: scaleValue, filter: `blur(${blurValue}px)` }}
    >
      <img 
        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070" 
        alt="Main Banner" 
        className="banner-image"
      />
      <div className="banner-overlay"></div>
    </motion.div>
  );
};

export default Banner;