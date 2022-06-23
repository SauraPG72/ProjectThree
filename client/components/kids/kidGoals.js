import { createAnElement } from "../../utils/elementCreator.js";
import { renderPage } from "../../index.js";

export function kidGoals() {
  return axios.get("/api/kids/goals").then((response) => {
    const kidGoals = response.data;

    const goalsBoxFinal = createAnElement("div", {
      innerHTML: `
            <div id="goalsHeader" class="title-container">
            <h1> Goals List:</h1>
            <h1 id="add-goals"> + </h1>
            </div>
            `,
    });
    let goalsButt = goalsBoxFinal.querySelector("#add-goals");
    goalsButt.addEventListener("click", (event) => {
      let kidPage = document.getElementById("kidsPageWrapper");
      console.log(event);
      const addGoals = createAnElement("div", {
        innerHTML: `
            <h1> Make a goal:</h1>
            <form id="addGoalsForm">
                <input type="text" name="description" placeholder="Name your goal?">
                <input type="number" name="cents" placeholder="Dollars / Points">

                <label for="currency">Choose:</label>

                <select name="currency" id="cars">
                  <option value="cents">Money</option>
                  <option value="points">Points</option>
                </select>

                <input type="number" name="all-cents" placeholder="Allocate money/points">
                <input type="submit">
            </form>
            `,
      });
      const addGoalsForm = addGoals.querySelector("#addGoalsForm");
      addGoalsForm.addEventListener("submit", (event) => {
        console.log(event);
        event.preventDefault();
        app.innerHTML = "";

        loaderWrapper.style.display = "flex";

        const formData = new FormData(addGoalsForm);
        const data = {
          description: formData.get("description"),
          cents: formData.get("cents"),
          currency: formData.get("currency"),
          allCents: formData.get("all-cents"),
        };
        axios.post("/api/kids/goals", data).then((response) => {
          console.log(response);
          // location.reload();
          renderPage();
        });
      });
      kidPage.innerHTML = "";
      kidPage.appendChild(addGoals);
    });

    const goalsListContainer = createAnElement("div", {
      className: "container",
    });

    for (const goal of kidGoals) {
      if (goal.cents) {
        const newGoal = createAnElement("div", {
          className: "goal item",
          innerHTML: `
                <p>${goal.description}</p>
                <p>$${goal.cents * 0.01}</p>
                <form id="allocate">
                  <input type="number" name="all-cents" placeholder="$" class="numeral">
                  <input type="submit" value="+">
                </form>
                `,
        });

        const allocate = newGoal.querySelector("#allocate");

        allocate.addEventListener("submit", (e) => {
          e.preventDefault();
          const allocateData = new FormData(allocate);
          const allocateObj = {
            allCents: parseInt(allocateData.get("all-cents") * 100),
            goalId: goal.id,
          };
          console.log(allocateData);
          console.log(allocate);
          axios.post("/api/kids/all-cents", allocateObj).then((res) => {
            console.log(res);
            // location.reload();
            renderPage();
          });
        });
        goalsListContainer.appendChild(newGoal);
      } 
      
      else if (goal.points) {


        const newGoal = createAnElement("div", {
          className: "goal item",
          innerHTML: `
                <p>${goal.description}</p>
                <p>${goal.points} points</p>
                <form id="allocate">
                  <input type="number" name="all-points" placeholder="Pts" class="numeral">
                  <input type="submit" value="+">
                </form>
                `,
        });
        const allocate = newGoal.querySelector("#allocate")
        allocate.addEventListener("submit", (e) => {
          e.preventDefault();
          const allocateData = new FormData(allocate);
          const allocateObj = {
            allPoints: parseInt(allocateData.get("all-points")),
            goalId: goal.id,
          };

          axios.post("/api/kids/all-points", allocateObj).then((res) => {
            console.log(res);
            // location.reload();
            renderPage();
          });
        })
        goalsListContainer.appendChild(newGoal);
      }
    }
    goalsBoxFinal.append(goalsListContainer);

    return goalsBoxFinal;
  });
}
