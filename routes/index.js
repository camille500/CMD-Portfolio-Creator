/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();

const account = require('../modules/account');

/* MAIN ROUTE
----------------------------------------- */
router.get('/', account.check, function(req, res, next) {
  res.redirect('/dashboard');
});

router.get('/testing', function(req, res, next) {
  res.locals.url = '/testing';
  res.locals.title = 'Test pagina';
  res.render('testing');
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
