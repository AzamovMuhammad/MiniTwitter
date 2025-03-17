const userData = JSON.parse(localStorage.getItem("user"));
const profile = document.querySelector(".profile");
const more = document.querySelector(".more");
const userImg = document.querySelector("#userImg");

function showUser() {
  if (userData && userData.profilepath) {
    // Xatolikni oldini olish uchun tekshirish
    const imgUrl = `http://localhost:4200/` + userData.profilepath;
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
}
function switchMode() {
  const darkMode = document.documentElement.classList.toggle("dark-mode");

  if (darkMode) {
    localStorage.setItem("theme", "dark");
    console.log("dark mode switched");
  } else {
    localStorage.setItem("theme", "light");
    console.log("light mode switched");
  }

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark-mode");
  }
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
}
function morePart() {
  more.style.display = "flex";
}

// Dark and Light modega o'tkazish

switchMode();
showUser();
