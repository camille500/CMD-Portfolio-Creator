const fs = require('fs');

const editor = {

  about(req, res, next) {
    const files = req.files;
    let destination = '';
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
      },
      education: {},
      linkedin: req.body.linkedin,
      behance: req.body.behance,
      dribbble: req.body.dribbble,
    }
    for(var i = 1; i < (Number(req.body.total_education) + 1); i++) {
      var test = 'study_' + i;
      data.education['' + i + ''] = {
        title: req.body['study_'+ i],
        year: req.body['year_'+ i],
      }
    };
    files.forEach(function(file, index) {
      const regexp = /(?:\.([^.]+))?$/;
      const extension = '.' + regexp.exec(file.originalname)[1];
      const filename = req.session.user.data.id + '_' + file.fieldname + extension;
      if(file.fieldname == 'profilepic') {
        destination = 'public/images/uploads/profile/' + filename;
        data.picture = '/images/uploads/profile/' + filename;
      } else {
        destination = 'public/images/uploads/skills/' + filename;
        data.skills[(index).toString()]['picture'] = '/images/uploads/skills/' + filename;
      }
      fs.rename(file.path, destination);
    })
    editor.saveAbout(data, req, res, next);
  },

  saveAbout(data, req, res, next) {
    const userCollection = db.collection('users');
    userCollection.findOne({'id': data.for}, function(error, user) {
      if(error) { console.log(error) }
      let updates = user;
      updates.about = data;
      delete updates['_id'];
      req.session.user.data = updates;
      userCollection.update({
        id: data.for
      }, updates, {
        upsert: false
      }, function(err, doc) {
        next();
      });
    });
  },

  setTemplate(req, res, next) {
    const userCollection = db.collection('users');
    userCollection.findOne({'id': req.session.user.data.id}, function(error, user) {
      if(error) { console.log(error) }
      let data = user;
      data.template = req.params.id;
      delete data['_id'];
      req.session.user.data = data;
      req.session.template = req.params.id;
      userCollection.update({
        id: req.session.user.data.id
      }, data, {
        upsert: false
      }, function(err, doc) {
        next();
      });
    })
  },

  project(req, res, next) {
    const files = req.files;
    let destination = '';
    const data = {
      id: tools.generateID(),
      for: req.session.user.data.id,
      title: req.body.title,
      intro: req.body.intro,
      description: req.body.description
    };
    files.forEach(function(file, index) {
      const regexp = /(?:\.([^.]+))?$/;
      const extension = '.' + regexp.exec(file.originalname)[1];
      const filename = data.id + '_' + file.fieldname + extension;
      const destination = 'public/images/uploads/projects/' + filename;
      data.picture = '/images/uploads/projects/' + filename;
      fs.rename(file.path, destination);
      editor.saveProject(data, req, res, next);
    });
  },

  saveProject(data, req, res, next) {
    const projectCollection = db.collection('projects');
    projectCollection.findOne({'id': data.id}, function(error, project) {
      if(project == undefined || project == null) {
        projectCollection.save(data);
        res.redirect('/dashboard/projecten');
      } else {
        res.locals.error = {
          title: 'Project bestaat al',
          message: 'Een project met deze titel bestaat al, probeer het opnieuw.'
        };
        res.render('dashboard/projecten');
      }
    });
  },

  getProject(req, res, next) {
    const projectCollection = db.collection('projects');
    projectCollection.find({'for': req.session.user.data.id}, function(error, projecten) {
      projecten.toArray(function (error, projectArray) {
        projectArray.forEach(function(project) {
          if(project.id == req.params.id) {
            res.locals.project = project;
          }
        });
        next();
      });
    });
  },

  deleteProject(req, res, next) {
    const projectCollection = db.collection('projects');
    let id = req.params.id.toString();
    projectCollection.find({'for': req.session.user.data.id}, function(error, projecten) {
      projecten.toArray(function (error, projectArray) {
        projectArray.forEach(function(project) {
          if(project.id == req.params.id) {
            projectCollection.deleteOne(project);
          }
        });
        next();
      });
    });
  },

  allProjects(req, res, next) {
    req.session.projecten = [];
    const projectCollection = db.collection('projects');
    projectCollection.find({'for': req.session.user.data.id}, function(error, projecten) {
      projecten.toArray(function (error, projectArray) {
        projectArray.forEach(function(project) {
          req.session.projecten.push(project);
        });
        next();
      })
    });
  }

}

const tools = {

  generateID() {
    var timestamp = new Date().getTime();
    var random = Math.floor((Math.random() * 100) + 1);
    var total = 0;
    for(var index = 0; index < random; index++) {
      total += Math.floor((Math.random() * 3927) + 1);
    }
    return timestamp * total;
  }

};

module.exports = editor;
