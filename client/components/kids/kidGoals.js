import { createAnElement } from "../../utils/elementCreator.js";

export function kidGoals() {
  return axios.get("/api/kids/goals").then((response) => {
    const kidGoals = response.data;

    const goalsBoxFinal = createAnElement("div", {
      innerHTML: `
            <div id="goalsHeader">
            <h1> Goals List:</h1>
            <h1 onClick = addGoals()> + </h1>
            </div>
            `,
    });

    for (const goal of kidGoals) {
      if (goal.cents) {
        const newGoal = createAnElement("div", {
          id: "eachGoal",

          innerHTML: `
                <p>${goal.description}</p>
                <p>$${goal.cents * 0.1}</p>
                `,
        });

        goalsBoxFinal.appendChild(newGoal);
      } else if (goal.points) {
        const newGoal = createAnElement("div", {
          id: "eachGoal",

          innerHTML: `
                <p>${goal.description}</p>
                <p>${goal.points} points</p>
                `,
        });

        goalsBoxFinal.appendChild(newGoal);
      }
    }
    return goalsBoxFinal;
  });
}
