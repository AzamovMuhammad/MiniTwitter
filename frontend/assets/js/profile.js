const userData = JSON.parse(localStorage.getItem("user"));
const profile = document.querySelector(".profile");
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
showUser();
