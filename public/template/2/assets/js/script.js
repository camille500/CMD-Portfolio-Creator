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
    window.scrollTo(0, 0);

    var element = document.getElementById('project_' + this.dataset.open);
    element.style.display = 'block';
  }

  function closeInfoPage() {
    // document.body.style.overflow = 'auto';
    var element = document.getElementById('project_' + this.dataset.close);
    element.style.display = 'none';
  }

})();
