import { createAnElement } from "../utils/elementCreator.js";

export function renderHeader() {
  const app = document.getElementById("app");

  const headerTitle = createAnElement("h1", {
    textContent: "DIVITA",
    id: "app-name",
  });

  const logoutBtn = createAnElement("button", {
    textContent: "Log out",
    id: "logout-btn",
  });

  const header = createAnElement("div", { id: "header" }, [
    headerTitle,
    logoutBtn,
  ]);
  app.appendChild(header);

  //===================================
  logoutBtn.addEventListener("click", () => {
    console.log("logout click event");
  });
}
