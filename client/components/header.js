import { createAnElement } from "../utils/elementCreator.js";

export function renderHeader() {
  const appHeader = document.getElementById("app-header");

  const headerTitle = createAnElement("h1", {
    textContent: "DIVITA",
    id: "app-name",
  });

  const logoutBtn = createAnElement("button", {
    textContent: "Log out",
    id: "logout-btn",
  });

  const header = createAnElement("div", { id: "header" }, [headerTitle, logoutBtn]);
  appHeader.appendChild(header);

  //===================================
  logoutBtn.addEventListener("click", () => {
    axios.delete("api/session").then((res) => {
      window.location.href = "/login.html";
    });
  });
}
