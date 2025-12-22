import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Gift, Wallet, PlusCircle } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [image, setImage] = useState(localStorage.getItem('userImage') || null);
  const [promo, setPromo] = useState('');
  
  // Balansni localStorage'dan olish
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('userBalance');
    return savedBalance ? parseFloat(savedBalance) : 0.00;
  });

  // Tanlangan valyuta (USD, UZS yoki RUB)
  const [currency, setCurrency] = useState('USD');
  const userPhone = localStorage.getItem('userPhone') || "+998 90 123 4567";

  // Kurslar
  const rates = {
    UZS: 12800,
    RUB: 92.5
  };

  useEffect(() => {
    localStorage.setItem('userBalance', balance.toString());
  }, [balance]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem('userImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkPromo = () => {
    const upperPromo = promo.trim().toUpperCase();
    if (upperPromo === "2026") {
      setBalance(prev => prev + 1.5);
      alert("Muvaffaqiyatli! 1.5$ qo'shildi");
    } else if (upperPromo === "SAIKO") {
      setBalance(prev => prev + 10);
      alert("Ajoyib! Balansingizga 10$ qo'shildi");
    } else {
      alert("Promokod xato!");
    }
    setPromo('');
  };

  // Balansni formatlash funksiyasi
  const formatBalance = () => {
    if (currency === 'UZS') {
      return (balance * rates.UZS).toLocaleString() + " SUM";
    } else if (currency === 'RUB') {
      return (balance * rates.RUB).toLocaleString() + " ₽";
    }
    return balance.toFixed(2) + " $";
  };

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ChevronLeft size={24} /> Ortga
      </button>

      <div className="profile-container">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img src={image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="User" className="main-avatar" />
            <button className="edit-icon-circle" onClick={() => fileInputRef.current.click()}>
              <Camera size={22} />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} hidden accept="image/*" />
          </div>
          <h3 className="phone-display">{userPhone}</h3>
        </div>

        {/* Balans Card */}
        <div className="balance-card">
          <div className="balance-header">
            <Wallet className="wallet-icon" size={24} />
            <span className="balance-amount">{formatBalance()}</span>
          </div>
          
          <div className="currency-selector">
            <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'active' : ''}>USD</button>
            <button onClick={() => setCurrency('UZS')} className={currency === 'UZS' ? 'active' : ''}>UZS</button>
            <button onClick={() => setCurrency('RUB')} className={currency === 'RUB' ? 'active' : ''}>RUB</button>
          </div>

          <button className="add-balance-btn">
            <PlusCircle size={20} /> Balansni to'ldirish
          </button>
        </div>

        <div className="promo-box">
          <label>Promo kod</label>
          <div className="promo-input-wrapper">
            <Gift size={20} className="gift-icon" />
            <input 
              type="text" 
              placeholder="Kodni kiriting..." 
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button className="promo-btn" onClick={checkPromo}>Tasdiqlash</button>
          </div>
        </div>

        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('token');
          navigate('/');
          window.location.reload();
        }}>
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default Profile;