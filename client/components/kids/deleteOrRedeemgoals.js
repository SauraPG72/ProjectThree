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
      className: "confirmationText",
    });
    const confirmButton = createAnElement("button", {
      innerText: buttonText,
      className: "formBtn confirmBtn",
    });
    const backButton = createAnElement("button", {
      innerText: "Cancel",
      className: "formBtn",
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
        renderPage();
      }
    });
    backButton.addEventListener("click", () => {
      renderPage();
    });
    const buttonsWrapper = createAnElement(
      "div",
      {
        className: "buttonsWrapper",
      },
      [confirmButton, backButton]
    );
  
    //   MAIN CONTAINER
    const mainContainer = createAnElement(
      "main",
      {
        className: "main-container",
      },
      [prompt, buttonsWrapper]
    );
  
    app.append(mainContainer);
  }
  