import { createAnElement } from "../../utils/elementCreator.js";

// childInfoObj = {id: child's id, name: child's name}
export function createTaskPage(childInfoObj) {
  app.innerHTML = "";

  console.log(childInfoObj);
  // wrapper > form > inputs/ button

  const placeHolders = ["Description", "Category", "Reward", "Expiry Date"];

  const selectBoxes = [];

  // create html elements
  const kidsName = createAnElement("p", {
    textContent: `for ${childInfoObj["name"]}`,
    id: "create-for",
  });

  const title = createAnElement("h1", {
    id: "createTaskTitle",
    textContent: "CREATE A TASK",
  });

  const button = createAnElement("button", {
    id: "addTaskBtn",
    textContent: "Add This Task",
    name: "kid_id",
    value: childInfoObj["id"],
  });
  const form = createAnElement("form", {
    id: "createTaskForm",
    className: "form",
  });

  console.log(childInfoObj["name"]);
  // create input tags in the form
  // if the placeholder == "For" or "Category", create a select tag
  placeHolders.forEach((placeholder) => {
    // const selectTag = createAnElement("select");
    if (placeholder === "Category") {
      console.log("category");
    } else {
      const inputTag = createAnElement("input", {
        placeholder: placeholder,
        className: "input",
        name: placeholder,
      });
      form.appendChild(inputTag);
    }
  });

  form.appendChild(button);

  const formWrapper = createAnElement(
    "div",
    {
      className: "formWrapper",
    },
    [title, kidsName, form]
  );

  app.appendChild(formWrapper);
}
