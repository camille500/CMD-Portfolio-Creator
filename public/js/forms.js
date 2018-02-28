(function () {

function initialize() {
  setFileUploadListeners();
  setAboutSubmit();
  setAddNew();
}

function setFileUploadListeners() {
  if(document.getElementsByClassName('__skillfile')) {
    var skillfiles = document.getElementsByClassName('__inputfile');
    var profilepic = document.getElementById('profilepic');
    for(var i = 0; i < skillfiles.length; i++) {
      skillfiles[i].addEventListener('change', previewSkillImage);
    }
    profilepic.addEventListener('change', previewProfilePicture);
  }
}

function previewSkillImage(event) {
  var image_id = this.dataset.set;
  var image = document.getElementById(image_id);
  var reader = new FileReader();
  reader.onload = function(e) {
    image.src = e.target.result;
  }
  reader.readAsDataURL(this.files[0]);
}

function previewProfilePicture() {
  console.log('No available');
}

function setAboutSubmit() {
  if(document.getElementById('submitAbout')) {
    var submit = document.getElementById('submitAbout');
    submit.addEventListener('click', function(event) {
      event.preventDefault();
      var inputs = document.getElementsByTagName('input');
      var textareas = document.getElementsByTagName('textarea');
      var uploads = document.getElementsByClassName('__inputfile');
      var invalid = document.getElementsByClassName('invalid');
      for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length <= 0) {
          inputs[i].classList.add('invalid');
          toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig")
        } else {
          inputs[i].classList.remove('invalid');
        }
      }
      for(var i = 0; i < textareas.length; i++) {
        if(textareas[i].value.length <= 0) {
          textareas[i].classList.add('invalid');
          toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig")
        } else {
          textareas[i].classList.remove('invalid');
        }
      }
      for(var i = 0; i < uploads.length; i++) {
        if(uploads[i].value.length <= 0) {
          var button = document.getElementsByClassName(uploads[i].id)[0];
          button.classList.add('invalid');
          toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig")
        } else {
          var button = document.getElementsByClassName(uploads[i].id)[0];
          button.classList.remove('invalid');
        }
      }
      if(invalid.length == 0) {
        document.getElementsByTagName('form')[0].submit();
      }
    });
  }
}

function setAddNew() {
  if(document.getElementsByClassName('_add_new')) {
    var addButton = document.getElementsByClassName('_add_new')[0];
    var actualAmount = document.getElementsByClassName('_add_new').length + 1;
    addButton.addEventListener('click', function() {
      var newElement = '<div class="col-sm-6"><div class="form-material"><input class="form-control" type="text" id="study_' + actualAmount  + '" name="study_' + actualAmount  + '"><label for="study_' + actualAmount  + '">Studie</label></div></div><div class="col-sm-3"><div class="form-material"><input class="form-control" type="text" id="year_' + actualAmount  + '" name="year_' + actualAmount  + '"><label for="year_' + actualAmount  + '">Jaar</label></div></div><div class="col-sm-3"><span class="_add_new">+</span></div>';
      addButton.remove();
      var div = document.createElement('div');
      div.classList = 'row __education';
      div.innerHTML = newElement;
      document.getElementsByClassName('__education_row')[0].appendChild(div);
      document.getElementById('total_education').value = Number(document.getElementById('total_education').value) + 1;
      setTimeout(function () {
        document.getElementsByClassName('_add_new')[0].addEventListener('click', setAddNew);
      }, 100);
    });
  }
}


initialize();

})();
