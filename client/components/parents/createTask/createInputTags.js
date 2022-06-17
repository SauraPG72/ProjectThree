import { createAnElement } from "../../../utils/elementCreator.js";

// ============= functions to create form tags =============

export function createInputTag(placeholder) {
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

export function createRewardTag(placeholder) {
  const rewardOptions = ["pts", "dollars"];

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
export function createSelectTag(selectTagName, defaultOptionName, optionsArr) {
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
