import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { createTaskPage } from "../createTask/createTask.js";

export function tasksReports() {
  // take user id out of Store and send it to the server
  const user_id = store.userId;

  // response : tasks data of all the kids related to that user id (array)
  return axios
    .get(`/api/parents/tasksReport/${user_id}`)
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

      // check how many kids there are in all the task reports
      const kidsIdObj = {}; // {Laura: 1, Bob: 2}
      // this object holds 'kids name : [{ task1 }, { task2 }, ...]'
      const kidsTasksObj = {};

      // loop over all tasks list array and create task elements one by one
      // each element contains "description" + "points/cents"
      tasksList.forEach((task) => {
        if (task.name in kidsTasksObj) {
          const newTask = {
            description: task.description,
            cents: task.cents,
            points: task.points,
          };
          kidsTasksObj[task.name].push(newTask);
        } else {
          kidsTasksObj[task.name] = [
            {
              description: task.description,
              cents: task.cents,
              points: task.points,
            },
          ];
          kidsIdObj[task.name] = task.id;
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

        // "add task button" (addIconBtn > icon)
        const icon = createAnElement("i", {
          className: "fas fa-plus task-add-icon",
          value: kidsIdObj[kidName],
          id: kidName,
        });

        const addIconBtn = createAnElement(
          "button",
          {
            className: "addBtn",
            value: kidsIdObj[kidName], // kids id (pass it to create task form)
            id: kidName,
          },
          [icon]
        );

        // event listener for button to go to "create a task form"
        // kid's id
        addIconBtn.addEventListener("click", (e) => {
          const childInfoObj = {
            id: e.target.value, // kid's id
            name: e.target.id, // kid's name
          };

          createTaskPage(childInfoObj);
        });

        // nameArea = name + addTask button
        const nameArea = createAnElement(
          "div",
          {
            className: "nameArea",
          },
          [name, addIconBtn]
        );
        taskReportsWrapper.appendChild(nameArea);

        // create tasks elements for all the kids
        kidsTasksObj[kidName].forEach((task) => {
          const taskElement = createTaskElement(task);
          tasksListContainer.appendChild(taskElement);
        });

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
