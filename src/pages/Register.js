import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); // useNavigate hook'u

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
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      // Başarılı kayıt sonrasında sayfa yönlendirmesi ve bilgi mesajı
      navigate('/'); // '/app' sayfa yoluna yönlendirilebilirsiniz
      window.alert('Kayıt başarılı!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div>
      <hr />

      <h2>Üye ol</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ad:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Soyad:
          <input type="text" name="user_surname" value={formData.user_surname} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Parola:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        &nbsp;<br>
        </br>
        <button type="submit">Kaydol</button>
      </form>
    </div>
  );
};

export default Register;
