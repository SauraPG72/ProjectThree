import { createAnElement } from "../../utils/elementCreator.js";

export function kidData() {
  return axios.get("/api/kids").then((response) => {
    const currentKid = response.data.kidsData;

    const kidHeaderName = createAnElement("p", {
      id: "kid-header-name",
      textContent: currentKid.name,
    });

    const kidHeaderDollars = createAnElement("p", {
      id: "total-dollars",
      textContent: `$${+currentKid.total_cents / 100}`,
    });
    const kidHeaderPoints = createAnElement("p", {
      id: "total-cents",
      textContent: `${currentKid.total_points}pts`,
    });

    const totalPointsAndDollars = createAnElement("div", { id: "header-total-tally" }, [
      kidHeaderPoints,
      kidHeaderDollars,
    ]);

    const kidTotalsData = createAnElement("div", { id: "kid-data" }, [
      kidHeaderName,
      totalPointsAndDollars,
    ]);

    return kidTotalsData;
  });
}
