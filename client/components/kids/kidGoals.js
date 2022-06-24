import { createAnElement } from "../../utils/elementCreator.js";
import { renderPage } from "../../index.js";
import { completeDeleteGoal } from "./deleteOrRedeemgoals.js";

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
      let app = document.getElementById("app");
      console.log(event);
      const addGoals = createAnElement("div", {
        className: "formWrapper",
        innerHTML: `
            <h1 class="formTitle"> Make a goal:</h1>
            <form id="addGoalsForm">
              <input type="text" name="description" placeholder="Name your goal?">
              <div class="rewardInputArea">
                <input type="number" name="cents" placeholder="Dollars / Points"  class="half-width-input">
                <select name="currency" id="cars"  class="half-width-input">
                  <option value="cents">Money</option>
                  <option value="points">Points</option>
                </select>
              </div>
              <input type="number" name="all-cents" placeholder="Allocate money/points">
              <div class="buttonsWrapper">
                <button type="submit" class="formBtn confirmBtn">Submit</button>
                <button class="formBtn" id="backBtn">Cancel</button>
              </div>
            </form>
            `,
      });
      const backBtn = taskForm.querySelector("#backBtn");
      backBtn.addEventListener("click", () => {
        renderPage();
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
      app.innerHTML = "";
      app.appendChild(addGoals);
    });

    const goalsListContainer = createAnElement("div", {
      className: "container",
    });

    const xMark = `<i class="fa-solid fa-circle-xmark red delete"></i>`;

    for (const goal of kidGoals) {
      if (goal.cents) {
        const amountAchieved =
          (goal.allocated_cents / goal.cents).toFixed(2) * 100;

        const newGoal = createAnElement("div", {
          className: "goal item",
          id: "goal-container",
          innerHTML: `
                <p id="goal-d">${goal.description}</p>
                <p id="goal-c">$${goal.cents * 0.01}</p>
                <form id="allocate">
                  <input type="number" name="all-cents" placeholder="$" class="numeral">
                  <input type="submit" value="+">
                </form>

                <i class="fa-solid fa-circle-check green complete-task redeem-goal"></i>
                <i class="fa-solid fa-circle-xmark red delete-task delete-goal"></i>
                <div class="progress">
	                <div class="progress-done" data-done="${amountAchieved}">
		                $${(goal.allocated_cents * 0.01).toFixed(2)}
	                </div>
                </div>
                `,
        });
        // code for showing progress on allocated goals button
        const progress = newGoal.querySelector(".progress-done");
        progress.style.width = progress.getAttribute("data-done") + "%";
        progress.style.opacity = 1;
        // code for the deleting goals button
        const deleteButton = newGoal.querySelector(".delete-goal");
        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();
          completeDeleteGoal("delete", goal);
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

            renderPage();
          });
        });
        // code for redeeming points
        if (goal.cents == goal.allocated_cents) {
          const redeemButton = newGoal.querySelector(".redeem-goal");
          redeemButton.addEventListener("click", (event) => {
            event.preventDefault();
            completeDeleteGoal("redeem", goal);
          });
        }

        goalsListContainer.appendChild(newGoal);
      } else if (goal.points && goal.status == "approved") {
        const amountAchieved =
          (goal.allocated_points / goal.points).toFixed(2) * 100;
        const newGoal = createAnElement("div", {
          className: "goal item",
          id: "goal-container",
          innerHTML: `
            <p id="goal-d">${goal.description}</p>
            <p id="goal-c">${goal.points} pts</p>
            <form id="allocate">
              <input type="number" name="all-points" placeholder="pts" class="numeral">
              <input type="submit" value="+">
            </form>
            <i class="fa-solid fa-circle-check green complete-task redeem-goal"></i>
            <i class="fa-solid fa-circle-xmark red delete-task delete-goal"></i>
            <div class="progress">
              <div class="progress-done" data-done="${amountAchieved}">
               ${goal.allocated_points}pts 
              </div>
            </div>
                `,
        });
        const progress = newGoal.querySelector(".progress-done");
        progress.style.width = progress.getAttribute("data-done") + "%";
        progress.style.opacity = 1;

        const deleteButton = newGoal.querySelector(".delete-goal");
        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();
          completeDeleteGoal("delete", goal);
        });

        const allocate = newGoal.querySelector("#allocate");
        allocate.addEventListener("submit", (e) => {
          e.preventDefault();
          const allocateData = new FormData(allocate);
          const allocateObj = {
            allPoints: parseInt(allocateData.get("all-points")),
            goalId: goal.id,
          };

          axios.post("/api/kids/all-points", allocateObj).then((res) => {
            console.log(res);

            renderPage();
          });
        });
        // code for redeeming a points based task
        if (goal.points == goal.allocated_points) {
          const redeemButton = newGoal.querySelector(".redeem-goal");
          redeemButton.addEventListener("click", (event) => {
            event.preventDefault();
            completeDeleteGoal("redeem", goal);
          });
        }
        goalsListContainer.appendChild(newGoal);
      } else {
        const newGoal = createAnElement("div", {
          className: "item pending goal",

          innerHTML: `
          <p id="goal-d">${goal.description}</p>
          <p id="goal-c">${goal.points} pts</p>
          
              `,
        });
        goalsListContainer.appendChild(newGoal);
      }
    }
    goalsBoxFinal.append(goalsListContainer);

    return goalsBoxFinal;
  });
}
