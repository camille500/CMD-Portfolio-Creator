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
    // exporter.export(images, req, res, next);
    exporter.generateHTML(req, res, next);
  },

  generateHTML(req, res, next) {
    const dir = path.join(__dirname, '../views/dashboard/export-template.ejs');
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
    path.join(__dirname, '../public/template/index.html'));
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

    res.attachment('test.zip');
    archive.pipe(res);

    // Include IMAGE files
    for(const i in images) {
      archive.file(images[i], { name: '/assets/images/' + path.basename(images[i]) });
    }

    // Include CSS files
    archive.file(path.join(__dirname, '../public/template/assets/css/style.css') , { name: '/assets/css/style.css' });
    archive.file(path.join(__dirname, '../public/template/assets/css/bootstrap.min.css') , { name: '/assets/css/bootstrap.min.css' });
    archive.file(path.join(__dirname, '../public/template/assets/css/custom.css') , { name: '/assets/css/custom.css' });

    // Include JS files
    archive.file(path.join(__dirname, '../public/template/assets/js/script.js') , { name: '/assets/js/script.js' });
    archive.file(path.join(__dirname, '../public/template/assets/js/vendor/bootstrap.min.js') , { name: '/assets/js/vendor/bootstrap.min.js' });
    archive.file(path.join(__dirname, '../public/template/assets/js/vendor/jquery-3.3.1.min.js') , { name: '/assets/js/vendor/jquery-3.3.1.min.js' });


    archive.finalize();
  }

}

module.exports = exporter;