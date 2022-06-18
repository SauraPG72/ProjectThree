import { renderParentsPage } from "../parentsPage.js";

// appvoroOrReject : String
// if approve, send a request to delete the targeted task
export function postApproveReject(form, appvoroOrReject) {
  const taskId = form.task_id.value;
  const errorMessage = document.getElementById("error-message");

  if (appvoroOrReject === "approve") {
    // send a delete request to the server
    axios
      .patch(`/api/parents/task/${taskId}`)
      .then((res) => {
        renderParentsPage();
      })
      .catch((err) => {
        console.log(err);
        errorMessage.textContent =
          "There was a server error. Please try again.";
        errorMessage.style.display = "block";
      });
  } else {
    console.log("reject confirmed");
  }
}
