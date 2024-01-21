// server.js

const express = require('express');
const app = express();
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = 3001;

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

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('MSSQL veritabanına bağlandı');

  } catch (err) {
    console.error('Bağlantı hatası:', err);
  }
};

const disconnectDB = () => {
  sql.close();
  console.log('MSSQL veritabanı bağlantısı kapatıldı');
};

let counter = 0;

app.get('/getUsers', async (req, res) => {
  try {
    counter++;
    console.log(`Sayfa yenilendi. Sayaç-getUsers: ${counter}`);
    await connectDB();

    const result = await sql.query('SELECT * FROM users');


    
    res.json(result.recordset);
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});

app.post('/register', async (req, res) => {
  try {
    await connectDB();

    const { user_name, user_surname, email, password } = req.body;

    const result = await sql.query(`
      INSERT INTO users (user_name, user_surname, email, password)
      VALUES ('${user_name}', '${user_surname}', '${email}', '${password}');
    `);

    res.status(200).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});

app.post('/login', async (req, res) => {
  try {
    await connectDB();

    const { email, password } = req.body;

    const result = await sql.query(`
      SELECT user_id FROM users
      WHERE email = '${email}' AND password = '${password}';
    `);

    if (result.recordset.length > 0) {
      const user_id = result.recordset[0].user_id;
      res.status(200).json({ message: 'Giriş başarılı.', user_id });
    } else {
      res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı.' });
    }
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});


app.get('/getUsers/:user_id', async (req, res) => {
  try {
    await connectDB();

    const { user_id } = req.params;

    const result = await sql.query(`
      SELECT * FROM users
      WHERE user_id = '${user_id}';
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});

app.put('/updateUserName/:user_id', async (req, res) => {
  try {
    await connectDB();

    const { user_id } = req.params;
    const { updatedUserName } = req.body;

    const result = await sql.query(`
      UPDATE users
      SET user_name = '${updatedUserName}'
      WHERE user_id = '${user_id}';
    `);

    res.status(200).json({ message: 'User name updated successfully.' });
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});

app.put('/updateUserSurname/:user_id', async (req, res) => {
  try {
    await connectDB();

    const { user_id } = req.params;
    const { updatedUserSurname } = req.body;

    const result = await sql.query(`
      UPDATE users
      SET user_surname = '${updatedUserSurname}'
      WHERE user_id = '${user_id}';
    `);

    res.status(200).json({ message: 'User surname updated successfully.' });
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});

app.post('/addAd/:user_id', async (req, res) => {
  try {
    await connectDB();

    const { user_id } = req.params;
    const { ad_name, ad_price, ad_description, ad_description2, ad_description3, ad_adress, ad_photo1 } = req.body;

    const result = await sql.query(`
      INSERT INTO ads (ad_name, ad_price, ad_description, ad_description2, ad_description3, user_id, ad_adress, ad_photo1)
      VALUES ('${ad_name}', '${ad_price}', '${ad_description}', '${ad_description2}', '${ad_description3}', '${user_id}', '${ad_adress}', '${ad_photo1}');
    `);

    res.status(200).json({ message: 'İlan başarıyla eklendi.' });
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});

app.get('/getUserAds/:user_id', async (req, res) => {
  try {
    await connectDB();

    const { user_id } = req.params;

    const result = await sql.query(`
      SELECT * FROM ads
      WHERE user_id = '${user_id}';
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Veritabanı hatası: ', err);
    res.status(500).send('Veritabanı hatası');
  } finally {
    disconnectDB();
  }
});



app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});

console.log('deneme1');
