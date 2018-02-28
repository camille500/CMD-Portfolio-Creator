(function () {

function initialize() {
  setFileUploadListeners();
  setAboutSubmit();
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


initialize();

})();
