const userData = JSON.parse(localStorage.getItem("user"));
const profile = document.querySelector(".profile");
const more = document.querySelector(".more");
const userImg = document.querySelector("#userImg");
const userPosts = document.querySelector('.userPosts')

function showUser() {
  const inputDivImg = document.querySelector(".inputDivImg");
  if (userData && userData.profilepath) {
    // Xatolikni oldini olish uchun tekshirish
    const imgUrl = `http://localhost:4200/` + userData.profilepath;
    inputDivImg.src = imgUrl
    profile.innerHTML += `
            <img id="userImg" src="${imgUrl}" alt="rasm">
            <div class="nameUser">
                <h4>${userData.fullname}</h4>
                <h5>@${userData.username}</h5>
            </div>
        `;
       
  } else {
    console.error("User data yoki profilepath mavjud emas!");
  }
  switchMode();
  getUserPosts()
}
document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  console.log(theme);
  document.documentElement.classList.toggle("dark-mode", theme === "dark");
});
function switchMode() {
  const isDarkMode = document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

if (!userData) {
  logOut();
}
function logOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}
function homePart() {
  more.style.display = "none";
  userPosts.style.display = "flex";

}
function morePart() {
  more.style.display = "flex";
  userPosts.style.display = "none";

}
document.getElementById("customFile").addEventListener("change", function () {
  let fileColor = this.files.length > 0 ? "grey" : "none";
  document.querySelector(".fa-image").style.background = `${fileColor}`;
});


// Post send part js code
function addPost() {
  const userId = userData.id
  const postText = document.getElementById('postText').value;
  const customFile = document.getElementById("customFile");
  const file = customFile.files[0];

  const formData = new FormData();
  formData.append("user_id", userId)
  formData.append("postText", postText)
  formData.append("postFilePath", file)

  axios.post(`http://localhost:4200/post/addPost`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    getUserPosts()
    alert("success")  
  })
}

// poste get js code 
function getUserPosts() {
  axios.post(`http://localhost:4200/post/getPosts`, {
    user_id: userData.id
  })
  .then((res) => {
    const allPosts = res.data
    userPosts.innerHTML = ''
    allPosts.map((post) => {
      userPosts.innerHTML += `
      <div class="userPostCard">
        <img src="${"http://localhost:4200/" + post.postfilepath}" alt="">
        <h2>${post.posttext}</h3>
        <p>${post.date}</p>
      </div>
      `
    })    
  })
}

showUser();
