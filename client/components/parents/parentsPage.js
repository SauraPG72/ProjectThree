import { createAnElement } from "../../utils/elementCreator.js";
import { renderTally } from "./Tally/tally.js";
import { tasksReports } from "./taskReport/taskReport.js";
import { tasksList } from "./TasksList/tasksList.js";
import { approvePendingTasks } from "./PendingTasks/pendingTasks.js";
import { approvePendingGoals } from "./PendingGoals/pendingGoals.js";

// This function is an async function
// as it has to wait for all the components( using axios ) to come back
export async function renderParentsPage(kidsArray) {
  app.classList.add("fadeout");

  // wait for all the results of each section to come back first
  const [
    tallySection,
    tasksSection,
    tasksReportsSection,
    pendingTasksSection,
    pedingGoalsSection,
  ] = await Promise.all([
    renderTally(),
    tasksList(kidsArray),
    tasksReports(),
    approvePendingTasks(),
    approvePendingGoals(),
  ]);

  const parentsPageWrapper = createAnElement(
    "div",
    {
      id: "parentsPageWrapper",
    },
    [
      tallySection,
      tasksSection,
      tasksReportsSection,
      pendingTasksSection,
      pedingGoalsSection,
    ]
  );

  const mainContainer = createAnElement(
    "main",
    { className: "main-container" },
    [parentsPageWrapper]
  );

  app.appendChild(mainContainer);
  app.classList.add("fadein");
}
