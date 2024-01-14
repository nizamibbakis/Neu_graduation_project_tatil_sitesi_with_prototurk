const express = require('express');
const app = express();
const sql = require('mssql');
const cors = require('cors');

app.use(cors());
const port = 3001; // İstediğiniz bir port numarasını seçin

const config = {
    user: 'sa',
    password: '12345',
    server: 'NIZAMI-PC',
    database: 'proje_1',
    options: {
      encrypt: true,
      trustServerCertificate: true, 
    },
};

// Veritabanı bağlantısını başlatan fonksiyon
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('MSSQL veritabanına bağlandı');
  } catch (err) {
    console.error('Bağlantı hatası:', err);
  }
};

// Veritabanı bağlantısını sonlandıran fonksiyon
const disconnectDB = () => {
  sql.close();
  console.log('MSSQL veritabanı bağlantısı kapatıldı');
};

let counter = 0;


app.get('/', async (req, res) => {
  try {
    counter++;
    console.log(`Sayfa yenilendi. Sayaç: ${counter}`);
    // Bağlantıyı başlat
    await connectDB();

    const result = await sql.query('SELECT * FROM users');

    res.json(result.recordset);
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    // Bağlantıyı sonlandır
    disconnectDB();
  }
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});

console.log("deneme1")