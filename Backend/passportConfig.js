const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport, connection) {
  console.log('initialize');

  passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    connection.query(
      'select * from utilisateurs where id = ' + id,
      function (err, rows) {
        done(err, rows[0]);
      }
    );
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        // passReqToCallback: true,
      },
      function (email, password, done) {
        // console.log(email, password);
        connection.query(
          "SELECT * FROM `utilisateurs` WHERE `email` = '" + email + "'",
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(null, false);
            }

            if (!(rows[0].password == password))
              return done(
                null,
                false
                // req.flash('loginMessage', 'Oops! Wrong password.')
              ); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            // console.log(rows[0]);
            return done(null, rows[0]);
          }
        );
      }
    )
  );
}

module.exports = initializePassport;
