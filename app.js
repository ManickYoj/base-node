// MODULE IMPORTS ----- //
require('dotenv').config()
const express = require('express')
const session = require("express-session");
const bodyParser = require("body-parser");

const auth = require('./auth.js')

// CONFIG ----- //
const app = express()

app.use(express.static("public"));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize());
app.use(auth.session());

// ROUTES ----- //
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/login',
  auth.authenticate('local', {failureRedirect: '/login'}),
  // On successful authentication
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
})

module.exports = app;
