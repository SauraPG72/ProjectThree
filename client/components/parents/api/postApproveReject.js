import { renderPage } from "../../../index.js";

// appvoroOrReject : String
// requestType = "completed"/ "pendingTasks"/ "goals"
// completed : approve completed task and redeem it
// pendingTasks : approve a task request and change its status from 'pending' to 'approved'
// if approve, send a request to delete the targeted task
export function postApproveReject(form, appvoroOrReject, data, requestType) {
  const taskId = form.task_id.value;
  const jsonData = data;
  const errorMessage = document.getElementById("error-message");

  // if the form is about approving/ rejecting COMPLETED TASKS =========================================
  if (requestType === "completed") {
    if (appvoroOrReject === "approve") {
      // send a request to the server to change the status of the task "completed"
      axios
        .patch(`/api/parents/taskcomplete/${taskId}`, jsonData)
        .then(() => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    } else if (appvoroOrReject === "reject") {
      console.log("reject confirmed");
    }
    // if the form is about approving/ rejecting REQUESTED TASKS =========================================
  } else if (requestType === "pendingTasks") {
    if (appvoroOrReject === "approve") {
      // send a request to the server to change the status of the task "approved"
      axios
        .patch(`/api/parents/pendingTasks/${taskId}`, jsonData)
        .then(() => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    } else if (appvoroOrReject === "reject") {
      // send a request to the server to delete the task
      axios
        .delete(`/api/parents/pendingTasks/${taskId}`, jsonData)
        .then(() => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    }
    // if the form is about approving/ rejecting REQUESTED GOALS with points =========================================
  } else if (requestType === "goals") {
    console.log(requestType);
    if (appvoroOrReject === "approve") {
      // send a request to the server to change the status of the goal "approved"
      axios
        .patch(`/api/parents/pendingGoals/${taskId}`, jsonData)
        .then(() => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    } else if (appvoroOrReject === "reject") {
      // send a request to the server to delete the goal
      axios
        .delete(`/api/parents/pendingGoals/${taskId}`, jsonData)
        .then(() => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    }
  }
}
