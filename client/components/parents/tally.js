import { createAnElement } from "../../utils/elementCreator.js";
import { store } from "../../utils/store.js";
import { addKidPage } from "./Addkid/addKid.js";

export function renderTally() {
  // take user id out of Store and send it to the server
  // response : all the kids data related to that user id (array)
  const user_id = store.userId;

  return axios
    .get(`/api/parents/tally/${user_id}`)
    .then((res) => {
      const kidsData = res.data.kidsData; // array

      // tallyWrapper = title + tallyContainer (that contains all the tally elements)
      const tallyWrapper = createAnElement("div", {
        id: "tally-wrapper",
        className: "wrapper",
      });

      // =========== title part for TALLY ( TALLY + add kid button ) ===========

      const title = createAnElement("p", {
        textContent: "TALLY",
        className: "title",
      });

      // "add kids button" (addKidBtn > icon)
      const icon = createAnElement("i", {
        className: "fas fa-plus task-add-icon",
        // value: user_id, // parent id (pass it to Add Kid form (as e.target.value))
        // id: "parent_id",
      });

      const addKidButton = createAnElement(
        "button",
        {
          className: "addBtn",
          // value: user_id, // parent id (pass it to Add Kid form (as e.target.value))
          // id: "parent_id",
        },
        [icon]
      );

      const titleContainer = createAnElement(
        "div",
        {
          className: "titleContainer",
        },
        [title, addKidButton]
      );

      // event listener to render Add kid Form
      addKidButton.addEventListener("click", () => {
        addKidPage();
      });

      tallyWrapper.appendChild(titleContainer);

      if (kidsData.length === 0) {
        const emptyMessage = createAnElement("p", {
          className: "empty-content",
          textContent: "Sign Up A Child",
        });
        tallyWrapper.appendChild(emptyMessage);
        return tallyWrapper;
      }

      // this container is for tally elements later
      const tallyContainer = createAnElement("div", {
        className: "container",
      });

      // loop over all the kids and create tally elements for them
      // then add them in the container created above
      kidsData.forEach((kid) => {
        const name = createAnElement("p", {
          className: "kidsName",
          textContent: kid.name,
        });

        const money = createAnElement("p", {
          className: "money",
          textContent: `$ ${kid.total_cents / 100}`,
        });

        const points = createAnElement("p", {
          className: "points",
          textContent: `${kid.total_points} pts`,
        });

        // tall contains kids name, points, money for each kid
        const tally = createAnElement(
          "div",
          {
            className: "tally item",
          },
          [name, points, money]
        );
        tallyContainer.appendChild(tally);
        tallyWrapper.appendChild(tallyContainer);
      });

      // ========================================================

      return tallyWrapper;
    })
    .catch((err) => {
      console.log(err);
      return "Couldn't load the data";
    });
}
