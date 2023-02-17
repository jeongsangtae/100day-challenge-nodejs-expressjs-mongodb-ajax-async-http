const loadCommentsBtn = document.getElementById("load-comments-btn");
const commentsSection = document.getElementById("comments");
const commentsForm = document.querySelector("#comments-form form");
const commentTitle = document.getElementById("title");
const commentText = document.getElementById("text");

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
  try {
    // get 요청 관련 fetch
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert("Fetching comments failed!");
      return;
    }
    const responseData = await response.json();

    if (responseData && responseData.length > 0) {
      const commentsList = createCommentList(responseData);
      commentsSection.innerHTML = "";
      commentsSection.appendChild(commentsList);
    } else {
      commentsSection.firstElementChild.innerHTML =
        "We could not find any comments. May be add one?";
    }
  } catch (error) {
    alert("Getting comments failed!");
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsForm.dataset.postid;

  const enteredTitle = commentTitle.value;
  const enteredText = commentText.value;

  const comment = { title: enteredTitle, text: enteredText };

  try {
    // post 요청 관련 fetch는 두 번째 매개변수 추가
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      fetchCommentsForPost();
    } else {
      alert("Could not send comment!");
    }
  } catch (error) {
    alert("Could net send request - maybe try again later!");
  }
}

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
commentsForm.addEventListener("submit", saveComment);
