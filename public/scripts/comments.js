const loadCommentsBtn = document.getElementById("load-comments-btn");
const commentsSection = document.getElementById("comments");

function createCommentList(comments) {
  const commentsList = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
      <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
  `;
    commentsList.appendChild(commentElement);
  }

  return commentsList;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtn.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  const commentsList = createCommentList(responseData);
  commentsSection.innerHTML = "";
  commentsSection.appendChild(commentsList);
}

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
