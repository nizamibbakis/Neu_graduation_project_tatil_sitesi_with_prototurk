import React, { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <div>
      <h1>Profil Sayfası</h1>
      <p>Bu profil sayfası henüz içerik içermiyor.</p>


      <ul>
          {data.map(item => (
            <li key={item}>
              <div>
                <strong>Ad:</strong> {item.user_name}
              </div>
              <div>
                <strong>Soyad:</strong> {item.user_surname}
              </div>
            </li>
          ))}
        </ul>


      <div>
        <h2>İlanlarım</h2>
      </div>
    </div>
  );
};

export default Profile;
