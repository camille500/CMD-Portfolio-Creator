/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const multer = require('multer');

/* MODULES
----------------------------------------- */
const account = require('../modules/account');
const editor = require('../modules/editor');
const exporter = require('../modules/export');

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
router.get('/', account.check, editor.allProjects, function(req, res, next) {
  res.locals.projects = req.session.projecten;
  res.locals.title = 'Overzicht';
  res.render('dashboard/index');
});

/* TEMPLATE ROUTE
----------------------------------------- */
router.get('/template', account.check, function(req, res, next) {
  res.locals.title = 'Template kiezen';
  res.render('dashboard/template');
});

router.get('/template/pick/:id', account.check, editor.setTemplate, function(req, res, next) {
  res.redirect('/dashboard');
});

/* ABOUT ROUTE
----------------------------------------- */
router.get('/about', account.check, function(req, res, next) {
  res.locals.title = 'Over jou';
  res.render('dashboard/about');
});

router.post('/about', account.check, upload.any(), editor.about, function(req, res, next) {
  res.redirect('/dashboard/about');
});

/* PROJECTEN ROUTE
----------------------------------------- */
router.get('/projecten', account.check, editor.allProjects, function(req, res, next) {
  res.locals.projecten = req.session.projecten;
  res.locals.error = false;
  res.locals.title = 'Projecten';
  res.render('dashboard/projecten');
});

router.get('/projecten/nieuw/:id', account.check, function(req, res, next) {
  res.locals.title = 'Nieuw project';
  res.render('dashboard/new-project');
});

router.get('/projecten/bewerk/:id', account.check, editor.getProject, function(req, res, next) {
  res.locals.title = 'Bewerk project';
  res.render('dashboard/edit-project');
});

router.post('/projecten/bewerk/:id', account.check, editor.deleteProject, upload.any(), editor.project, function(req, res, next) {
  res.locals.title = 'Bewerk project';
  res.render('dashboard/edit-project');
});

router.get('/projecten/delete/:id', account.check, editor.deleteProject, editor.allProjects, function(req, res, next) {
  res.locals.title = 'Projecten';
  res.locals.projecten = req.session.projecten;
  res.locals.error = {
    title: 'Project verwijderd',
    message: 'Het project is succesvol verwijders en uit je overzicht gehaald.'
  }
  res.render('dashboard/projecten');
});

router.post('/projecten/nieuw/:id', account.check, upload.any(), editor.project, function(req, res, next) {
  res.locals.title = 'Nieuw project';
  res.render('dashboard/new-project');
});

/* PREVIEW ROUTE
----------------------------------------- */
router.get('/preview', account.check, editor.allProjects, function(req, res, next) {
  res.locals.projecten = req.session.projecten;
  res.locals.title = 'Preview';
  res.render('dashboard/preview/' + req.session.template);
});

/* EXPORTEER ROUTE
----------------------------------------- */
router.get('/exporteer', account.check, editor.allProjects, exporter.init, function(req, res, next) {
  res.locals.title = 'Exporteren';
  res.render('dashboard/exporteer');
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
