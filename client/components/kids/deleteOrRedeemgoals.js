import { createAnElement } from "../../utils/elementCreator.js";
import { renderPage } from "../../index.js";

export function completeDeleteGoal(action, goal) {
    app.innerHTML = "";
    let promptMessage;
    let buttonText;
    console.log(goal.id);
  
    if (action === "delete") {
      promptMessage = `Delete ${goal.description}?`;
      buttonText = "Delete";
    }
    if (action === "redeem") {
      promptMessage = `Redeem ${goal.description}`;
      buttonText = "Redeem";
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
    confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
      if (action === "redeem") {
        axios
          .post(`/api/kids/redeem-goal/${goal.id}`)
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
        // window.location.href = "/";
        renderPage();
      }
      if (action === "delete") {
        axios
          .delete(`/api/kids/delete-goal/${goal.id}`)
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
  