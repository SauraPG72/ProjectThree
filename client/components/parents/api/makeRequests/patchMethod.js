import { renderPage } from "../../../../index.js";

export function sendPatchRequest(url, jsonForm) {
  axios
    .patch(url, jsonForm)
    .then(() => {
      renderPage();
    })
    .catch((err) => {
      console.log(err);
      errorMessage.textContent = "There was a server error. Please try again.";
      errorMessage.style.display = "block";
    });
}
