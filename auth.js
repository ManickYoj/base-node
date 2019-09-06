const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('./db.js');

// Save the user ID into the session cookie when session is established
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Load the user from the session cookie when session is resumed
passport.deserializeUser((id, done) => {
  db('users').where({id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err, null); });
});

// Configure what happnes when the 'authenticate' method is invoked
passport.use(new LocalStrategy((username, password, done) => {
  db('users').where({ username }).first()
  .then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      // Success
      return done(null, user);
    } else {
      // Failure
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  })
  .catch((err) => {return done(err)});
}));

// Pass along the passport instance, configured with session and auth strategies
module.exports = passport;