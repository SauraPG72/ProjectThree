import { createAnElement } from "../utils/elementCreator.js";

export function renderFooter() {
  const appFooter = document.getElementById("footer");
  appFooter.innerHTML = "";

  const createdBy = createAnElement("div", {
    id: "creators",
    textContent: "Divita. Created By Rina, Saura and Jens",
  });

  const credits = createAnElement("div", {
    id: "credits",
    innerHTML:
      'All illustrations <a href="http://www.freepik.com">Designed by Freepik</a>. <a href="https://www.pexels.com/photo/man-standing-beside-his-wife-teaching-their-child-how-to-ride-bicycle-1128318/">Photo by Agung Pandit Wiguna</a> ',
  });

  const footerContainer = createAnElement(
    "div",
    {
      id: "footer-container",
    },
    [createdBy, credits]
  );

  appFooter.append(footerContainer);
}
