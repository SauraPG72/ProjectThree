import { createAnElement } from "../../utils/elementCreator.js";

export function renderAddKidPrompt() {
  const addKidPromptHeader = createAnElement("h1", {
    id: "splash-header",
    textContent: "Set Up an account for your kids!",
  });

  const addKidButton = createAnElement("button", {
    id: "add-kid-btn",
    textContent: "Set Up An Account Now",
  });

  const addKidCallToActionContainer = createAnElement("div", { id: "add-kid-prompt-container" }, [
    addKidPromptHeader,
  ]);

  const mainContainer = createAnElement(
    "main",
    {
      className: "main-container",
    },
    [addKidCallToActionContainer, addKidButton]
  );

  app.append(mainContainer);
}
