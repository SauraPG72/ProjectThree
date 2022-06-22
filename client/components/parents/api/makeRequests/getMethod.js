import { renderPage } from "../../../../index.js";

export function sendGetRequest(url) {
  const errorMessage = document.getElementById("error-message");
  axios
    .get(url, jsonForm)
    .then(() => {
      renderPage();
    })
    .catch((err) => {
      console.log(err);
      errorMessage.textContent = "There was a server error. Please try again.";
      errorMessage.style.display = "block";
    });
}
