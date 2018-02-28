(function () {

function initialize() {
  setFileUploadListeners();
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
  console.log(this.files[0]);
  reader.readAsDataURL(this.files[0]);
}

function previewProfilePicture() {
  // var reader = new FileReader();
  // var image = document.getElementsByClassName('__profile_preview')[0];
  // reader.onload = function(e) {
  //   image.src = e.target.result;
  // }
  // reader.readAsDataURL(this.files[0]);
}


initialize();

})();
