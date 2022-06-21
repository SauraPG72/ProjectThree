import { createAnElement } from "../../../utils/elementCreator.js";

// create titles for each section (Tally, Task Reports, Tasks This Week)

export function createTitle(titleText) {
  // "TASKS THIS WEEK" title
  const title = createAnElement("h2", {
    textContent: titleText,
    className: "components-title",
  });

  const titleContainer = createAnElement(
    "div",
    {
      className: "title-container",
    },
    [title]
  );

  return titleContainer;
}
