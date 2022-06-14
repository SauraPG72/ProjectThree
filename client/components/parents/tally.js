import { createAnElement } from "../../utils/elementCreator.js";
import { store } from "../../utils/store.js";

export function renderTally() {
  return new Promise((resolve, reject) => {
    // take user id out of Store and send it to the server
    // response : all the kids data related to that user id (array)
    const data = {
      user_id: store.userId,
    };
    axios
      .post("/api/parents/tally", data)
      .then((res) => {
        const kidsData = res.data.kidsData; // array

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
            textContent: kid.total_cents,
          });

          const points = createAnElement("p", {
            className: "points",
            textContent: kid.total_points,
          });
          const tally = createAnElement(
            "div",
            {
              className: "tally item",
            },
            [name, money, points]
          );
          tallyContainer.appendChild(tally);
        });

        const title = createAnElement("p", {
          textContent: "TALLY",
          className: "title",
        });

        // tallyWrapper = title + tallyContainer (that contains all the tally elements)
        const tallyWrapper = createAnElement(
          "div",
          {
            id: "tally-wrapper",
            className: "wrapper",
          },
          [title, tallyContainer]
        );

        resolve(tallyWrapper);
      })
      .catch((err) => {
        console.log(err);
        reject("Couldn't load the data");
      });
  });
}
