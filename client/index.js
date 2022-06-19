import { renderHeader } from "./components/header.js";
import { store } from "./utils/store.js";
import { renderParentsPage } from "./components/parents/parentsPage.js";
import { renderAddKidPrompt } from "./components/main/addKidPrompt.js";
import { renderKidsPage } from "./components/kids/kidsPage.js";
import { setKidsInStore } from "./components/parents/setKidInStore.js";

renderPage();

export async function renderPage() {
  await getSessionData();

  renderHeader();

  console.log(store);
  const kidsArray = await getKidsByParent(store.userId);
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
