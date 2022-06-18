import { createAnElement } from "../../../utils/elementCreator.js";
import { postApproveReject } from "../api/postApproveReject.js";

// next => postApproveReject (api to send request to the server)
export function approverejectConfirm(status, task) {
  app.innerHTML = "";

  // ==================== common items for both approval/rejection ========================

  // create a form and input tags in it
  const form = createAnElement("form", {
    className: "form",
    type: "submit",
  });

  // description of the task
  const description = createAnElement("h1", {
    textContent: task.task_description,
  });

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
      postApproveReject(form, "approve");
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
      postApproveReject(form, "reject");
    });
  }
}
