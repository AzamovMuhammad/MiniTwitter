function sign() {
  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const customFile = document.getElementById("customFile");
  const errorText = document.getElementById("error");
  const succesText = document.getElementById("succes");
  const file = customFile.files[0];

  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("username", username);
  formData.append("profilepath", file);
  formData.append("password", password);

  axios
    .post(`https://minitwitter-kk42.onrender.com/user/sign`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      succesText.style.display = "inline";
      succesText.innerText =
        "You created your personal akkaount. Please go back to Login page.";
    })
    .catch((error) => {
      errorText.style.display = "inline";
      if (!fullname || !username || !password || !customFile) {
        errorText.innerText = "Please fill out all fields!";
      } else {
        errorText.innerText = "Unknown error, please try again later!";
      }
    });
}

document.getElementById("customFile").addEventListener("change", function () {
  let fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
  document.querySelector(".file-name").textContent = fileName;
});

function showModeFunction() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark-mode");
  }
}

showModeFunction();
