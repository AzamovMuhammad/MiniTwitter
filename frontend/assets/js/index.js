
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  axios.post(`http://localhost:4200/user/login`, {
    username: username,
    password: password
  }).then((response) => {
    const user = response.data.user;
    const token = response.data.token;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    console.log(user);
    console.log(token);
  })
}

