// App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setLoggedIn(!!isLoggedIn);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <>
      <nav style={{ display: 'flex', fontSize: '25px', fontFamily: 'helvetica' }}>
        <div style={{ flex: '1', marginLeft: '20px' }}>
          <NavLink to="/">Anasayfa </NavLink>
        </div>
        <div style={{ marginRight: '30px' }}>
          {loggedIn ? (
            <>
              <NavLink to="/Profile">Profil-İlanlarım</NavLink>&nbsp;
              &nbsp;<Link to="#" onClick={handleLogout}>Çıkış Yap</Link>
            </>
          ) : (
            <>
              <NavLink to="/Login">Giriş </NavLink>
              <NavLink to="/register">Üye Ol</NavLink>
            </>
          )}
        </div>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} setUserId={setUserId} />} />
        <Route path="/register" element={<Register />} />
        {loggedIn ? (
          <Route
            path="/Profile"
            element={<Profile user_id={userId} />} // user_id'yi Profile sayfasına gönder
          />
        ) : (
          <Route path="/Profile" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
};

export default App;
