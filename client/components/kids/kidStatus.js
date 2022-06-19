import { createAnElement } from "../../utils/elementCreator.js";

export function kidData() {
  return axios.get("/api/kids").then((response) => {
    const currentKid = response.data.kidsData;
    console.log(currentKid);
    const kidName = createAnElement("div", {
      id: "kid-data",
    });
    const kidHeaderDataOne = createAnElement("p", {
      id: "leftData",
      textContent: currentKid.name,
    });
    const kidHeaderDataTwo = createAnElement("p", {
      id: "rightData",
      textContent: `$${currentKid.total_cents} ${currentKid.total_points}`,
    });

    kidName.appendChild(kidHeaderDataOne);
    kidName.appendChild(kidHeaderDataTwo);

    return kidName;
  });
}
