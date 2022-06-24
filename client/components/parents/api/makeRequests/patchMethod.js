import { renderPage } from "../../../../index.js";

export function sendPatchRequest(url, jsonForm) {
  const errorMessage = document.getElementById("error-message");
  axios
    .patch(url, jsonForm)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      errorMessage.textContent = "There was a server error. Please try again.";
      errorMessage.style.display = "block";
    });
  renderPage();
}
