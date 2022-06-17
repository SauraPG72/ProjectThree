import { createAnElement } from "../../utils/elementCreator.js";

export function kidGoals() {
  return axios.get("/api/kids/goals").then((response) => {
    const kidGoals = response.data;
    const goalsBox = createAnElement("ul", {
      id: "kidGoals",
    });
    const goalsHeader = createAnElement("h1", {
      textContent: "Goals List",
    });
    goalsBox.appendChild(goalsHeader);

    for (const goal of kidGoals) {
      if (goal.cents) {
        const newGoal = createAnElement("div", {
          id: "eachGoal",
          textContent: `${goal.description}  $${goal.cents * 0.1}`,
        });

        goalsBox.appendChild(newGoal);
        return goalsBox;
      } else if (goal.points) {
        const newGoal = createAnElement("div", {
          id: "eachGoal",
          textContent: `${goal.description}  ${goal.points} points`,
        });

        goalsBox.appendChild(newGoal);
        return goalsBox;
      }
    }
  });
}
