import React, { useState, useEffect } from "react";

const AdList = () => {
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
    <div>
      <h2>İlanlar</h2>
      {loading ? (
        <p>İlanlar yükleniyor...</p>
      ) : (
        <ul>
          {ads.map((ad) => (
            <li key={ad.ad_id}>
              <h3>{ad.ad_name}</h3>
              <p>Fiyat: {ad.ad_price} TL</p>
              <p>Açıklama: {ad.ad_description}</p>
              {/* İlgili diğer bilgileri de burada gösterebilirsiniz */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdList;
