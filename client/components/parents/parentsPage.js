import { createAnElement } from "../../utils/elementCreator.js";
import { renderTally } from "./Tally/tally.js";
import { tasksReports } from "./taskReport/taskReport.js";
import { tasksList } from "./TasksList/tasksList.js";
import { approvePendingTasks } from "./PendingTasks/pendingTasks.js";

// This function is an async function
// as it has to wait for all the components( using axios ) to come back
export async function renderParentsPage(kidsArray) {
  app.innerHTML = "";

  // wait for all the results of each section to come back first
  const [tallySection, tasksSection, tasksReportsSection, pendingTasksSection] =
    await Promise.all([
      renderTally(),
      tasksList(kidsArray),
      tasksReports(),
      approvePendingTasks(),
    ]);

  const parentsPageWrapper = createAnElement(
    "div",
    {
      id: "parentsPageWrapper",
    },
    [tallySection, tasksSection, tasksReportsSection, pendingTasksSection]
  );

  const mainContainer = createAnElement(
    "main",
    { className: "main-container" },
    [parentsPageWrapper]
  );

  app.appendChild(mainContainer);
}
