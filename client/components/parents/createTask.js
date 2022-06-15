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

  const kidIdHiddenInput = createAnElement("input", {
    name: "kid_id",
    value: childInfoObj["id"],
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

// ============= post task form data to the server =============

function postTask(form) {
  console.log(form);
  const formData = new FormData(form);
  const rewardType = formData.get("rewardType"); // "pts" or "cents"
  console.log(rewardType);
  // if POINT (pts) is selected in the form
  if (rewardType === "pts") {
    const jsonForm = {
      description: formData.get("Description"),
      kid_id: formData.get("kid_id"),
      status: "incomplete",
      points: formData.get("Reward"),
      cents: "",
      expiry_date: formData.get("Expiry Date"),
      category: formData.get("Category"),
    };
    console.log(jsonForm);
  } else {
    const jsonForm = {
      description: formData.get("Description"),
      kid_id: formData.get("kid_id"),
      status: "incomplete",
      points: "",
      cents: formData.get("Reward"),
      expiry_date: formData.get("Expiry Date"),
      category: formData.get("Category"),
    };
    console.log(jsonForm);
  }

  // post data to the server
  axios.post("/api/parents/");
}

// ============= functions to create form tags =============

function createInputTag(placeholder) {
  if (placeholder === "Expiry Date") {
    const inputTag = createAnElement("input", {
      placeholder: placeholder,
      className: "input",
      name: placeholder,
      type: "date",
    });
    return inputTag;
  } else {
    const inputTag = createAnElement("input", {
      placeholder: placeholder,
      className: "input",
      name: placeholder,
    });
    return inputTag;
  }
}

function createRewardTag(placeholder) {
  const rewardOptions = ["pts", "cents"];

  const inputTag = createAnElement("input", {
    placeholder: placeholder,
    className: "input half-width-input",
    name: placeholder,
  });
  const selectTag = createSelectTag(
    "rewardType",
    "Select a Reward Type",
    rewardOptions
  );

  const inputArea = createAnElement(
    "div",
    {
      className: "rewardInputArea",
    },
    [inputTag, selectTag]
  );

  return inputArea;
}

// createSelectTag("selectBox","Select a category", categoryOptions)
function createSelectTag(selectTagName, defaultOptionName, optionsArr) {
  const selectTag = createAnElement("select", {
    className: "form-selectTag",
    name: selectTagName,
  });
  const defaultOption = createAnElement("option", {
    selected: true,
    textContent: defaultOptionName,
    className: "default-options",
  });
  selectTag.appendChild(defaultOption);
  optionsArr.forEach((option) => {
    const newOption = createAnElement("option", {
      value: option,
      textContent: option,
    });
    selectTag.appendChild(newOption);
  });

  return selectTag;
}
