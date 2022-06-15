import { renderHeader } from './components/header.js';
import { renderParentsPage } from './components/parents/parentsPage.js';
import { store } from './utils/store.js';

axios.get('/api/session').then((response) => {
  const sessionData = response.data;
  console.log(sessionData);
  if (sessionData.type) store.type = sessionData.type;
  if (sessionData.userId) store.userId = sessionData.userId;
  if (sessionData.username) store.username = sessionData.username;
  if (sessionData.loggedIn) store.loggedIn = true;
  renderPage();
});

function renderPage() {
  renderHeader();
  // for parents
  if (store.type === 'parent') {
    renderParentsPage();
  }
  if (store.type === 'kid') {
    renderKidsPage;
  }
  console.log(store);
}
