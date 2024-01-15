
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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
      const response = await fetch('http://localhost:3001/login', {
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

      // Başarılı giriş sonrasında sayfa yönlendirmesi ve bilgi mesajı
      navigate('/');
      window.alert('Giriş başarılı!');
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <hr />

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
      </form>
    </div>
  );
}
