import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createTitle } from "../Components/title.js";
import { approverejectConfirm } from "../Form/approveRejectConfirm.js";

export function approvePendingGoals() {
  // take user id out of Store and send it to the server
  const user_id = store.userId;

  return axios.get(`/api/parents/pendingGoals/${user_id}`).then((res) => {
    const pendingGoalsList = res.data.goalsList;

    // pending task list area wrapper ( return this later )
    const pendingGoalsWrapper = createAnElement("div", {
      id: "pending-goals-wrapper",
      className: "wrapper",
    });

    // "Goals Request" title
    const title = createTitle("Goals Request");
    pendingGoalsWrapper.appendChild(title);

    // if there's no goals request, return "No Goals Requests"
    if (pendingGoalsList.length === 0) {
      const emptyMessage = createAnElement("p", {
        className: "empty-content",
        textContent: "No Goals Requests",
      });
      pendingGoalsWrapper.appendChild(emptyMessage);
      return pendingGoalsWrapper;
    }

    // this object holds 'kids name : [{ task1 }, { task2 }, ...]'
    const pendingGoalsObj = {};

    // loop over all goals list array and create goal elements one by one
    // each element contains "description" + "points/cents"
    pendingGoalsList.forEach((goal) => {
      if (goal.name in pendingGoalsObj) {
        const requestedGoal = {
          goal_id: goal.t_id,
          description: goal.description,
          points: goal.points,
        };
        pendingGoalsObj[goal.name].push(requestedGoal);
      } else {
        pendingGoalsObj[goal.name] = [
          {
            goal_id: goal.t_id,
            description: goal.description,
            points: goal.points,
          },
        ];
      }
    });

    // Loop over the "kids : [goals]" object
    //create a goals container for each kid (and add goals elements later)
    Object.keys(pendingGoalsObj).forEach((kidName) => {
      // this container is to wrap task elements later
      const goalsListContainer = createAnElement("div", {
        className: "container",
      });

      // to show each kid's name above tasks container
      const name = createAnElement("p", {
        className: "kids-name-for-tasklist",
        textContent: kidName,
      });
      pendingGoalsWrapper.appendChild(name);
      // create tasks elements for all the kids
      pendingGoalsObj[kidName].forEach((goal) => {
        // container > goalElement > "goal = goalElement + buttons container: (ApproveBtn + rejectBtn)"
        const goalWrapper = createAnElement("div", {
          className: "taskItem",
        });

        // goalElement contains description, points/cents
        const goalElement = createTaskElement(goal);
        goalWrapper.appendChild(goalElement);

        const btnsContainer = createAnElement("div", {
          className: "approve-reject-wrapper",
        });

        let rewardType = "";
        let approveBtn;

        approveBtn = createAnElement("button", {
          textContent: "Approve",
          className: "approve-reject",
          value: goal.goal_id, // task id
          id: `${goal.description}:${goal.points}`,
        });
        rewardType = "points";
        btnsContainer.appendChild(approveBtn);

        const rejectBtn = createAnElement("button", {
          textContent: "Reject",
          className: "approve-reject",
          value: goal.goal_id, // goal id
          id: goal.description,
        });
        btnsContainer.appendChild(rejectBtn);
        goalWrapper.appendChild(btnsContainer);

        goalsListContainer.appendChild(goalWrapper);

        //========== event listener for approve/reject buttons ===========
        approveBtn.addEventListener("click", (e) => {
          const targetedGoal = {
            task_id: e.target.value,
            task_description: e.target.id,
          };
          approverejectConfirm("approve", targetedGoal, "points", "goals");
        });

        rejectBtn.addEventListener("click", (e) => {
          const targetedGoal = {
            task_id: e.target.value,
            task_description: e.target.id,
          };
          approverejectConfirm("reject", targetedGoal);
        });
      });
      // ============================================================

      // append everything in the wrapper and return
      pendingGoalsWrapper.appendChild(goalsListContainer);
    });
    return pendingGoalsWrapper;
  });
}

// returns "description + points" or "description + cents"
function createTaskElement(goal) {
  const description = createAnElement("p", {
    className: "taskDescription",
    textContent: goal.description,
  });
  const points = createAnElement("p", {
    className: "points",
    textContent: `${goal.points} pts`,
  });
  const taskElement = createAnElement(
    "div",
    {
      className: "task item",
    },
    [description, points]
  );
  return taskElement;
}
