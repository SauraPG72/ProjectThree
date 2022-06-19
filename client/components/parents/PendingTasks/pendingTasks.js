import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createTitle } from "../../title.js";

export function approvePendingTasks() {
  console.log("ok");
  // take user id out of Store and send it to the server
  const user_id = store.userId;

  // response : tasks data whose status is 'pending' of all the kids related to that user id (array)
  return axios.get(`/api/parents/pendingTasks/${user_id}`).then((res) => {
    console.log(res.data);

    const pendingTasksList = res.data.tasksList;

    // pending task list area wrapper ( return this later )
    const pendingTasksWrapper = createAnElement("div", {
      id: "pending-tasks-wrapper",
      className: "wrapper",
    });

    // "Tasks Request" title
    const title = createTitle("Tasks Request");
    pendingTasksWrapper.appendChild(title);

    // if there's no task request, return "No Tasks Reports"
    if (pendingTasksList.length === 0) {
      const emptyMessage = createAnElement("p", {
        className: "empty-content",
        textContent: "No Tasks Reports",
      });
      pendingTasksWrapper.appendChild(emptyMessage);
      return pendingTasksWrapper;
    }
    return res.data;
  });
}
