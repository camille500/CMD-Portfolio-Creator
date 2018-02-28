/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');
const request = require('request');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");

/* DEPENDENCIES CONFIGURATION
----------------------------------------- */
const app = express();
const http = require('http').Server(app);
require('dotenv').config();

/* MONGODB CONFIGURATION
----------------------------------------- */
const MongoClient = mongodb.MongoClient;
const dbConfig = process.env.MONGODB_URI;

MongoClient.connect(dbConfig, (err, database) => {
  if (err) { return console.log(err) }
  db = database;
});

/* SESSIONS CONFIGURATION
----------------------------------------- */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

/* SET PORT
----------------------------------------- */
const port = process.env.PORT || 3005;

/* ENABLE CACHE AND COMPRESSION
----------------------------------------- */
app.set('view cache', true);
app.use(compression());

/* MIDDLEWARE FOR THE VIEW ENGINE
----------------------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* BODY-PARSER FOR READING POST REQUESTS
----------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* LOAD ALL ROUTES
----------------------------------------- */
const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const dashboardRouter = require('./routes/dashboard');

/* INITIALIZE ROUTES
----------------------------------------- */
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/dashboard', dashboardRouter);

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors');
app.use(function(req, res, next) {
  res.render('errors/404');
});

/* START THE NPM SERVER
----------------------------------------- */
http.listen(port, function() {
  console.log('Server started on port ' + port);
});
