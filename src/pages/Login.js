// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn, setUserId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ağ yanıtı uygun değil');
      }

      const data = await response.json();
      console.log('Giriş başarılı:', data);

      setLoggedIn(true);
      setUserId(data.user_id); // user_id'yi localStorage'e kaydet
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', data.user_id);
      navigate('/');
      window.alert('Giriş başarılı!');
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  // Oturum açıkken Login sayfasına gelindiğinde yönlendirme yap
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Parola:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Giriş Yap</button>
        <h3>Giriş yaparak kendi ev-otel odası-villa-bungalov ilanlarınızı girebilirsiniz.</h3>
      </form>
    </div>
  );
};

export default Login;
