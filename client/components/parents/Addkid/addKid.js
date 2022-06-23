import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createInputTag } from "../createTask/createInputTags.js";
import { signUpKid } from "../api/SignupKid.js";

export function addKidPage() {
  app.innerHTML = "";

  const user_id = store.userId;

  // wrapper > form > inputs/ button
  const placeHolders = [
    "Name",
    "Login Name",
    { name: "Password", type: "password" },
    { name: "Confirm Password", type: "password" },
    "Starting Reward Points",
    "Starting Reward Dollars",
  ];
  const avatars = ["bunny", "dog", "fox", "koala", "monkey", "tiger"];

  const title = createAnElement("h1", {
    id: "createTaskTitle",
    textContent: "Sign Up Your Kid",
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

  //  avatars selection
  const avatarsSelection = avatars.map((avatar) => {
    const avatarInput = createAnElement("input", {
      type: "radio",
      id: avatar,
      name: "avatar",
      value: avatar,
      className: "avatar-input",
    });

    const avatarImage = createAnElement("img", {
      src: `./assets/avatars/${avatar}.svg`,
      className: "avatar-image",
    });

    const avatarLabel = createAnElement(
      "label",
      {
        for: avatar,
        className: "avatar-label",
      },
      [avatarInput, avatarImage]
    );

    return avatarLabel;
  });

  const avatarWrapper = createAnElement("div", { id: "avatar-wrapper" }, [
    ...avatarsSelection,
  ]);
  form.append(avatarWrapper);

  // error message area : defalut = HIDDEN
  const errorMessage = createAnElement("p", {
    id: "error-message",
    type: "hidden",
  });

  // submit button
  const button = createAnElement("button", {
    className: "formBtn confirmBtn",
    textContent: "Confirm",
  });

  const returnButton = createAnElement("button", {
    className: "formBtn",
    textContent: "Back To Home",
  });

  const buttonsWrapper = createAnElement(
    "div",
    {
      className: "buttonsWrapper",
    },
    [button, returnButton]
  );

  returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/";
  });

  form.appendChild(errorMessage);
  form.appendChild(buttonsWrapper);

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
    form.style.display = "none";
    title.style.display = "none";
    loaderWrapper.style.display = "flex";
    signUpKid(form);
  });
}
