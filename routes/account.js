/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();

const account = require('../modules/account');

/* LOGIN ROUTES
----------------------------------------- */
router.get('/login', function(req, res, next) {
  res.locals.error = { title: false };
  res.render('account/login');
});

router.post('/login', account.login, function(req, res, next) {
  res.redirect('/dashboard');
});

/* REGISTER ROUTES
----------------------------------------- */
router.get('/register', function(req, res, next) {
  res.locals.error = { title: false };
  res.render('account/register');
});

router.post('/register', account.register, function(req, res, next) {
  res.redirect('/account/login');
});

/* LOGOUT ROUTE
----------------------------------------- */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(error) {
    res.redirect('/account/login');
  });
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
