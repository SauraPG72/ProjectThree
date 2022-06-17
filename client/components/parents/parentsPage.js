import { createAnElement } from "../../utils/elementCreator.js";
import { renderTally } from "./tally.js";
//import { taskReport } from "./taskReport.js";
import { tasksList } from "./tasksList.js";

// This function is an async function
// as it has to wait for all the components( using axios ) to come back
export async function renderParentsPage() {
  app.innerHTML = "";
  //  const app = document.getElementById('app');
  // const tallySection = await renderTally();
  // const taskReportSection = await taskRepost();
  // const tasksSection = await tasksList();
  const [tallySection, tasksSection] = await Promise.all([
    renderTally(),
    tasksList(),
  ]);

  const parentsPageWrapper = createAnElement(
    "div",
    {
      id: "parentsPageWrapper",
    },
    [tallySection, tasksSection]
  );

  app.appendChild(parentsPageWrapper);
}
