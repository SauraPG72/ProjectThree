import { createAnElement } from "../../utils/elementCreator.js";

export function kidTasks() {
  return axios.get("/api/kids/tasks").then((response) => {
    const kidTasks = response.data;
    const tasksBox = createAnElement("ul", {
      id: "kidTasks",
    });
    const taskHeader = createAnElement("h1", {
      textContent: "Tasks List",
    });
    tasksBox.appendChild(taskHeader);
    for (const task of kidTasks) {
      if ((task.status = "approved" && task.cents)) {
        const newTask = createAnElement("div", {
          id: "eachTask",
          textContent: `${task.description}  $${task.cents * 0.1}`,
        });

        tasksBox.appendChild(newTask);
      } else if ((task.status = "approved" && task.points)) {
        const newTask = createAnElement("div", {
          id: "eachTask",
          textContent: `${task.description}  ${task.points} points`,
        });

        tasksBox.appendChild(newTask);
      }
    }
    return tasksBox;
  });
}
