import { createAnElement } from "../../utils/elementCreator.js";

export function renderMainPage() {
  app.innerHTML = "";

  const welcomeScreen = createAnElement("main", {
    id: "main-page-container",
    innerHTML: "test",
  });

  app.append(welcomeScreen);
}
