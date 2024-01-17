// Profile.js

import React, { useState, useEffect } from "react";

const Profile = ({ user_id }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedUserSurname, setUpdatedUserSurname] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [newAdData, setNewAdData] = useState({
    ad_name: "Yeni İlan",
    ad_price: 0,
    ad_description: "Açıklama 1",
    ad_description2: "Açıklama 2",
    ad_description3: "Açıklama 3",
    ad_address: "Adres",
    ad_photo1: "Fotoğraf Linki",
  });

  useEffect(() => {
    if (user_id) {
      fetch(`http://localhost:3001/getUsers/${user_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Veri çekme başarısız.");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Veri çekme hatası:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user_id]);

  const updateUserName = async () => {
    try {
      setUpdateLoading(true);
      const response = await fetch(
        `http://localhost:3001/updateUserName/${user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedUserName }),
        }
      );

      if (!response.ok) {
        throw new Error("Veri güncelleme başarısız.");
      }

      // Veriyi yeniden çek
      const newData = await fetch(
        `http://localhost:3001/getUsers/${user_id}`
      ).then((response) => response.json());
      setUserData(newData[0]);
    } catch (error) {
      console.error("Veri güncelleme hatası:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const updateUserSurname = async () => {
    try {
      setUpdateLoading(true);
      const response = await fetch(
        `http://localhost:3001/updateUserSurname/${user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedUserSurname }),
        }
      );

      if (!response.ok) {
        throw new Error("Veri güncelleme başarısız.");
      }

      // Veriyi yeniden çek
      const newData = await fetch(
        `http://localhost:3001/getUsers/${user_id}`
      ).then((response) => response.json());
      setUserData(newData[0]);
    } catch (error) {
      console.error("Veri güncelleme hatası:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewAdData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNewAd = async () => {
    try {
      // Yeni ilan eklemek için backend endpoint'ini çağır
      const response = await fetch(`http://localhost:3001/addAd/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdData),
      });
  
      if (!response.ok) {
        throw new Error('İlan eklenemedi.');
      }
  
      // İlanlarınızı yeniden çekmek için
      const newData = await fetch(`http://localhost:3001/getUsers/${user_id}`).then((response) => response.json());
      setUserData(newData[0]);
    } catch (error) {
      console.error('İlan eklenirken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>Profil Sayfası</h1>
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : userData ? (
        <div>
          <p>
            <strong>Ad:</strong> {userData.user_name}
          </p>
          <p>
            <strong>Soyad:</strong> {userData.user_surname}
          </p>
        </div>
      ) : (
        <p>Kullanıcı bulunamadı.</p>
      )}
      <div>
        <h2>Profil Güncelleme</h2>
        <label>
          Yeni Ad:
          <input
            type="text"
            value={updatedUserName}
            onChange={(e) => setUpdatedUserName(e.target.value)}
          />
        </label>
        <button onClick={updateUserName} disabled={updateLoading}>
          Adı Güncelle
        </button>

        <label>
          Yeni Soyad:
          <input
            type="text"
            value={updatedUserSurname}
            onChange={(e) => setUpdatedUserSurname(e.target.value)}
          />
        </label>
        <button onClick={updateUserSurname} disabled={updateLoading}>
          Soyadı Güncelle
        </button>
      </div>
      <div>
        <div>
          <div>
            <h2>İlan ekle</h2>
            <label htmlFor="adName">İlan Adı:</label>
            <input
              type="text"
              id="adName"
              value={newAdData.ad_name}
              onChange={(e) => handleInputChange("ad_name", e.target.value)}
            />

            <label htmlFor="adPrice">Fiyat:</label>
            <input
              type="number"
              id="adPrice"
              value={newAdData.ad_price}
              onChange={(e) => handleInputChange("ad_price", e.target.value)}
            />

            <label htmlFor="adDescription1">Açıklama 1:</label>
            <input
              type="text"
              id="adDescription1"
              value={newAdData.ad_description}
              onChange={(e) =>
                handleInputChange("ad_description", e.target.value)
              }
            />

            <label htmlFor="adDescription2">Açıklama 2:</label>
            <input
              type="text"
              id="adDescription2"
              value={newAdData.ad_description2}
              onChange={(e) =>
                handleInputChange("ad_description2", e.target.value)
              }
            />

            <label htmlFor="adDescription3">Açıklama 3:</label>
            <input
              type="text"
              id="adDescription3"
              value={newAdData.ad_description3}
              onChange={(e) =>
                handleInputChange("ad_description3", e.target.value)
              }
            />

            <label htmlFor="adAddress">Adres:</label>
            <input
              type="text"
              id="adAddress"
              value={newAdData.ad_address}
              onChange={(e) =>
                handleInputChange("ad_address", e.target.value)
              }
            />

            <label htmlFor="adPhoto">Fotoğraf Linki:</label>
            <input
              type="text"
              id="adPhoto"
              value={newAdData.ad_photo1}
              onChange={(e) =>
                handleInputChange("ad_photo1", e.target.value)
              }
            />

            <button onClick={handleNewAd}>Yeni İlan Ekle</button>
          </div>
          {/* ilanlar buradan eklenecek */}
        </div>
        <div>
          <h2>İlanlarım</h2>
          <ul>
            {userData && userData.ads ? (
              userData.ads.map((ad) => (
                <li key={ad.ad_id}>{ad.ad_name}</li>
              ))
            ) : (
              <p>Kullanıcının ilanı bulunmamaktadır.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
