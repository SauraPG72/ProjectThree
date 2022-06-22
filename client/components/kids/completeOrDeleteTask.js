import { createAnElement } from "../../utils/elementCreator.js";

export function completeDeleteTask(action, task) {
  app.innerHTML = "";
  let promptMessage;
  let buttonText;
  console.log(task.id);

  if (action === "complete") {
    promptMessage = `Mark ${task.description} as Complete?`;
    buttonText = "Complete";
  }
  if (action === "delete") {
    promptMessage = `Delete ${task.description}`;
    buttonText = "Delete";
  }

  // DOM ELEMENTS
  const prompt = createAnElement("h2", {
    innerText: promptMessage,
  });
  const confirmButton = createAnElement("button", {
    innerText: buttonText,
  });
  const backButton = createAnElement("button", {
    innerText: "Cancel",
  });

  //  EVENT LISTENERS
  confirmButton.addEventListener("click", () => {
    if (action === "complete") {
      axios
        .patch(`/api/kids/complete-task/${task.id}`)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
      window.location.href = "/";
    }
    if (action === "delete") {
      axios
        .delete(`/api/kids/delete-task/${task.id}`)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
      window.location.href = "/";
    }
  });
  backButton.addEventListener("click", () => {
    window.location.href = "/";
  });

  //   MAIN CONTAINER
  const mainContainer = createAnElement(
    "main",
    {
      className: "main-container",
    },
    [prompt, confirmButton, backButton]
  );

  app.append(mainContainer);
}
