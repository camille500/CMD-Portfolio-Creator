const globals = {
  noSession(req, res, next) {
    res.locals.error = {
      title: 'Gebruikt e-mailadres',
      message: 'Dit e-mailadres komt al voor in ons systeem. Vraag je wachtwoord op als je deze bent vergeten.',
    };
    next();
  }
}

module.exports = globals;
