// import axios from "axios";
import { renderHeader } from './components/header.js';

//axios.get('/api/session').then((response) => {
//  // TODO: Set user data to the store
//  console.log(response);
// TODO: After login credentials have been confirmed, render the page
renderPage();
//});

function renderPage() {
  // TODO: add function to render header and other components
  console.log('header rendered');
  renderHeader();
}
