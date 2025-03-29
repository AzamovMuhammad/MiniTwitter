const userData = JSON.parse(localStorage.getItem("user"));
const profile = document.querySelector(".profile");
const homePartDiv = document.querySelector(".homePart");
const pageTitle = document.querySelector(".pageTitle");
const userImg = document.querySelector("#userImg");
const commentSections = document.querySelector(".commentSections");
const noMessage = document.querySelector(".noMessage");
const senderPhoto = document.querySelector(".senderImg");
const secMid = document.querySelector(".secMid");
const secTop = document.querySelector(".secTop");
const userFavPostDiv = document.querySelector(".userFavPostDiv");

// sections parts
const more = document.querySelector(".more");
const addPostDiv = document.querySelector(".addPost");
const userPosts = document.querySelector(".userPosts");
const allUserPosts = document.querySelector(".allUserPosts");

function showUser() {
  const inputDivImg = document.querySelector(".inputDivImg");
  if (userData && userData.profilepath) {
    // Xatolikni oldini olish uchun tekshirish
    const imgUrl =
      `https://minitwitter-kk42.onrender.com/` + userData.profilepath;
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
  addPostDiv.style.display = "flex";
  userPosts.style.display = "block";
  allUserPosts.style.display = "none";
  userFavPostDiv.style.display = "none";
  pageTitle.innerHTML = "Home";
  noMessage.style.display = "flex";
  commentSections.style.display = "none";
}

function morePart() {
  more.style.display = "flex";
  addPostDiv.style.display = "none";
  userPosts.style.display = "none";
  allUserPosts.style.display = "none";
  userFavPostDiv.style.display = "none";
  pageTitle.innerHTML = "More";
  noMessage.style.display = "flex";
  commentSections.style.display = "none";
}

function explorePart() {
  more.style.display = "none";
  addPostDiv.style.display = "none";
  userPosts.style.display = "none";
  userFavPostDiv.style.display = "none";
  allUserPosts.style.display = "flex";
  pageTitle.innerHTML = "Explore";
  getAllUsersPost();
}

function bookmarksPart() {
  more.style.display = "none";
  addPostDiv.style.display = "none";
  userPosts.style.display = "none";
  allUserPosts.style.display = "none";
  userFavPostDiv.style.display = "flex";
  pageTitle.innerHTML = "Bookmarks";
  showUserFavPosts();
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
      .post(`https://minitwitter-kk42.onrender.com/post/addPost`, formData, {
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
    .post(`https://minitwitter-kk42.onrender.com/post/getPosts`, {
      user_id: userData.id,
    })
    .then((res) => {
      const allPosts = res.data;
      userPosts.innerHTML = "";
      allPosts.map((post) => {
        const newDate = new Date(post.date);
        const formatdate = newDate.toISOString().slice(0, 16).replace("T", " ");

        userPosts.innerHTML += `
      <div class="userPostCard">
        <img src="${
          "https://minitwitter-kk42.onrender.com/" + post.postfilepath
        }" alt="">
        <h2>${post.posttext}</h3>
        <p>${formatdate}</p>
      </div>
      `;
      });
    });
}

function getAllUsersPost() {
  axios
    .get("https://minitwitter-kk42.onrender.com/post/allPosts")
    .then((res) => {
      const allPosts = res.data;
      allUserPosts.innerHTML = "";

      allPosts.map((post) => {
        const newDate = new Date(post.date);
        const formatdate = newDate.toISOString().slice(0, 16).replace("T", " ");

        allUserPosts.innerHTML += `
      <div class="userPostCard">
        <div class="allUsersProfile">
          <img src="${
            "https://minitwitter-kk42.onrender.com/" + post.profilepath
          }"/>
          <h1>${post.fullname}</h1>
        </div>
        <img src="${
          "https://minitwitter-kk42.onrender.com/" + post.postfilepath
        }" alt="">
        <h2>${post.posttext}</h2>
        <div class="postInfo">        
          <div class="likeDiv">
            <div id="likeDiv">
              <i onclick="clickLikeButton(${post.id})" id="like_${
          post.id
        }" class="fa-solid fa-heart"></i>
              <span id="likeSpan_${post.id}" class='likeSpan'>0</span>
            </div>
            <i class="fa-solid fa-comment" onclick='commentOpen(${JSON.stringify(
              post
            )})'></i>
          </div>
          <p>${formatdate}</p>
        </div>
      </div>
      `;
      });

      allPosts.map((aPost) => {
        getLikeCount(aPost.id);
        loadPostLikeStatus(aPost.id);
      });
    });
}

function commentOpen(post) {
  commentsOwner(post);
  noMessage.style.display = "none";
  commentSections.style.display = "flex";
  sessionStorage.setItem("postId", JSON.stringify(post.id));
  getUserComments();
  senderImg();
}

function senderImg() {
  senderPhoto.src = `${
    "https://minitwitter-kk42.onrender.com/" + userData.profilepath
  }`;
}

function addComment() {
  const postId = JSON.parse(sessionStorage.getItem("postId"));
  const senderInput = document.querySelector(".senderInput").value;
  const commentData = {
    user_id: userData.id,
    comment: senderInput,
    post_id: postId,
  };

  axios
    .post(
      "https://minitwitter-kk42.onrender.com/comment/commentPost",
      commentData
    )
    .then((res) => {
      alert("Success");
      getUserComments();
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function getUserComments() {
  const postId = JSON.parse(sessionStorage.getItem("postId"));
  axios
    .post("https://minitwitter-kk42.onrender.com/comment/getComment", {
      post_id: postId,
    })
    .then((res) => {
      secMid.innerHTML = " ";
      const commentData = res.data;
      commentData.map((data) => {
        secMid.innerHTML += `
        <div class="secMidCard">
          <div class="secMidCardImg">
            <img src="${
              "https://minitwitter-kk42.onrender.com/" + data.profilepath
            }" alt="rasm" />
            <div class="secMidText">
              <h3>@${data.username}</h3>
              <p>
              ${data.comment}</p>
            </div>
          </div>
          <div id="commentLikeDiv">
            <i onclick="clickLikeCommentButton(${data.id})" id="likeComment_${
          data.id
        }" class="fa-solid fa-heart"></i>
            <span id="likeCommentSpann_${data.id}" class='likeSpan'>0</span>
          </div>
        </div>
        `;
      });
      commentData.map((aCommentLike) => {
        getLikeCommentCount(aCommentLike.id);
        loadCommentLikeStatus(aCommentLike.id);
      });
    })
    .catch((err) => {
      console.error("Kommentlarni olishda xatolik:", err);
    });
}

function commentsOwner(post) {
  const fixedImgPath = post.profilepath.replace(/[|\\]/g, "/");
  const imgUrl = `https://minitwitter-kk42.onrender.com/${fixedImgPath}`;
  secTop.innerHTML = `
    <img class="secTopImg" src="${imgUrl}" alt="rasm" />
    <div class="secTopText">
      <h3>@${post.username}</h3>
      <p>${post.posttext}</p>
    </div>
  `;
}

async function getLikeCount(postID) {
  try {
    const response = await axios.post(
      "https://minitwitter-kk42.onrender.com/like/likesC",
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
  axios
    .post("https://minitwitter-kk42.onrender.com/like/likes", {
      user_id: userData.id,
      images_id: postID,
    })
    .then((res) => {
      console.log("Like response:", res.data);
      const boolLike = res.data.liked;
      likeIcon.style.color = boolLike ? "red" : "var(--textColor)";
      getLikeCount(postID);
    })
    .catch((error) => {
      console.error("Error liking image:", error);
    });
}

function loadPostLikeStatus(post_id) {
  axios
    .get(`https://minitwitter-kk42.onrender.com/like/status/${post_id}`, {
      params: { user_id: userData.id },
    })
    .then((res) => {
      const likeIcon = document.getElementById(`like_${post_id}`);
      if (likeIcon) {
        likeIcon.style.color = res.data.liked ? "red" : "var(--textColor)";
      }
    })
    .catch((error) => {
      console.error("Error fetching like status:", error);
    });
}

function getLikeCommentCount(comment_id) {
  axios
    .post(
      "https://minitwitter-kk42.onrender.com/commmentLike/likeCountComment",
      {
        comment_id: comment_id,
      }
    )
    .then((res) => {
      const likeCount = res.data.like_count || 0;
      const likeSpan = document.getElementById(
        `likeCommentSpann_${comment_id}`
      );
      if (likeSpan) {
        likeSpan.innerHTML = likeCount;
      } else {
        console.log(`like spanga ulanib bo'lmadi.`);
      }
    });
}

function clickLikeCommentButton(comment_id) {
  const likeIcon = document.getElementById(`likeComment_${comment_id}`);
  axios
    .post("https://minitwitter-kk42.onrender.com/commmentLike/likecomment", {
      user_id: userData.id,
      comment_id: comment_id,
    })
    .then((res) => {
      console.log("Like response:", res.data);
      const boolLike = res.data.liked;
      likeIcon.style.color = boolLike ? "red" : "var(--textColor)";
      getLikeCommentCount(comment_id);
    })
    .catch((error) => {
      console.error("Error liking image:", error);
    });
}

function loadCommentLikeStatus(comment_id) {
  axios
    .get(
      `https://minitwitter-kk42.onrender.com/commmentLike/status/${comment_id}`,
      {
        params: { user_id: userData.id },
      }
    )
    .then((res) => {
      const likeIcon = document.getElementById(`likeComment_${comment_id}`);
      if (likeIcon) {
        likeIcon.style.color = res.data.liked ? "red" : "var(--textColor)";
      }
    })
    .catch((error) => {
      console.error("Error fetching like status:", error);
    });
}

function showUserFavPosts() {
  axios
    .post("https://minitwitter-kk42.onrender.com/favourite/userFav", {
      user_id: userData.id,
    })
    .then((res) => {
      const favData = res.data;
      userFavPostDiv.innerHTML = "";
      favData.map((fav) => {
        userFavPostDiv.innerHTML += `
        <div class="userPostCard">
          <div class="allUsersProfile">
            <img src="${
              "https://minitwitter-kk42.onrender.com/" + fav.profilepath
            }"/>
            <h3>${fav.fullname}</h3>
          </div>
          <img src="${fav.url}" alt="">
          <h4>${fav.posttext}</h2>
          <div class="postInfo">        
            <div class="likeDiv">
              <div id="likeDiv">
                <i style="color: red;" onclick="clickLikeFavButton(${
                  fav.post_id
                })" id="like_${
          fav.post_id
        }" class="fa-solid fa-heart" style></i>
                <span id="likeFavSpan_${fav.post_id}" class='likeSpan'>0</span>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      favData.map((aPost) => {
        console.log(aPost.url);
        getLikeFavCount(aPost.post_id);
      });
    });
}

async function getLikeFavCount(postID) {
  try {
    const response = await axios.post(
      "https://minitwitter-kk42.onrender.com/like/likesC",
      {
        images_id: postID,
      }
    );
    const likeCount = response.data.like_count;
    const likeSpan = document.getElementById(`likeFavSpan_${postID}`);
    if (likeSpan) {
      likeSpan.innerText = `${likeCount}`;
    }
  } catch (error) {
    console.error("Error fetching like count:", error);
  }
}

function clickLikeFavButton(postID) {
  const likeIcon = document.getElementById(`like_${postID}`);
  axios
    .post("https://minitwitter-kk42.onrender.com/like/likes", {
      user_id: userData.id,
      images_id: postID,
    })
    .then((res) => {
      getLikeFavCount(postID);
      showUserFavPosts();
    })
    .catch((error) => {
      console.error("Like bosishda xatolik:", error);
    });
}

showUser();
