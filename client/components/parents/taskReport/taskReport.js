import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { approverejectConfirm } from "../Form/approveRejectConfirm.js";
import { createTitle } from "../Components/title.js";
import { createTaskElement } from "./createTaskElement.js";

// next => approverejectConfirm (form page to confirm of parents want to approve/reject requests)
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
      const title = createTitle("Task Reports");
      taskReportsWrapper.appendChild(title);

      if (tasksList.length === 0) {
        const emptyMessage = createAnElement("p", {
          className: "empty-content",
          textContent: "No Tasks Reports",
        });
        taskReportsWrapper.appendChild(emptyMessage);
        return taskReportsWrapper;
      }

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
          //  const taskWrapper = createAnElement("div", {
          //    className: "taskItem",
          //  });

          // taskElement contains description, points/cents
          const taskElement = createTaskElement(task);
          taskWrapper.appendChild(taskElement);

          const btnsContainer = createAnElement("div", {
            className: "approve-reject-wrapper",
          });

          let rewardType = "";
          let approveBtn;
          let rejectBtn;
          if (task.cents) {
            approveBtn = createAnElement("i", {
              //  textContent: "Approve",
              className: "fa-solid fa-circle-check green complete-task",
              value: task.task_id, // task id
              id: `${task.description}:${task.cents}`,
            });
            rejectBtn = createAnElement("i", {
              //  textContent: "Reject",
              className: "fa-solid fa-circle-xmark red delete-task",
              value: task.task_id, // task id
              id: `${task.description}:${task.cents}`,
            });

            rewardType = "cents";
            btnsContainer.appendChild(approveBtn);
            btnsContainer.appendChild(rejectBtn);
          } else {
            approveBtn = createAnElement("i", {
              textContent: "Approve",
              className: "fa-solid fa-circle-check green complete-task",
              value: task.task_id, // task id
              id: `${task.description}:${task.points}`,
            });
            rejectBtn = createAnElement("i", {
              textContent: "Reject",
              className: "fa-solid fa-circle-xmark red delete-task",
              value: task.task_id, // task id
              id: `${task.description}:${task.points}`,
            });

            //<i class="fa-solid fa-circle-check green complete-task"></i>
            //<i class="fa-solid fa-circle-xmark red delete-task"></i>

            rewardType = "points";
            btnsContainer.appendChild(approveBtn);
            btnsContainer.appendChild(rejectBtn);
          }

          //  taskWrapper.appendChild();

          tasksListContainer.appendChild(btnsContainer);

          //========== event listener for approve/reject buttons ===========
          approveBtn.addEventListener("click", (e) => {
            const targetedTask = {
              task_id: e.target.value,
              task_description: e.target.id,
            };
            if (rewardType === "cents") {
              approverejectConfirm("approve", targetedTask, "cents", "completed");
            } else {
              approverejectConfirm("approve", targetedTask, "points", "completed");
            }
          });

          rejectBtn.addEventListener("click", (e) => {
            const targetedTask = {
              task_id: e.target.value,
              task_description: e.target.id,
            };
            if (rewardType === "cents") {
              approverejectConfirm("reject", targetedTask, "cents", "completed");
            } else {
              approverejectConfirm("reject", targetedTask, "points", "completed");
            }
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
      return "Couldn't load the data of Task Reports";
    });
}
