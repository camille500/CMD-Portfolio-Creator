/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const multer = require('multer');

/* MODULES
----------------------------------------- */
const account = require('../modules/account');
const editor = require('../modules/editor');

/* MULTER FILE UPLOAD SETUP
----------------------------------------- */
let tempFilePath = 'public/images/uploads/temp';
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tempFilePath)
  },
  filename: function(req, file, cb) {
    const regexp = /(?:\.([^.]+))?$/;
    const extension = '.' + regexp.exec(file.originalname)[1];
    cb(null, file.fieldname + extension);
  }
});

let upload = multer({storage: storage});

/* MAIN ROUTE
----------------------------------------- */
router.get('/', account.check, function(req, res, next) {
  res.locals.title = 'Overzicht';
  res.render('dashboard/index');
});

/* TEMPLATE ROUTE
----------------------------------------- */
router.get('/template', account.check, function(req, res, next) {
  res.locals.title = 'Template kiezen';
  res.render('dashboard/template');
});

/* ABOUT ROUTE
----------------------------------------- */
router.get('/about', account.check, function(req, res, next) {
  res.locals.title = 'Over jou';
  res.render('dashboard/about');
});

router.post('/about', account.check, upload.any(), editor.about, function(req, res, next) {

});

/* PROJECTEN ROUTE
----------------------------------------- */
router.get('/projecten', account.check, function(req, res, next) {
  res.locals.title = 'Projecten';
  res.render('dashboard/projecten');
});

/* PREVIEW ROUTE
----------------------------------------- */
router.get('/preview', account.check, function(req, res, next) {
  res.locals.title = 'Preview';
  res.render('dashboard/preview');
});

/* EXPORTEER ROUTE
----------------------------------------- */
router.get('/exporteer', account.check, function(req, res, next) {
  res.locals.title = 'Exporteren';
  res.render('dashboard/exporteer');
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
