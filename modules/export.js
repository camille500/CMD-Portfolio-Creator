const archiver = require('archiver');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const exporter = {

  init(req, res, next) {
    const images = [];
    const about = req.session.user.data.about;
    const projecten = req.session.projecten;
    images.push(path.join(__dirname, '../public/', about.picture));
    for(key in about.skills) {
      images.push(path.join(__dirname, '../public/', about.skills[key].picture))
    }
    projecten.forEach(function(project) {
      images.push(path.join(__dirname, '../public/', project.picture));
    });
    exporter.generateHTML(images, req, res, next);
  },

  generateHTML(images, req, res, next) {
    const dir = path.join(__dirname, '../views/dashboard/exporteer/' + req.session.template + '.ejs');
    function generate(path, information, output) {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) { console.log(err); return false; }
        let ejs_string = data;;
        let template = ejs.compile(ejs_string);
        let html = template(information);
        fs.writeFile(output, html, function(err) {
            if(err) { console.log(err); return false }
            return true;
        });
      });
    }
    generate(dir, {
      user: req.session.user,
      projecten: req.session.projecten
    },
    path.join(__dirname, '../public/template/' + req.session.user.data.id + '.html'));
    setTimeout(function () {
      exporter.export(images, req, res, next);
    }, 500);
  },

  export(images, req, res, next) {

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    archive.on('error', function(err) {
      console.log('error');
    });

    archive.on('end', function() {
      console.log('Archive wrote %d bytes', archive.pointer());
    });

    res.attachment('CMD Portfolio Template.zip');
    archive.pipe(res);

    // Include IMAGE files
    for(const i in images) {
      if(images[i].includes('skills')) {
        archive.file(images[i], { name: '/assets/images/uploads/skills/' + path.basename(images[i]) });
      } else if(images[i].includes('profilepic')) {
        archive.file(images[i], { name: '/assets/images/uploads/profile/' + path.basename(images[i]) });
      } else if(images[i].includes('projects')) {
        archive.file(images[i], { name: '/assets/images/uploads/projects/' + path.basename(images[i]) });
      }
    }

    // Include CSS files
    archive.file(path.join(__dirname, '../public/template/' + req.session.template + '/assets/css/style.css') , { name: '/assets/css/style.css' });
    archive.file(path.join(__dirname, '../public/template/' + req.session.template + '/assets/css/bootstrap.min.css') , { name: '/assets/css/bootstrap.min.css' });
    archive.file(path.join(__dirname, '../public/template/' + req.session.template + '/assets/css/custom.css') , { name: '/assets/css/custom.css' });

    // Include JS files
    archive.file(path.join(__dirname, '../public/template/' + req.session.template + '/assets/js/script.js') , { name: '/assets/js/script.js' });
    archive.file(path.join(__dirname, '../public/template/' + req.session.template + '/assets/js/vendor/bootstrap.min.js') , { name: '/assets/js/vendor/bootstrap.min.js' });
    archive.file(path.join(__dirname, '../public/template/' + req.session.template + '/assets/js/vendor/jquery-3.3.1.min.js') , { name: '/assets/js/vendor/jquery-3.3.1.min.js' });

    console.log(req.session.user.data.id);
    archive.file(path.join(__dirname, '../public/template/' + req.session.user.data.id + '.html') , { name: 'index.html' });

    archive.finalize();
  }

}

module.exports = exporter;
