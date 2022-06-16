import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createInputTag } from "../createTask/createInputTags.js";

export function addKidPage() {
  app.innerHTML = "";
  console.log("add kid page");

  /**
   * memo
	name VARCHAR(255),
	parent_id INT REFERENCES parents(id),
	login_name VARCHAR(255),
	password_hash VARCHAR(255),
	total_points INT,
	total_cents INT
   */
  const user_id = store.userId;
  console.log(user_id);

  // wrapper > form > inputs/ button
  const placeHolders = ["Name", "Login Name", "Password"];

  const title = createAnElement("h1", {
    id: "createTaskTitle",
    textContent: "ADD A CHILD",
  });

  // submit button
  const button = createAnElement("button", {
    id: "addTaskBtn",
    textContent: "Add This Child",
  });

  // create a form and input tags in it
  const form = createAnElement("form", {
    id: "addChildForm",
    className: "form",
    type: "submit",
  });

  const parentIdHiddenInput = createAnElement("input", {
    name: "parent_id",
    value: Number(user_id),
    type: "hidden",
  });
  form.appendChild(parentIdHiddenInput);

  placeHolders.forEach((placeholder) => {
    const inputTag = createInputTag(placeholder);
    form.appendChild(inputTag);
  });

  // error message area : defalut = HIDDEN
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
    [title, form]
  );

  app.appendChild(formWrapper);
}
