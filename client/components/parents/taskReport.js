import { createAnElement } from "../../utils/elementCreator.js";

export function taskRepost() {
  // axios.get('/api/taskreport')
  console.log("task-report");
  const title = createAnElement("p", {
    textContent: "TASK REPORT",
    className: "title",
  });

  const taskReportWrapper = createAnElement(
    "div",
    {
      id: "taskReport-wrapper",
      className: "wrapper",
    },
    [title]
  );

  return taskReportWrapper;
}
