// Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    user_surname: '',
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
        const response = await fetch('http://localhost:3001/register', {
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
      console.log('Kayıt başarılı:', data);

      if (response.status === 200) {
        navigate('/login');
        window.alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  return (
    <div>
      <h2>Üye Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
        </div>
        <div>
          <label>Soyad:</label>
          <input type="text" name="user_surname" value={formData.user_surname} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Parola:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <br />
        <button type="submit">Kaydol</button>
      </form>
    </div>
  );
};

export default Register;
