// appvoroOrReject : String
// if approve, send a request to delete the targeted task
export function postApproveReject(form, appvoroOrReject) {
  const formData = new FormData(form);
  let jsonForm = {};

  if (appvoroOrReject === "approve") {
    // jsonForm = {
    //   description: formData.get("Description"),
    //   kid_id: formData.get("kid_id"),
    //   status: "approved",
    //   points: parseFloat(formData.get("Reward")),
    //   cents: null,
    //   expiry_date: formData.get("Expiry Date"),
    //   category: formData.get("Category"),
    // };
    console.log(form);
  } else {
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

  const errorMessage = document.getElementById("error-message");

  // post data to the server
  // axios.post("/api/parents/task", jsonForm).then((res) => {
  //   console.log(res);
  //   renderParentsPage();
  // });
}
