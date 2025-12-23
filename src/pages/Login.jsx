import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://cinemixmodeli-1.onrender.com', {
        phone: phone, // PhoneInputdan kelgan qiymat (+998...)
        password: password
      });

      if (response.data.token) {
        // 1. Tokenni saqlaymiz
        localStorage.setItem('token', response.data.token);
        
        // 2. Kirganini tasdiqlaymiz
        localStorage.setItem('isLoggedIn', 'true');
        
        // 3. TELEFON RAQAMNI SAQLASH (Navbar va Profile uchun muhim!)
        localStorage.setItem('userPhone', phone);
        
        // 4. Asosiy sahifaga yo'naltiramiz
        navigate('/');
        
        // 5. Navbarni yangilash uchun sahifani majburan qayta yuklaymiz
        window.location.reload(); 
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Tizimga kirishda xato!");
    }
  };

  return (
    <div className="login-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ChevronLeft size={24} /> Ortga
      </button>

      <motion.div 
        className="login-box"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2>CINEMA<span>PRO</span></h2>
          <p>Tizimga kirish</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <p style={{color: '#ff4d4d', textAlign: 'center', fontSize: '14px', marginBottom: '10px'}}>{error}</p>}

          <div className="input-field">
            <label>Telefon raqam</label>
            <PhoneInput
              country={'uz'}
              value={phone}
              onChange={setPhone}
              placeholder="99 123 45 67"
              containerClass="phone-container-custom"
              inputClass="phone-input-custom"
            />
          </div>

          <div className="input-field">
            <label>Parol</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="submit-btn"
            type="submit"
          >
            Kirish
          </motion.button>
        </form>

        <div className="login-footer-text">
          Loginingiz yo'qmi? <Link to="/signup">Ro'yxatdan o'tish</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;