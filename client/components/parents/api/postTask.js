import { renderPage } from "../../../index.js";

// ============= post task form data to the server =============

export function postTask(form) {
  const formData = new FormData(form);
  const rewardType = formData.get("rewardType"); // "pts" or "cents"
  let jsonForm = {};

  // if POINT (pts) is selected in the form
  if (rewardType == "Select a Reward Type") {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Select a Reward Type";
    errorMessage.style.display = "block";
    return;
  } else if (rewardType === "pts") {
    jsonForm = {
      description: formData.get("Description"),
      kid_id: formData.get("kid_id"),
      status: "approved",
      points: parseFloat(formData.get("Reward")),
      cents: null,
      expiry_date: formData.get("Expiry Date"),
      category: formData.get("Category"),
    };
  } else {
    const cents = parseFloat(formData.get("Reward") * 100);
    jsonForm = {
      description: formData.get("Description"),
      kid_id: Number(formData.get("kid_id")),
      status: "approved",
      points: null,
      cents: cents,
      expiry_date: formData.get("Expiry Date"),
      category: formData.get("Category"),
    };
  }

  // check if there's any blanks
  // if so, pops up an error message on the screen
  const errorHandling = errorHandlingForCreatingTask(jsonForm);
  const errorMessage = document.getElementById("error-message");
  if (errorHandling != true) {
    errorMessage.textContent = errorHandling;
    errorMessage.style.display = "block";
  } else {
    // if there's no error with the inputs,
    // post data to the server
    axios.post("/api/parents/task", jsonForm).then((res) => {
      console.log(res);
      app.innerHTML = "";
      loaderWrapper.style.display = "flex";
    });
    renderPage();
  }
}

// check if there's any blank inputs
// if everything's fine, returns true
function errorHandlingForCreatingTask(form) {
  const inputs = [
    form.description,
    form.kid_id,
    form.status,
    form.points,
    form.cents,
    form.expiry_date,
  ];

  const filteredInputs = inputs.filter(Boolean);

  if (form.points === "" && form.cents === "") {
    return "Input Reward.";
  } else if (form.points === NaN || form.cents === NaN) {
    return "Input correct Reward.";
  } else if (form.category == "Select a category") {
    return "Select a category";
  } else if (!inputs[5]) {
    return "Fill in all the blanks.";
  } else if (filteredInputs.length < 5) {
    return "Fill in all the blanks.";
  } else {
    return true;
  }
}
