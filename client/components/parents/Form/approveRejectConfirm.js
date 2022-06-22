import { createAnElement } from "../../../utils/elementCreator.js";
import { postApproveReject } from "../api/postApproveReject.js";

// This function is to create a form for approving/ rejecting a request from kids
// next => postApproveReject (api to send request to the server)
// rewardType = "cents"/ "points"
// requestType = "completed"/ "pending"/ "goals"
// completed : approve completed task and redeem it
// pendingTasks : approve a task request and change its status from 'pending' to 'approved'
export function approverejectConfirm(status, task, rewardType, requestType) {
  app.innerHTML = "";

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

  // submit button
  const button = createAnElement("button", {
    className: "formBtn",
    textContent: "Confirm",
  });

  const returnButton = createAnElement("button", {
    className: "formBtn",
    textContent: "Back To Home",
  });

  const buttonsWrapper = createAnElement(
    "div",
    {
      className: "formButtonsWrapper",
    },
    [button, returnButton]
  );

  returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/";
  });

  // ======================================================================

  // if status is 'approve', send a request to change the status of the targeted task
  // from 'pending' to 'approved'
  //when the submit button is pressed
  if (status === "approve") {
    const confirmation = createAnElement("p", {
      className: "approve-reject-confirmation",
      textContent: "Are you sure you want to approve",
    });

    form.appendChild(confirmation);
    form.appendChild(description);
    form.appendChild(buttonsWrapper);
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
    button.addEventListener("click", (e) => {
      e.preventDefault();
      postApproveReject(form, "approve", data, requestType);
    });
    returnButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/";
    });
    // if status is 'reject', send a request to change the status of the targeted task
    // from 'pending' to 'approved'
    //when the submit button is pressed
  } else if (status === "reject") {
    const confirmation = createAnElement("p", {
      className: "approve-reject-confirmation",
      textContent: "Are you sure you want to reject",
    });

    form.appendChild(confirmation);
    form.appendChild(description);
    form.appendChild(buttonsWrapper);
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
    button.addEventListener("click", (e) => {
      e.preventDefault();
      postApproveReject(form, "reject", data, requestType);
    });
  }
}
