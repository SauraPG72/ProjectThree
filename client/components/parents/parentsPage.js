import { createAnElement } from "../../utils/elementCreator.js";
import { renderTally } from "./tally.js";
import { taskRepost } from "./taskReport.js";
import { tasks } from "./tasks.js";

// This function is an async function
// as it has to wait for all the components( using axios ) to come back
export async function renderParentsPage() {
  const tallySection = await renderTally();
  const taskReportSection = await taskRepost();
  const tasksSection = await tasks();

  const parentsPageWrapper = createAnElement(
    "div",
    {
      id: "parentsPageWrapper",
    },
    [tallySection, taskReportSection, tasksSection]
  );
  app.appendChild(parentsPageWrapper);
}
