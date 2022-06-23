import { createAnElement } from "../utils/elementCreator.js";
import { store } from "../utils/store.js";

export function renderHeader() {
  const appHeader = document.getElementById("app-header");
  appHeader.innerHTML = "";

  const headerTitle = createAnElement("a", {
    textContent: "divita",
    id: "app-header-logo",
    href: "/",
  });

  const logoutBtn = createAnElement("button", {
    textContent: "Log Out",
    id: "logout-btn",
  });

  const loginBtn = createAnElement("button", {
    textContent: "Log In",
    id: "login-btn",
  });

  const headerLinks = createAnElement("div", { id: "header-links" });

  if (store.loggedIn) {
    headerLinks.append(logoutBtn);
  } else {
    headerLinks.append(loginBtn);
  }

  const headerContainer = createAnElement("div", { id: "header-container" }, [
    headerTitle,
    headerLinks,
  ]);

  appHeader.appendChild(headerContainer);
  appHeader.classList.add("fadein");

  //===================================
  logoutBtn.addEventListener("click", () => {
    appHeader.style.display = "none";
    loaderWrapper.classList.add("fadein");
    axios.delete("api/session").then(() => {
      window.location.href = "/";
    });
  });

  loginBtn.addEventListener("click", () => {
    loaderWrapper.classList.add("fadein");
    axios.delete("api/session").then(() => {
      window.location.href = "/login.html";
    });
  });
}
