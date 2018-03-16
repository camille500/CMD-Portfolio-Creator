(function () {

function initialize() {
  setFileUploadListeners();
  setAboutSubmit();
  addButton();
  removeButtons();
  setSkillImageDeleteButtons();
}

function setFileUploadListeners() {
  if(document.getElementsByClassName('__skillfile').length) {
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

function setSkillImageDeleteButtons() {
  var count = 0;
  var previews = document.getElementsByClassName('__skill_image');
  for(var i = 0; i < previews.length; i++) {
    if(previews[i].src.indexOf('/images/uploads/skills/') >= 0) {
      document.getElementsByClassName('__skillfile')[i].disabled = true;
      var buttonSpan = document.getElementsByClassName('__filelabel')[i];
      buttonSpan.getElementsByTagName('span')[0].textContent = 'Delete icon';
      buttonSpan.getElementsByTagName('img')[0].src = '/images/delete.png';
      buttonSpan.addEventListener('click', deleteIcon);
      count ++;
    }
  }
}

function deleteIcon() {
  var number = this.dataset.delete;
  document.getElementsByClassName('__skill_image')[number].src = '';
  var buttonSpan = document.getElementsByClassName('__filelabel')[number];
  buttonSpan.getElementsByTagName('span')[0].textContent = 'Upload icon';
  buttonSpan.getElementsByTagName('img')[0].src = '/images/upload.png';
  setTimeout(function () {
    document.getElementsByClassName('__skillfile')[number].disabled = false;
  }, 50);
}

function previewProfilePicture() {
  // console.log('No available');
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
          if(inputs[i].type == 'file') {
            if(!inputs[i].disabled) {
              inputs[i].classList.add('invalid');
              toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig");
            }
          } else {
            inputs[i].classList.add('invalid');
            toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig");
          }
        } else {
          inputs[i].classList.remove('invalid');
        }
      }
      for(var i = 0; i < textareas.length; i++) {
        if(textareas[i].value.length <= 0) {
          textareas[i].classList.add('invalid');
          toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig");
        } else {
          textareas[i].classList.remove('invalid');
        }
      }
      for(var i = 0; i < uploads.length; i++) {
        if(uploads[i].value.length <= 0) {
          if(!document.getElementsByClassName('__skillfile')[i].disabled) {
            var button = document.getElementsByClassName(uploads[i].id)[0];
            button.classList.add('invalid');
            toastr["error"]("Niet alle informatie is ingevuld, of er zijn geen afbeeldingen geüpload.. Check alle rode vlakken en probeer het nog eens.", "Onvolledig");
          }
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
  if(document.getElementsByClassName('_add_new').length) {
    var addButton = document.getElementsByClassName('_add_new')[0];
    var actualAmount = document.getElementsByClassName('_add_new').length + 1;
    addButton.addEventListener('click', addButton);
  }
}

function addButton() {
  var buttons = document.getElementsByClassName('_add_new');
  var addButton = buttons[0];
  var actualAmount = document.getElementsByClassName('_add_new').length + 1;
  addButton.addEventListener('click', addButton);
  var newElement = '<div class="col-sm-6"><div class="form-material"><input class="form-control" type="text" id="study_' + actualAmount  + '" name="study_' + actualAmount  + '"><label for="study_' + actualAmount  + '">Studie</label></div></div><div class="col-sm-3"><div class="form-material"><input class="form-control" type="text" id="year_' + actualAmount  + '" name="year_' + actualAmount  + '"><label for="year_' + actualAmount  + '">Jaar</label></div></div><div class="col-sm-3"><span class="_add_new">+</span></div>';
  addButton.remove();
  var div = document.createElement('div');
  div.classList = 'row __education';
  div.innerHTML = newElement;
  document.getElementsByClassName('__education_row')[0].appendChild(div);
  document.getElementById('total_education').value = Number(document.getElementById('total_education').value) + 1;
  setTimeout(function () {
    document.getElementsByClassName('_add_new')[0].addEventListener('click', addButton);
    setButtonListener();
  }, 100);
}

function setButtonListener() {
  document.getElementsByClassName('_add_new')[0].addEventListener('click', addButton);
}

function removeButtons() {
  if(document.getElementsByClassName('_add_new')) {
    var buttons = document.getElementsByClassName('_add_new');
    if(buttons.length > 1) {
      for(var i = 0; i < buttons.length; i++) {
        if(i == buttons.length - 1) {
          buttons[i].addEventListener('click', addButton)
        }
      }
      for(var i = 0; i < buttons.length; i++) {
        if(i != buttons.length - 1) {
          buttons[i].remove();
        }
      }
    }
  }
}


initialize();

})();
