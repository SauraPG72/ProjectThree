import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createTitle } from "../Components/title.js";
import { approverejectConfirm } from "../Form/approveRejectConfirm.js";

export function approvePendingTasks() {
  // take user id out of Store and send it to the server
  const user_id = store.userId;

  // response : tasks data whose status is 'pending' of all the kids related to that user id (array)
  return axios.get(`/api/parents/pendingTasks/${user_id}`).then((res) => {
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
        textContent: "No Tasks Requests",
      });
      pendingTasksWrapper.appendChild(emptyMessage);
      return pendingTasksWrapper;
    }

    // this object holds 'kids name : [{ task1 }, { task2 }, ...]'
    const pendingTasksObj = {};

    // loop over all tasks list array and create task elements one by one
    // each element contains "description" + "points/cents"
    pendingTasksList.forEach((task) => {
      if (task.name in pendingTasksObj) {
        const requestedTask = {
          task_id: task.t_id,
          description: task.description,
          cents: task.cents,
          points: task.points,
        };
        pendingTasksObj[task.name].push(requestedTask);
      } else {
        pendingTasksObj[task.name] = [
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
    Object.keys(pendingTasksObj).forEach((kidName) => {
      // this container is to wrap task elements later
      const tasksListContainer = createAnElement("div", {
        className: "container",
      });

      // to show each kid's name above tasks container
      const name = createAnElement("p", {
        className: "kids-name-for-tasklist",
        textContent: kidName,
      });
      pendingTasksWrapper.appendChild(name);
      // create tasks elements for all the kids
      pendingTasksObj[kidName].forEach((task) => {
        // container > taskElement > "task = taslElement + buttons container: (ApproveBtn + rejectBtn)"
        const taskWrapper = createAnElement("div", {
          className: "taskItem",
        });

        // taskElement contains description, points/cents
        const taskElement = createTaskElement(task);
        taskWrapper.appendChild(taskElement);

        const btnsContainer = createAnElement("div", {
          className: "approve-reject-wrapper",
        });

        let rewardType = "";

        // ====================== approve/ reject buttons =============================
        let approveBtn;
        let rejectBtn;
        /** check if the task's reward is based on CENTS or POINTS, and create both approve/ reject buttons that contain
         * {
         *  name of the button,
         *  class = "approve-reject",
         *  value = task_id / goal_id
         *  id = "task/goal description" + "cents/ points"
         * }
         */
        if (task.cents) {
          approveBtn = createAnElement("i", {
            //textContent: "Approve",
            className: "fa-solid fa-circle-check green complete-task",
            value: task.task_id, // task id
            id: `${task.description}:${task.cents}`,
          });
          rewardType = "cents";
          btnsContainer.appendChild(approveBtn);
          rejectBtn = createAnElement("i", {
            //textContent: "Reject",
            className: "fa-solid fa-circle-xmark red delete-task",
            value: task.task_id, // task id
            id: `${task.description}:${task.cents}`,
          });
          btnsContainer.appendChild(rejectBtn);
        } else {
          approveBtn = createAnElement("i", {
            //textContent: "Approve",
            className: "fa-solid fa-circle-check green complete-task",
            value: task.task_id, // task id
            id: `${task.description}:${task.points}`,
          });
          rewardType = "points";
          btnsContainer.appendChild(approveBtn);
          rejectBtn = createAnElement("i", {
            //textContent: "Reject",
            className: "fa-solid fa-circle-xmark red delete-task",
            value: task.task_id, // task id
            id: `${task.description}:${task.points}`,
          });
          btnsContainer.appendChild(rejectBtn);
        }

        taskElement.appendChild(btnsContainer);
        // ===================================================

        tasksListContainer.appendChild(taskWrapper);

        //========== event listener for approve/reject buttons ===========
        approveBtn.addEventListener("click", (e) => {
          const targetedTask = {
            task_id: e.target.value,
            task_description: e.target.id,
          };
          if (rewardType === "cents") {
            approverejectConfirm("approve", targetedTask, "cents", "pendingTasks");
          } else {
            approverejectConfirm("approve", targetedTask, "points", "pendingTasks");
          }
        });

        rejectBtn.addEventListener("click", (e) => {
          const targetedTask = {
            task_id: e.target.value,
            task_description: e.target.id,
          };
          if (rewardType === "cents") {
            approverejectConfirm("reject", targetedTask, "cents", "pendingTasks");
          } else {
            approverejectConfirm("reject", targetedTask, "points", "pendingTasks");
          }
        });
      });
      // ============================================================

      // append everything in the wrapper and return
      pendingTasksWrapper.appendChild(tasksListContainer);
    });

    return pendingTasksWrapper;
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
