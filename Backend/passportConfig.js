const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport, connection) {
  console.log('initialize');

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
            if (!bcrypt.compareSync(password, rows[0].password)) {
              return done(null, false);
            }

            // all is well, return successful user
            // console.log(rows[0]);
            return done(null, rows[0]);
          }
        );
      }
    )
  );
  passport.serializeUser(function (user, done) {
    console.log('serializeUser'); //is show in console
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    done(null, user);
  });
}

module.exports = initializePassport;
