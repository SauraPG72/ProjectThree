import { createAnElement } from "../../utils/elementCreator.js";
import { store } from "../../utils/store.js";

export function tasksList() {
  return new Promise((resolve, reject) => {
    // take user id out of Store and send it to the server
    // response : all the kids data related to that user id (array)
    const data = {
      user_id: store.userId,
    };
    axios.post("/api/parents/taskslist", data).then((res) => {
      console.log(res.data.tasksList);
    });
  });

  console.log("tasks");
  const title = createAnElement("p", {
    textContent: "TASKS THIS WEEK",
    className: "title",
  });

  const tasksWrapper = createAnElement(
    "div",
    {
      id: "tasks-wrapper",
      className: "wrapper",
    },
    [title]
  );

  return tasksWrapper;
}
