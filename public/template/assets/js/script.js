(function () {
  console.log('Loaded');

  var projects = document.getElementsByClassName('project');
  var closes = document.getElementsByClassName('close');
  var copyYear = document.getElementById('copyYear');
  copyYear.textContent = new Date().getFullYear();

  for(var i = 0; i < projects.length; i++) {
    projects[i].addEventListener('click', openInfoPage);
  };

  for(var i = 0; i < closes.length; i++) {
    closes[i].addEventListener('click', closeInfoPage);
  };

  function openInfoPage() {
    var element = document.getElementById('project_' + this.dataset.open);
    element.style.display = 'block';
  }

  function closeInfoPage() {
    console.log(this.dataset)
    var element = document.getElementById('project_' + this.dataset.close);
    console.log(element)
    element.style.display = 'none';
  }

})();
