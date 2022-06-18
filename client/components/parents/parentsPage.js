import { createAnElement } from "../../utils/elementCreator.js";
import { renderTally } from "./tally.js";
import { tasksReports } from "./taskReport/taskReport.js";
import { tasksList } from "./tasksList.js";

// This function is an async function
// as it has to wait for all the components( using axios ) to come back
export async function renderParentsPage() {
  app.innerHTML = "";

  // wait for all the results of each section to come back first
  const [tallySection, tasksSection, tasksReportsSection] = await Promise.all([
    renderTally(),
    tasksList(),
    tasksReports(),
  ]);

  const parentsPageWrapper = createAnElement(
    "div",
    {
      id: "parentsPageWrapper",
    },
    [tallySection, tasksSection, tasksReportsSection]
  );

  const mainContainer = createAnElement("main", { className: "main-container" }, [
    parentsPageWrapper,
  ]);

  app.appendChild(mainContainer);
}
