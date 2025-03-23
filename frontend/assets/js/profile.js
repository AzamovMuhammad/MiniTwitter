const userData = JSON.parse(localStorage.getItem("user"));
const profile = document.querySelector(".profile");
const homePartDiv = document.querySelector(".homePart");
const pageTitle = document.querySelector(".pageTitle");
const userImg = document.querySelector("#userImg");

// sections parts
const more = document.querySelector(".more");
const addPostDiv = document.querySelector(".addPost");
const userPosts = document.querySelector(".userPosts");
const allUserPosts = document.querySelector(".allUserPosts");

function showUser() {
  const inputDivImg = document.querySelector(".inputDivImg");
  if (userData && userData.profilepath) {
    // Xatolikni oldini olish uchun tekshirish
    const imgUrl = `http://localhost:4200/` + userData.profilepath;
    inputDivImg.src = imgUrl;
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
  getUserPosts();
  getAllUsersPost();
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
  more.style.display = 'none'
  addPostDiv.style.display = 'flex'
  userPosts.style.display = 'block'
  allUserPosts.style.display = 'none'
  pageTitle.innerHTML = 'Home'
  noMessage.style.display="flex"
  commentSections.style.display="none"
}
function morePart() {
  more.style.display = 'flex'
  addPostDiv.style.display = 'none'
  userPosts.style.display = 'none'
  allUserPosts.style.display = 'none'
  pageTitle.innerHTML = 'More'
  noMessage.style.display="flex"
  commentSections.style.display="none"
}
function explorePart() {
  more.style.display = 'none'
  addPostDiv.style.display = 'none'
  userPosts.style.display = 'none'
  allUserPosts.style.display = 'flex'
  pageTitle.innerHTML = 'Explore'

}

document.getElementById("customFile").addEventListener("change", function () {
  let fileColor = this.files.length > 0 ? "grey" : "none";
  document.querySelector(".fa-image").style.background = `${fileColor}`;
});

// Post send part js code
function addPost() {
  const userId = userData.id;
  const postText = document.getElementById("postText").value;
  const customFile = document.getElementById("customFile");
  const file = customFile.files[0];

  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("postText", postText);
  formData.append("postFilePath", file);

  if (postText) {
    axios
      .post(`http://localhost:4200/post/addPost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getUserPosts();
        alert("success");
      });
  } else {
    alert("text yozish shart");
  }
}

// poste get js code
function getUserPosts() {
  axios
    .post(`http://localhost:4200/post/getPosts`, {
      user_id: userData.id,
    })
    .then((res) => {
      const allPosts = res.data;
      console.log(allPosts);
      userPosts.innerHTML = "";
      allPosts.map((post) => {
        const newDate = new Date(post.date);
        const formatdate = newDate.toISOString().slice(0, 16).replace("T", " ");

        userPosts.innerHTML += `
      <div class="userPostCard">
        <img src="${"http://localhost:4200/" + post.postfilepath}" alt="">
        <h2>${post.posttext}</h3>
        <p>${formatdate}</p>
      </div>
      `;
      });
    });
}

function getAllUsersPost() {
  axios.get("http://localhost:4200/post/allPosts").then((res) => {
    const allPosts = res.data;
    console.log(allPosts);
    allUserPosts.innerHTML = "";
    allPosts.map((post) => {
      const newDate = new Date(post.date);
      const formatdate = newDate.toISOString().slice(0, 16).replace("T", " ");

      allUserPosts.innerHTML += `
      <div class="userPostCard">
        <div class="allUsersProfile">
          <img src="${"http://localhost:4200/" + post.profilepath}"/>
          <h1>${post.fullname}</>
        </div>
        <img src="${"http://localhost:4200/" + post.postfilepath}" alt="">
        <h2>${post.posttext}</h2>
        <div class="postInfo">        
          <div class="likeDiv">
            <div id="likeDiv">
              <i onclick="clickLikeButton(${post.id})" id="like_${post.id}" class="fa-solid fa-heart"></i>
              <span id="likeSpan_${post.id}" class='likeSpan'>0</span>
            </div>
            <i class="fa-solid fa-comment" onclick="commentOpen()"></i>
          </div>
          <p>${formatdate}</p>
        </div>
      </div>
      `;
    });

    allPosts.map((aPost) => {
      getLikeCount(aPost.id)
    })
  });
}

const commentSections = document.querySelector('.commentSections')
const noMessage = document.querySelector('.noMessage')
const senderPhoto = document.querySelector('.senderImg')

function commentOpen() {
  noMessage.style.display="none"
  commentSections.style.display="flex"  
  senderImg()
}

function senderImg() {
  senderPhoto.src = `${"http://localhost:4200/" + userData.profilepath}`
}

async function getLikeCount(postID) {
  try {
    const response = await axios.post(
      "http://localhost:4200/like/likesC",
      {
        images_id: postID,
      }
    );
    const likeCount = response.data.like_count || 0;

    const likeSpan = document.getElementById(`likeSpan_${postID}`);
    if (likeSpan) {
      likeSpan.innerHTML = likeCount;
    }
  } catch (error) {
    console.error("Error fetching like count:", error);
  }
}

function clickLikeButton(postID) {
  const likeIcon = document.getElementById(`like_${postID}`);
  if (!likeIcon) return;

  // Rangni darhol o‘zgartirish (yaxshi UX uchun)
  likeIcon.style.color = likeIcon.style.color === "red" ? "var(--textColor)" : "red";

  axios
    .post(
      "http://localhost:4200/like/likes",
      {
        user_id: userData.id,
        images_id: postID,
      }
    )
    .then((res) => {
      console.log("Like response:", res.data);
      const boolLike = res.data.liked;
      likeIcon.style.color = boolLike ? "red" : "var(--textColor)";
      getLikeCount(postID); // Like sonini yangilash
    })
    .catch((error) => {
      console.error("Error liking image:", error);
    });
}
showUser();
