import { postData } from "./data.js";
const postInput = document.getElementById("post-input");
const postBtn = document.getElementById("post-btn");

postBtn.addEventListener("click", function () {
  console.log(postInput.value);
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.repost) {
    handleRepostClick(e.target.dataset.repost);
  }
});

function handleLikeClick(postId) {
  const targetPostObj = postData.filter(function (post) {
    return post.uuid === postId;
  })[0];

  if (targetPostObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetPostObj.likes++;
  }
  targetPostObj.isLiked = !targetPostObj.isLiked;
  render();
}

function handleRepostClick(postId) {
  const targetRepostObj = postData.filter(function (post) {
    return tweet.uuid === postId;
  })[0];

  if (targetRepostObj.isReposted) {
    targetRepostObj.repost--;
  } else {
    targetRepostObj.repost++;
  }
  targetRepostObj.isReposted = !targetRepostObj.isReposted;
  render();
}

function getFeedHtml() {
  let feedHtml = ``;

  postData.forEach(function (post) {
    let likeIconClass = "";

    if (post.isLiked) {
      likeIconClass = "liked";
    }

    let repostIconClass = "";

    if (post.isReposted) {
      repostIconClass = "reposted";
    }

    feedHtml += `
    <div class="post">
        <div class="post-inner">
          <img src="${post.profilePic}" class="profile-pic">
          <div>
          <p class="handle">${post.handle}</p>
          <p class="post-text">${post.postText}</p>
          <div class="post-details">
            <span class="post-detail">
              <i class="fa-regular fa-comment-dots"
              data-reply="${post.uuid}"
              ></i>
              ${post.replies.length}
              </span>
              <span class="post-detail">
              <i class="fa-solid fa-heart ${likeIconClass}"
              data-like="${post.uuid}"
              ></i>
              ${post.likes}
              </span>
              <span class="post-detail">
              <i class="fa-solid fa-repost ${repostIconClass}"
              data-repost="${post.uuid}"
              ></i>
              ${post.repost}
              </span>
            </div>
            </div>
        </div>
        </div>    
    `;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
render();
