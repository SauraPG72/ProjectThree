import { renderHeader } from "./components/header.js";
import { store } from "./utils/store.js";
import { renderParentsPage } from "./components/parents/parentsPage.js";
import { renderAddKidPrompt } from "./components/main/addKidPrompt.js";
import { renderKidsPage } from "./components/kids/kidsPage.js";
import { setKidsInStore } from "./components/parents/setKidInStore.js";
import { createAnElement } from "./utils/elementCreator.js";
import { renderMainPage } from "./components/main/mainPage.js";

renderPage();

export async function renderPage() {
  app.classList.remove("fadeout");
  app.classList.remove("fadein");
  app.innerHTML = "";
  document.getElementById("main-page-container").innerHTML = "";

  await getSessionData();

  loaderWrapper.classList.add("fadeout");
  setTimeout(function () {
    loaderWrapper.style.display = "none";
  }, 1000);

  renderHeader();

  if (!store.loggedIn) {
    loaderWrapper.style.display = "none";
    renderMainPage();
    return;
  }
  let kidsArray;
  if (store.loggedIn) kidsArray = await getKidsByParent(store.userId);
  if (store.loggedIn && store.type === "parent" && kidsArray.length === 0) {
    renderAddKidPrompt();
    return;
  }
  if (store.type === "parent") {
    setKidsInStore(kidsArray);
    renderParentsPage();
  }
  if (store.type === "kid") {
    renderKidsPage();
  }
}

function getKidsByParent(id) {
  return axios.get(`/api/users/kids-by-parent-id/${id}`).then((res) => {
    return res.data;
  });
}

function getSessionData() {
  return axios.get("/api/session").then((response) => {
    const sessionData = response.data;
    if (sessionData.type) store.type = sessionData.type;
    if (sessionData.userId) store.userId = sessionData.userId;
    if (sessionData.username) store.username = sessionData.username;
    if (sessionData.loggedIn) store.loggedIn = true;
  });
}
