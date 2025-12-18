import { postData } from "./data.js";
const postInput = document.getElementById("post-input");

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.repost) {
    handleRepostClick(e.target.dataset.repost);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "post-btn") {
    handlePostBtnClick();
  }
});

function handleLikeClick(postId) {
  const targetPostObj = postData.filter(function (post) {
    return post.uuid === postId;
  })[0];

  if (targetPostObj.isLiked) {
    targetPostObj.likes--;
  } else {
    targetPostObj.likes++;
  }
  targetPostObj.isLiked = !targetPostObj.isLiked;
  render();
}

function handleRepostClick(postId) {
  const targetRepostObj = postData.filter(function (post) {
    return post.uuid === postId;
  })[0];

  if (targetRepostObj.isReposted) {
    targetRepostObj.repost--;
  } else {
    targetRepostObj.repost++;
  }
  targetRepostObj.isReposted = !targetRepostObj.isReposted;
  render();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handlePostBtnClick() {
  console.log(postInput.value);
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

    let repliesHtml = "";

    if (post.replies.length > 0) {
      post.replies.forEach(function (reply) {
        repliesHtml += `
        <div class="post-reply">
          <div class="post-inner">
           <img src="${reply.profilePic}" class="profile-pic">
            <div>
             <p class="handle">${reply.handle}</p>
              <p class="post-text">${reply.postText}</p>
           </div>
          </div>
        </div>
        `;
      });
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
              <i class="fa-solid fa-retweet ${repostIconClass}"
              data-repost="${post.uuid}"
              ></i>
              ${post.repost}
              </span>
            </div>
            </div>
        </div>
          <div class="hidden" id="replies-${post.uuid}">
            ${repliesHtml}
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
