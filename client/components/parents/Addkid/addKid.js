import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createInputTag } from "../createTask/createInputTags.js";
import { signUpKid } from "../api/SignupKid.js";

export function addKidPage() {
  app.innerHTML = "";

  const user_id = store.userId;
  console.log(user_id);

  // wrapper > form > inputs/ button
  const placeHolders = [
    "Name",
    { name: "Password", type: "password" },
    { name: "Confirm Password", type: "password" },
    "Starting Reward Points",
    "Starting Reward Dollars",
  ];

  const title = createAnElement("h1", {
    id: "createTaskTitle",
    textContent: "SIGN UP YOUR CHILD",
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

  // submit button
  const button = createAnElement("button", {
    id: "addTaskBtn",
    textContent: "Confirm",
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    signUpKid(form);
  });
}
