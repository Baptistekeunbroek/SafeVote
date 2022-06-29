const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./passportConfig');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const transporter = require('./config');
const { mainModule } = require('process');

// Inintialisation de la bdd
let options = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'password',
  database: 'safevote',
};
const db = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, db);

// Initialisation de passport et de la session
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
      for (let i = 0; i < result.length; i++) {
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
      if (!verif) {
        const { email, password, nom, prenom, dateDeNaissance, tel, genre } =
          req.body;
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
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send('logout');
  });
});

app.get('/checkAuthentication', (req, res) => {
  const authenticated = req.isAuthenticated();

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
      res.status(200).json({
        vote: result,
      });
    }
  });
});

app.post('/sendConfirmationEmail', async (req, res) => {
  const vote = req.body.vote;
  const email = req.user.email;
  const nom = req.user.nom;
  const prenom = req.user.prenom;
  console.log(email);
  const mail = await transporter.sendMail({
    from: '"SafeVote" <safevoteL3@outlook.com>', // sender address
    to: email, // list of receivers
    subject: `Récipissé de votre vote ${nom} ${prenom}`, // Subject line
    text: 'Vote', // plain text body
    html: `<h1>Bonjour</h1> <p>Voici votre vote : ${vote.prenomC} ${vote.nomC}`, // html body
  });
  console.log('Message sent: %s', mail.messageId);
  res.status(200).json({
    vote,
    email,
  });
});

app.post('/creerSondage', (req, res) => {
  const { titre, description, option1, option2, option3, option4 } = req.body;
  const id = req.user.id;

  const query = `INSERT INTO sondage (userID, titre, descr, option1, option2, option3,option4) VALUES ('${id}', '${titre}', '${description}', '${option1}', '${option2}', '${option3}','${option4}')`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).json({
        sondage: result,
      });
    }
  });
});

app.get('/getSondages', (req, res) => {
  const query = `SELECT * FROM sondage`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).json({
        sondages: result,
      });
    }
  });
});

app.get('/getSondage/:id', (req, res) => {
  const query = `SELECT * FROM sondage WHERE idSondage = '${req.params.id}'`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).json({
        sondage: result,
      });
    }
  });
});

app.post('/voteSondage/:id', (req, res) => {
  const query = `INSERT INTO voteSondage (idUser, idSondage) VALUES ('${req.user.id}', '${req.params.id}')`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).json({
        vote: result,
      });
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
