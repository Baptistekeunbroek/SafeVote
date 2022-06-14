require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const initializePassport = require('./passportConfig');
const app = express();
const passportLocal = require('passport-local').Strategy;

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'safevote',
});

app.use(express.json());
// app.use(cookieParser('secret'));
app.use(
  cors({
    origin: '*',
  })
);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24, // 86400000 1 day
    // },
  })
);
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport, db);

app.post('/register', (req, res) => {
  const { email, password, nom, prenom, dateDeNaissance } = req.body;
  console.log(email, password);
  const query = `INSERT INTO utilisateurs (email, password, nom, prenom, dateDeNaissance) VALUES ('${email}', '${password}','${nom}','${prenom}','${dateDeNaissance}')`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: 'Invalid username or password.',
    },
    (err, user) => {
      console.log(user);
      if (err) throw err;
      if (!user) console.log('No User Exists');
      else {
        req.logIn(user, (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send('Successfully Authenticated');
            console.log(req.user);
          }
        });
      }
    }
  )(req, res, next);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/checkAuthentication', (req, res) => {
  const authenticated = req.isAuthenticated();
  // console.log(req);
  console.log(req.isAuthenticated());
  res.status(200).json({
    authenticated,
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
