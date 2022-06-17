import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";

export function tasksReports() {
  // take user id out of Store and send it to the server
  const user_id = store.userId;

  // response : tasks data of all the kids related to that user id (array)
  return axios
    .get(`/api/parents/tasksreport/${user_id}`)
    .then((res) => {
      const tasksList = res.data.tasksList;

      // task list area wrapper ( return this later )
      const taskReportsWrapper = createAnElement("div", {
        id: "taskReports-wrapper",
        className: "wrapper",
      });
      // "TASKS THIS WEEK" title
      const title = createAnElement("p", {
        textContent: "TASKS REPORTS",
        className: "title",
      });
      taskReportsWrapper.appendChild(title);

      // this object holds 'kids name : [{ task1 }, { task2 }, ...]'
      const kidsTasksObj = {};

      // loop over all tasks list array and create task elements one by one
      // each element contains "description" + "points/cents"
      tasksList.forEach((task) => {
        if (task.name in kidsTasksObj) {
          const requestedTask = {
            task_id: task.t_id,
            description: task.description,
            cents: task.cents,
            points: task.points,
          };
          kidsTasksObj[task.name].push(requestedTask);
        } else {
          kidsTasksObj[task.name] = [
            {
              task_id: task.t_id,
              description: task.description,
              cents: task.cents,
              points: task.points,
            },
          ];
        }
      });

      // Loop over the "kids : [tasks]" object
      //create a tasks container for each kid (and add tasks elements later)
      Object.keys(kidsTasksObj).forEach((kidName) => {
        // this container is to wrap task elements later
        const tasksListContainer = createAnElement("div", {
          className: "container",
        });

        // to show each kid's name above tasks container
        const name = createAnElement("p", {
          className: "kids-name-for-tasklist",
          textContent: kidName,
        });
        taskReportsWrapper.appendChild(name);

        // ============================================================

        // create tasks elements for all the kids
        kidsTasksObj[kidName].forEach((task) => {
          // container > taskElement > "task = taslElement + buttons container: (ApproveBtn + rejectBtn)"
          const taskWrapper = createAnElement("div", {
            className: "taskItem",
          });

          // taskElement contains description, points/cents
          const taskElement = createTaskElement(task);
          taskWrapper.appendChild(taskElement);

          const approveBtn = createAnElement("button", {
            textContent: "Approve",
            className: "approve-reject",
            value: task.task_id, // task id
          });
          const rejectBtn = createAnElement("button", {
            textContent: "Reject",
            className: "approve-reject",
            value: task.task_id, // task id
          });

          const btnsContainer = createAnElement(
            "div",
            {
              className: "approve-reject-wrapper",
            },
            [approveBtn, rejectBtn]
          );
          taskWrapper.appendChild(btnsContainer);

          tasksListContainer.appendChild(taskWrapper);

          //========== event listener for approve/reject buttons ===========
          approveBtn.addEventListener("click", (e) => {
            const targetedTaskId = e.target.value;
            console.log(targetedTaskId);
          });

          rejectBtn.addEventListener("click", (e) => {
            const targetedTaskId = e.target.value;
            console.log(targetedTaskId);
          });
        });
        // ============================================================

        // append everything in the wrapper and return
        taskReportsWrapper.appendChild(tasksListContainer);
      });

      return taskReportsWrapper;
    })
    .catch((err) => {
      console.log(err);
      return "Couldn't load the data";
    });
}

// returns "description + points" or "description + cents"
function createTaskElement(task) {
  if (task.cents) {
    const description = createAnElement("p", {
      className: "taskDescription",
      textContent: task.description,
    });
    const money = createAnElement("p", {
      className: "money",
      textContent: `$ ${task.cents / 100}`,
    });
    const taskElement = createAnElement(
      "div",
      {
        className: "task item",
      },
      [description, money]
    );
    return taskElement;
  }

  if (task.points) {
    const description = createAnElement("p", {
      className: "taskDescription",
      textContent: task.description,
    });
    const points = createAnElement("p", {
      className: "points",
      textContent: `${task.points} pts`,
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
}
