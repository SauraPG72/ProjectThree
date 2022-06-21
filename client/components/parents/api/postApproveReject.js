import { sendDeleteRequest } from "./makeRequests/deleteMethod.js";
import { sendPatchRequest } from "./makeRequests/patchMethod.js";
import { sendGetRequest } from "./makeRequests/getMethod.js";

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
      sendPatchRequest(`/api/parents/taskcomplete/${taskId}`, jsonData);
    } else if (appvoroOrReject === "reject") {
      // send a request to the server to change the status of the task "rejected"
      sendGetRequest(`/api/parents/rejectcompletedtask/${taskId}`);
    }
    // if the form is about approving/ rejecting REQUESTED TASKS =========================================
  } else if (requestType === "pendingTasks") {
    if (appvoroOrReject === "approve") {
      // send a request to the server to change the status of the task "approved"
      sendPatchRequest(`/api/parents/pendingTasks/${taskId}`, jsonData);
    } else if (appvoroOrReject === "reject") {
      // send a request to the server to delete the task
      sendDeleteRequest(`/api/parents/pendingTasks/${taskId}`, jsonData);
    }
    // if the form is about approving/ rejecting REQUESTED GOALS with points =========================================
  } else if (requestType === "goals") {
    if (appvoroOrReject === "approve") {
      // send a request to the server to change the status of the goal "approved"
      sendPatchRequest(`/api/parents/pendingGoals/${taskId}`, jsonData);
    } else if (appvoroOrReject === "reject") {
      // send a request to the server to delete the goal
      sendDeleteRequest(`/api/parents/pendingGoals/${taskId}`, jsonData);
    }
  }
}
