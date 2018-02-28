const fs = require('fs');

const editor = {

  about(req, res, next) {
    const files = req.files;
    let destination = '';
    req.session.pictures = {};
    const data = {
      for: req.session.user.data.id,
      name: req.body.name,
      about: req.body.about,
      experience: req.body.workexp,
      skills: {
        '1': {
          name: req.body.skill_1,
          about: req.body.skill_1_about,
        },
        '2': {
          name: req.body.skill_2,
          about: req.body.skill_2_about,
        },
        '3': {
          name: req.body.skill_3,
          about: req.body.skill_3_about,
        },
        '4': {
          name: req.body.skill_4,
          about: req.body.skill_4_about,
        }
      }
    }
    files.forEach(function(file, index) {
      const regexp = /(?:\.([^.]+))?$/;
      const extension = '.' + regexp.exec(file.originalname)[1];
      const filename = req.session.user.data.id + '_' + file.fieldname + extension;
      if(file.fieldname == 'profilepic') {
        destination = 'public/images/uploads/profile/' + filename;
        data.picture = destination;
      } else {
        destination = 'public/images/uploads/skills/' + filename;
        data.skills[(index).toString()]['picture'] = destination;
      }
      fs.rename(file.path, destination);
    })
    editor.saveAbout(data, req, res, next);
  },

  saveAbout(data, req, res, next) {
    const userCollection = db.collection('users');
    userCollection.findOne({'id': data.for}, function(error, user) {
      let updates = user;
      updates.about = data;
      console.log(updates);
    });
  }

}

module.exports = editor;
