import { createAnElement } from "../../utils/elementCreator.js";

export function renderAddKidPrompt() {
  const addKidPromptIllustration = createAnElement("img", {
    id: "add-kid-prompt-image",
    src: "./assets/illustrations/addkid.svg",
  });

  const addKidPromptHeader = createAnElement("h1", {
    id: "add-kid-prompt-header",
    textContent: "You are one step closer to giving your kids financial freedom!",
  });
  const addKidPromptParagraph = createAnElement("p", {
    id: "add-kid-prompt-paragraph",
    textContent: "Create an account for your kids to get things started",
  });
  const addKidButton = createAnElement("button", {
    id: "add-kid-btn",
    textContent: "Set Up An Account Now",
  });

  const addKidPromptHeaderContainer = createAnElement(
    "div",
    {
      id: "add-kid-prompt-header-container",
    },
    [addKidPromptHeader, addKidPromptParagraph, addKidButton]
  );

  // container for the add kids prompt
  const addKidCallToActionContainer = createAnElement("div", { id: "add-kid-prompt-container" }, [
    addKidPromptHeaderContainer,
    addKidPromptIllustration,
  ]);

  //  container for the whole main section
  const mainContainer = createAnElement(
    "main",
    {
      className: "main-container",
    },
    [addKidCallToActionContainer]
  );

  app.append(mainContainer);
}
