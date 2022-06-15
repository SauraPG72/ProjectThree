import { createAnElement } from "../../utils/elementCreator.js";

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
    id: "addTaskBtn",
    textContent: "Add This Task",
  });

  // create a form and input tags in it
  const form = createAnElement("form", {
    id: "createTaskForm",
    className: "form",
    type: "submit",
  });

  placeHolders.forEach((placeholder) => {
    const selectTag = createAnElement("select", {
      className: "form-selectTag",
      name: "selectBox",
    });
    const kidIdHiddenInput = createAnElement("input", {
      name: "kid_id",
      value: childInfoObj["id"],
      display: "hidden",
    });
    selectTag.appendChild(kidIdHiddenInput);

    // if the placeholder == "Category", create a select tag
    // otherwise create input tags and add them in the form
    if (placeholder === "Category") {
      const defaultOption = createAnElement("option", {
        selected: true,
        textContent: "Select a category",
        id: "default-option",
      });
      selectTag.appendChild(defaultOption);
      categoryOptions.forEach((category) => {
        const option = createAnElement("option", {
          value: category,
          textContent: category,
        });
        selectTag.appendChild(option);
      });
      form.appendChild(selectTag);
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

function postTask(form) {
  console.log(form);
  const formData = new FormData(form);

  const jsonForm = {
    description: formData.get("Description"),
    kid_id: formData.get("kid_id"),
    status: "incomplete",
    // points:formData.get("selectBox"),
    // cents:formData.get("selectBox"),
    expiry_date: formData.get("selectBox"),
    category: formData.get("selectBox"),
  };
  console.log(jsonForm);
}
