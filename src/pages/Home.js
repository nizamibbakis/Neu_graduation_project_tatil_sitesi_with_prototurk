import React, { useState, useEffect } from "react";






const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUserAds");
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

    fetchAds();
  }, []);

  


  

  return (
    <div >
  <h2>İlanlar</h2>
  {loading ? (
    <p>İlanlar yükleniyor...</p>
  ) : (
    <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {ads.map((ad) => (
        <li key={ad.ad_id} style={{ border: '3px solid #ddd', marginBottom: '10px', width: '400px', padding: '10px' }}>
          <h3>{ad.ad_name}</h3>
        <p>Fiyat: {ad.ad_price} TL</p>
        <p>Açıklama 1: {ad.ad_description}</p>
        <p>Açıklama 2: {ad.ad_description2}</p>
        <p>İletişim-Tel: {ad.ad_description3}</p>
        <p>Adres: {ad.ad_adress}</p>
          {/* {ad.ad_photo1 && <img src={ad.ad_photo1} alt={ad.ad_photo1} style={{ maxWidth: '100%', height: 'auto' }} />} */}
          {ad.ad_photo1 && <img src={`http://localhost:3001/${ad.ad_photo1}`} alt={ad.ad_photo1} style={{ maxWidth: '100%', height: 'auto' }} />}
          {/* İlgili diğer bilgileri de burada gösterebilirsiniz */}
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default Home;
