import { renderPage } from "../../../../index.js";

export function sendDeleteRequest(url) {
  const errorMessage = document.getElementById("error-message");
  axios
    .delete(url)
    .then(() => {
      renderPage();
    })
    .catch((err) => {
      console.log(err);
      errorMessage.textContent = "There was a server error. Please try again.";
      errorMessage.style.display = "block";
    });
}
