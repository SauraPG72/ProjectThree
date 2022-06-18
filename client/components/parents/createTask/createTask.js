import { createAnElement } from "../../../utils/elementCreator.js";
import { postTask } from "../api/addTask.js";
import {
  createInputTag,
  createRewardTag,
  createSelectTag,
} from "./createInputTags.js";

// childInfoObj = {id: child's id, name: child's name}
export function createTaskPage(childInfoObj) {
  app.innerHTML = "";

  // wrapper > form > inputs/ button
  const placeHolders = ["Description", "Category", "Reward", "Expiry Date"];
  const categoryOptions = [
    "Reccuring",
    "House Chores",
    "Sports",
    "Academic",
    "Art",
  ];

  //============= create html elements =============

  const kidsName = createAnElement("p", {
    textContent: `for ${childInfoObj["name"]}`,
    id: "create-for",
  });

  const title = createAnElement("h1", {
    id: "createTaskTitle",
    textContent: "CREATE A TASK",
  });

  // submit button
  const button = createAnElement("button", {
    className: "formBtn",
    textContent: "Add This Task",
  });

  // create a form and input tags in it
  const form = createAnElement("form", {
    id: "createTaskForm",
    className: "form",
    type: "submit",
  });

  const kidIdHiddenInput = createAnElement("input", {
    name: "kid_id",
    value: Number(childInfoObj["id"]),
    type: "hidden",
  });
  form.appendChild(kidIdHiddenInput);

  placeHolders.forEach((placeholder) => {
    // if the placeholder == "Category", create a select tag
    // otherwise create input tags and add them in the form
    if (placeholder === "Category") {
      // createSelectTag() requires
      // name of the select box
      // placeholder for the default option
      // an array that holds options (textContent/ value)
      const selectTag = createSelectTag(
        "Category",
        "Select a category",
        categoryOptions
      );
      form.appendChild(selectTag);
    } else {
      if (placeholder === "Reward") {
        const inputTag = createRewardTag(placeholder);
        form.appendChild(inputTag);
      } else {
        const inputTag = createInputTag(placeholder);
        form.appendChild(inputTag);
      }
    }
  });

  const errorMessage = createAnElement("p", {
    id: "error-message",
    type: "hidden",
  });
  form.appendChild(errorMessage);
  form.appendChild(button);

  // wrap everything in a wrapper and render it
  const formWrapper = createAnElement(
    "div",
    {
      className: "formWrapper",
    },
    [title, kidsName, form]
  );

  app.appendChild(formWrapper);

  // ============= event listeners =============
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    postTask(form);
  });
}
