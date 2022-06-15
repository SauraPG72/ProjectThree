// import axios from "axios";
import { renderHeader } from './components/header.js';
import { renderParentsPage } from './components/parents/parentsPage.js';
import { store } from './utils/store.js';

axios.get('/api/session').then((response) => {
  const sessionData = response.data;
  if (sessionData.type) store.type = sessionData.type;
  if (sessionData.userId) store.userId = sessionData.userId;
  if (sessionData.username) store.type = sessionData.username;
  renderPage();
});

const app = document.getElementById('app');

function renderPage() {
  // TODO: add function to render header and other components
  console.log('header rendered');
  renderHeader();
  // for parents
  renderParentsPage();
  console.log('parents page rendered');
}
