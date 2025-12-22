import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios'; // Axiosni import qildik
import './Signup.css';

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Parollar mosligini tekshirish
    if (password !== confirmPassword) {
      return setError("Parollar bir-biriga mos kelmadi!");
    }

    // 2. Parol uzunligini tekshirish
    if (password.length < 8) {
      return setError("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
    }

    setLoading(true);

    try {
      // Backendga so'rov yuborish
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        phone: phone,
        password: password
      });

      if (response.status === 201) {
        alert("Ro'yxatdan muvaffaqiyatli o'tdingiz! Endi tizimga kiring.");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Ro'yxatdan o'tishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <button className="signup-back-btn" onClick={() => navigate('/')}>
        <ChevronLeft size={24} /> Ortga
      </button>

      <motion.div 
        className="signup-box"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="signup-header">
          <h2>CINEMA<span>PRO</span></h2>
          <p>Yangi hisob yaratish</p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          {/* Xatolik xabarini chiqarish */}
          {error && <p style={{ color: '#ff4d4d', textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

          <div className="signup-field">
            <label>Telefon raqam</label>
            <PhoneInput
              country={'uz'}
              value={phone}
              onChange={setPhone}
              placeholder="99 123 45 67"
              containerClass="signup-phone-container"
              inputClass="signup-phone-input"
              disabled={loading}
            />
          </div>

          <div className="signup-field">
            <label>Parol yarating</label>
            <input 
              type="password" 
              placeholder="Kamida 8 ta belgi" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={loading}
            />
          </div>

          <div className="signup-field">
            <label>Parolni tasdiqlang</label>
            <input 
              type="password" 
              placeholder="Parolni qayta kiriting" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
              disabled={loading}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="signup-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </motion.button>
        </form>

        <div className="signup-footer-text">
          Akkauntingiz bormi? <Link to="/login">Kirish</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;