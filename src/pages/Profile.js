import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user_id }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedUserSurname, setUpdatedUserSurname] = useState("");
  const [ads, setAds] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [newAdData, setNewAdData] = useState({
    ad_name: "Yeni İlan",
    ad_price: 0,
    ad_description: "Açıklama 1",
    ad_description2: "Açıklama 2",
    ad_description3: "Açıklama 3",
    ad_adress: "Adres",
    ad_photo1: null,
  });

  useEffect(() => {
    if (user_id) {
      fetch(`http://localhost:3001/getUserAds/${user_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("İlanlar getirilemedi.");
          }
          return response.json();
        })
        .then((data) => {
          setAds(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("İlanlar getirme hatası:", error);
          setLoading(false);
        });

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

      // İlanları çek
      fetchAds();
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
      const formData = new FormData();
      for (const key in newAdData) {
        formData.append(key, newAdData[key]);
      }

      // Yeni ilan eklemek için backend endpoint'ini çağır
      const response = await fetch(`http://localhost:3001/addAd/${user_id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("İlan eklenemedi.");
      }

      // İlanlarınızı yeniden çekmek için
      const newData = await fetch(
        `http://localhost:3001/getUsers/${user_id}`
      ).then((response) => response.json());
      setUserData(newData[0]);
      
      // İlan ekledikten sonra kullanıcıyı başka bir sayfaya yönlendir
      navigate('/');
      window.location.reload(false);
    } catch (error) {
      console.error("İlan eklenirken bir hata oluştu:", error);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getUserAds/${user_id}`);
      if (!response.ok) {
        throw new Error("İlanlar getirilemedi.");
      }
      const data = await response.json();
      setAds(data);
      setLoading(false);
    } catch (error) {
      console.error("İlanlar getirme hatası:", error);
      setLoading(false);
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

            <label htmlFor="adDescription3">İletişim-Tel:</label>
            <input
              type="text"
              id="adDescription3"
              value={newAdData.ad_description3}
              onChange={(e) =>
                handleInputChange("ad_description3", e.target.value)
              }
            />

            <label htmlFor="adAdress">Adres:</label>
            <input
              type="text"
              id="adAdress"
              value={newAdData.ad_adress}
              onChange={(e) => handleInputChange("ad_adress", e.target.value)}
            />

            <label htmlFor="adPhoto">Fotoğraf Linki:</label>
            <input
              type="file"
              id="adPhoto"
              onChange={(e) =>
                handleInputChange("ad_photo1", e.target.files[0])
              }
            />

            <button onClick={handleNewAd}>Yeni İlan Ekle</button>
          </div>
          {/* ilanlar buradan eklenecek */}
        </div>
        <div>
          <h2>İlanlarım</h2>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {ads.map((ad) => (
              <li key={ad.ad_id} style={{ border: '3px solid #ddd', marginBottom: '10px', width: '400px', padding: '10px' }}>
                <h3>{ad.ad_name}</h3>
                <p>Fiyat: {ad.ad_price} TL</p>
                <p>Açıklama 1: {ad.ad_description}</p>
                <p>Açıklama 2: {ad.ad_description2}</p>
                <p>İletişim-Tel: {ad.ad_description3}</p>
                <p>Adres: {ad.ad_adress}</p>
                {ad.ad_photo1 && <img src={`http://localhost:3001/${ad.ad_photo1}`} alt={ad.ad_photo1} style={{ maxWidth: '100%', height: 'auto' }} />}
                {/* İlgili diğer bilgileri de burada gösterebilirsiniz */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
