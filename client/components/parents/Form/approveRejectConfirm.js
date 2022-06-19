import { createAnElement } from "../../../utils/elementCreator.js";
import { postApproveReject } from "../api/postApproveReject.js";

// This function is to create a form for approving/ rejecting a request from kids
// next => postApproveReject (api to send request to the server)
// rewardType = "cents"/ "points"
// requestType = "completed"/ "pending"
// completed : approve completed task and redeem it
// pending : approve a task request and change status from 'pending' to 'approved'
export function approverejectConfirm(status, task, rewardType, requestType) {
  app.innerHTML = "";

  console.log(requestType);
  let taskInfoArr = task.task_description.split(":"); // [task description, task reward]
  let data;
  if (rewardType === "cents") {
    data = {
      description: taskInfoArr[0],
      cents: parseFloat(taskInfoArr[1]),
    };
  } else {
    data = {
      description: taskInfoArr[0],
      points: parseFloat(taskInfoArr[1]),
    };
  }

  console.log(data);

  // ==================== common items for both approval/rejection ========================

  // create a form and input tags in it
  const form = createAnElement("form", {
    className: "form",
    type: "submit",
  });

  // description of the task
  let description;
  // if rewardType is 'cents', the form shows 'Task Name for $ XX'
  // if rewardType is 'points', the form shows 'Task Name for XX points'
  if (rewardType == "cents") {
    description = createAnElement("h1", {
      textContent: `${taskInfoArr[0]} for $ ${taskInfoArr[1] / 100}`,
    });
  } else {
    description = createAnElement("h1", {
      textContent: `${taskInfoArr[0]} for ${taskInfoArr[1]} pts`,
    });
  }

  // task id (hidden input tag)
  const taskIdHiddenInput = createAnElement("input", {
    name: "task_id",
    value: Number(task.task_id),
    type: "hidden",
  });
  form.appendChild(taskIdHiddenInput);

  const errorMessage = createAnElement("p", {
    id: "error-message",
    type: "hidden",
  });

  // ======================================================================

  // if status is 'approve', send a request to delete the targeted task when the submit button is pressed
  if (status === "approve") {
    const confirmation = createAnElement("p", {
      className: "approve-reject-confirmation",
      textContent: "Are you sure you want to approve",
    });

    form.appendChild(confirmation);
    form.appendChild(description);

    // submit button
    const button = createAnElement("button", {
      className: "formBtn",
      textContent: "Confirm",
    });
    form.appendChild(button);

    form.appendChild(errorMessage);

    // wrap everything in a wrapper and render it
    const formWrapper = createAnElement(
      "div",
      {
        className: "formWrapper confirmationFormWrapper",
      },
      [form]
    );

    app.appendChild(formWrapper);

    // ============= event listeners =============
    // for approval
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      postApproveReject(form, "approve", data, requestType);
    });
  } else {
    const confirmation = createAnElement("p", {
      className: "approve-reject-confirmation",
      textContent: "Are you sure you want to reject",
    });

    form.appendChild(confirmation);
    form.appendChild(description);

    // submit button
    const button = createAnElement("button", {
      className: "formBtn",
      textContent: "Confirm",
    });
    form.appendChild(button);

    // wrap everything in a wrapper and render it
    const formWrapper = createAnElement(
      "div",
      {
        className: "formWrapper confirmationFormWrapper",
      },
      [form]
    );

    app.appendChild(formWrapper);

    // ============= event listeners =============
    // for rejection
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      postApproveReject(form, "reject", requestType);
    });
  }
}
