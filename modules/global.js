const globals = {
  noSession(req, res, next) {
    res.locals.error = {
      title: 'Gebruikt e-mailadres',
      message: 'Dit e-mailadres komt al voor in ons systeem. Vraag je wachtwoord op als je deze bent vergeten.',
    };
    next();
  },
  test(req, res, next) {
    console.log(req.files);
    console.log(req.body);
  }
}

module.exports = globals;
