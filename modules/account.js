const passwordHash = require('password-hash');

const account = {

  login(req, res, next) {
    const userCollection = db.collection('users');
    userCollection.findOne({'email': req.body.mail}, function(error, user) {
      if(user == undefined || user == null) {
        res.locals.error = {
          title: 'Geen account gevonden',
          message: 'Het opgegeven e-mailadres komt niet voor in ons systeem. Registreer eerst een account.'
        };
        res.render('account/login');
      } else {
        const passwordCheck = passwordHash.verify(req.body.password, user['password']);
        if(passwordCheck == true) {
          req.session.user = {};
          req.session.user.data = user;
          req.session.user.login = true;
          res.redirect('/dashboard');
        } else {
          res.locals.error = {
            title: 'Verkeerd wachtwoord',
            message: 'Het opgegeven gegeven wachtwoord komt niet overeen met die van dit account. Probeer het nog eens.'
          };
          res.render('account/login');
        }
      }
    })
  },

  logout(req, res, next) {

  },

  register(req, res, next) {
    const userCollection = db.collection('users');
    const data = {
      id: tools.generateID(),
      name: req.body.name,
      email: req.body.mail,
      password: passwordHash.generate(req.body.password),
      about: false,
      projects: false,
    };
    userCollection.findOne({'email': data.email}, function(error, user) {
      if(user == undefined || user == null) {
        userCollection.save(data);
        res.redirect('/account/login');
      } else {
        res.locals.error = {
          title: 'E-mailadres bestaat al',
          message: 'Dit e-mailadres is al gekoppeld aan een account'
        };
        res.render('account/register');
      }
    })
  },

  check(req, res, next) {
    if(!req.session.user || req.session.user.data.status == false) {
      res.redirect('/account/login');
    } else {
      res.locals.user = req.session.user;
      res.locals.url = req.originalUrl;
      next();
    }
  },

  firstSession(req) {
    req.session.user = {
      login: {
        status: false,
        datetime: false
      },
    };
  }

}

const tools = {

  generateID() {
    var timestamp = new Date().getTime();
    var random = Math.floor((Math.random() * 100) + 1);
    var total = 0;
    for(var index = 0; index < random; index++) {
      total += Math.floor((Math.random() * 934) + 1);
    }
    return timestamp * total;
  }

};

module.exports = account;
