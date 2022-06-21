require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./passportConfig');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const flash = require('connect-flash');
const app = express();
const bcrypt = require('bcrypt');

let options = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'password',
  database: 'safevote',
};

const db = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, db);

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
    store: sessionStore,
  })
);
app.use(flash());
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.authenticate('session'));

initializePassport(passport, db);

app.post('/register', (req, res) => {
  let verif = false;
  const isAlreadyInDB = 'SELECT * FROM utilisateurs';
  db.query(isAlreadyInDB, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].email);
        if (result[i].email === req.body.email) {
          res.send('Email');
          verif = true;
          break;
        }
        if (result[i].tel === req.body.tel) {
          verif = true;
          res.send('Tel');
          break;
        }
      }
      console.log(verif);
      if (!verif) {
        const { email, password, nom, prenom, dateDeNaissance, tel, genre } =
          req.body;
        console.log(email, password);
        const HashedPassword = bcrypt.hashSync(password, 10);
        const query = `INSERT INTO utilisateurs (email, password, nom, prenom, dateDeNaissance, genre, tel) VALUES ('${email}', '${HashedPassword}','${nom}','${prenom}','${dateDeNaissance}','${genre}','${tel}')`;
        db.query(query, (err, result) => {
          if (err) {
            res.status(500).send(err);
            console.log(err);
          } else {
            res.send('Inscription réussie');
          }
        });
      }
    }
  });
});

app.get('/flash', function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  // res.redirect('/');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', {}, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    if (!user) {
      console.log('No User Exists');
      res.json({
        message: false,
      });
      return;
    } else {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        } else {
          // console.log(req.session);

          res.send(true);
          next();
          return;
        }
      });
    }
  })(req, res, next);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/logout', function (req, res, next) {
  // console.log(req.session);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log('Logged out');
    res.send('logout');
  });
});

app.get('/checkAuthentication', (req, res) => {
  const authenticated = req.isAuthenticated();

  console.log(authenticated);
  if (authenticated) {
    res.status(200).json({
      auth: true,
    });
  } else {
    res.status(200).json({
      auth: false,
    });
  }
});

app.get('/getUser', (req, res) => {
  const query = `SELECT * FROM utilisateurs WHERE email = '${req.user.email}'`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      // console.log(result);
      res.status(200).json({
        email: result[0].email,
        nom: result[0].nom,
        prenom: result[0].prenom,
        tel: result[0].tel,
        genre: result[0].genre,
      });
    }
  });
});

app.get('/getcandidats', (req, res) => {
  const query = `SELECT * FROM candidats`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      // console.log(result);
      res.status(200).json({
        candidats: result,
      });
    }
  });
});

app.get('/checkVote', (req, res) => {
  const query = `SELECT * FROM vote WHERE idUser = '${req.user.id}'`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      // console.log(result);
      res.status(200).json({
        vote: result,
      });
    }
  });
});

app.post('/vote', (req, res) => {
  const query = `INSERT INTO vote (idUser, idCandidat) VALUES ('${req.user.id}', '${req.body.idCandidat}')`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      // console.log(result);
      res.status(200).json({
        vote: result,
      });
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
