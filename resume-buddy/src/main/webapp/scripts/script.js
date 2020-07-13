function blobUpload() {
    fetch('/blobstore-upload-url')
        .then((response) => {
            return response.text();
    })
    .then((resumeUploadUrl) => { 
        const resume = document.getElementById('form'); 
        resume.action = resumeUploadUrl; 
    });
}

function login() {
    fetch('/login').then(response => response.json()).then((login) => {
        const loginLinkElement = document.getElementById('login-container');
        const myAccountElement = document.getElementById('my-account');
        const greetingElement = document.getElementById('greeting-container');
        if (login.isValidUser) {
            // Show the 'my account' option
            // Show a log out option
            greetingElement.innerHTML = "Welcome " + login.email + "!";
            myAccountElement.innerHTML = "<a href=\"resume-review.html\">My Account</a>" +
            "  •  " + "<a href=\"" + login.logout_url + "\">Log Out</a>";
            loginLinkElement.style.display = "none";
        }
        else {
            // Show the log in option
            loginLinkElement.innerHTML = "<a href=\"" + 
            login.login_url + "\">Log In</a>";
            myAccountElement.style.display = "none";
            greetingElement.style.display = "none";
        }
    });
}

/** Class function when page loads */
function start() {
  blobUpload();
  populateUnis();
  populateCareers();
}

/** Gets university names from json file and populates options for school */
function populateUnis() {
  const schoolSelect = document.getElementById("school");
  fetch("universities.json")
    .then(response => response.json())
    .then(unis => {
      unis.forEach((uni) => {
        let option = document.createElement("option");
        console.log(uni.institution);
        option.text = uni.institution;
        console.log(option.text);
        option.value = uni.institution;
        schoolSelect.appendChild(option);
      })
    });
}

/** Gets career field names from json file and populates options for career */
function populateCareers() {
  const careerSelect = document.getElementById("career");
  fetch("careers.json")
    .then(response => response.json())
    .then(careers => {
      careers.forEach((career) => {
        let option = document.createElement("option");
        option.text = career.name;
        option.value = career.name;
        careerSelect.appendChild(option);
      })
    });
}
