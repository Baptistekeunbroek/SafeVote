const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'safevote',
});

app.post('/register', (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  const query = `INSERT INTO utilisateurs (username, password) VALUES ('${name}', '${password}')`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  const query = `SELECT * FROM utilisateurs WHERE username = '${name}' AND password = '${password}'`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      if (result.length === 0) {
        res.send('Invalid credentials');
      } else {
        res.send(result);
      }
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
