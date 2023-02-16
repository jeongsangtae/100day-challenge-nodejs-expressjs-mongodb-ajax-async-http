const loadCommentsBtn = document.getElementById("load-comments-btn");

async function fetchCommentsForPost() {
  const postId = loadCommentsBtn.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  console.log(responseData);
}

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
