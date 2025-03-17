const userData = JSON.parse(localStorage.getItem("user"));
if (userData) {
  window.location.href = "/pages/profile.html";
}



function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorText = document.getElementById("error");
  errorText.style.display = "none"
  axios
    .post(`http://localhost:4200/user/login`, {
      username: username,
      password: password,
    })
    .then((response) => {
      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      console.log(user);
      console.log(token);
      profilePage()
    })
    .catch((error) => {
      const resError = error.response.data;
      errorText.style.display = "inline"
      if (resError) {
        console.log(resError);
        // Serverdan kelgan xatolik
        if (resError.status === 404) {
          errorText.innerText = resError.message;
        } else {
          errorText.innerText = resError.message;
        }
      } else {
        // Server umuman javob bermasa yoki boshqa xato kelsa
        errorText.innerText = resError.message;
      }
    });
}
function profilePage() {
    window.location.href = 'pages/profile.html'
}

function showModeFunction() {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark-mode")
    }
}

showModeFunction()