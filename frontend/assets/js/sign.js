function sign() {
  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const customFile = document.getElementById("customFile");
  const file = customFile.files[0];

  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("username", username);
  formData.append("profilepath", file);
  formData.append("password", password);

  axios
    .post(`http://localhost:4200/user/sign`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      alert("you signed up");
    });
}

document.getElementById("customFile").addEventListener("change", function () {
  let fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
  document.querySelector(".file-name").textContent = fileName;
});
