import { renderPage } from "../../../index.js";

export function signUpKid(form) {
  const formData = new FormData(form);
  let jsonForm = {};

  jsonForm = {
    name: formData.get("Name"),
    login_name: formData.get("Login Name"),
    parent_id: formData.get("parent_id"),
    total_points: +formData.get("Starting Reward Points"),
    total_cents: parseFloat(formData.get("Starting Reward Dollars") * 100),
    password: formData.get("Password"),
    confirm_password: formData.get("Confirm Password"),
    avatar: formData.get("avatar"),
  };

  // check if there's any blanks or other errors (except for total_points and total_cents)
  // if so, pops up an error message on the screen
  const errorHandling = errorHandlingForCreatingTask(jsonForm);
  const messageBox = document.getElementById("error-message");
  if (errorHandling !== true) {
    messageBox.textContent = errorHandling;
    messageBox.style.display = "block";
  } else {
    messageBox.style.display = "hidden";

    // if there's no error with the inputs,
    // post data to the server
    axios
      .post("/api/users/kids", jsonForm)
      .then((res) => {
        if (res.status === 200) {
          app.innerHTML = "";
          loaderWrapper.classList.add("fadein");
          renderPage();
        }
      })
      .catch((err) => {
        console.log(err);
        messageBox.textContent = err.response.data.message;
        messageBox.style.display = "block";
      });
    app.innerHTML = "";
    loaderWrapper.classList.add("fadein");
    renderPage();
  }
}

// check if there's any blank inputs
// if everything's fine, returns true
function errorHandlingForCreatingTask(form) {
  const inputs = [
    form.name,
    form.parent_id,
    form.password,
    form.confirm_password,
  ];

  // all the input value in the form
  const filteredInputs = inputs.filter(Boolean);

  if (form.password !== form.confirm_password) {
    return "Password does not match.";
  } else if (filteredInputs.length !== 4) {
    return "Fill in all the blanks.";
  } else {
    return true;
  }
}
