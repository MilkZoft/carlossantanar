var resumeText = document.getElementById('resume-text');
var emailText = document.getElementById('email-text');

var elResume = document.getElementById('resume');
var elEmail = document.getElementById('email');

elResume.addEventListener('mouseover', function() {
  resumeText.innerHTML = 'Dowload resume';
}, false);

elResume.addEventListener('mouseout', function() {
  resumeText.innerHTML = "";
}, false);

elEmail.addEventListener('mouseover', function() {
  emailText.innerHTML = 'Send Email';
}, false);

elEmail.addEventListener('mouseout', function() {
  emailText.innerHTML = "";
}, false);
