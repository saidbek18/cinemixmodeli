import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import './App.css';

// Navbar qayerda ko'rinishini boshqaradigan yordamchi komponent
const AppContent = () => {
  const location = useLocation();
  
  // Navbar ko'rinmasligi kerak bo'lgan sahifalar ro'yxati
  const hideNavbarPaths = ['/login', '/signup', '/profile'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Agar hozirgi sahifa hideNavbarPaths ichida bo'lmasa, Navbar chiqadi */}
      {!shouldHideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;