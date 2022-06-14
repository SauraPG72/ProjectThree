import { createAnElement } from "../../utils/elementCreator.js";
import { store } from "../../utils/store.js";

export function tasksList() {
  return new Promise((resolve, reject) => {
    // take user id out of Store and send it to the server
    const data = {
      user_id: store.userId,
    };

    // response : tasks data of all the kids related to that user id (array)
    axios.post("/api/parents/taskslist", data).then((res) => {
      const tasksList = res.data.tasksList;

      // task list area wrapper ( return this later )
      const tasksWrapper = createAnElement("div", {
        id: "tasks-wrapper",
        className: "wrapper",
      });
      // "TASKS THIS WEEK" title
      const title = createAnElement("p", {
        textContent: "TASKS THIS WEEK",
        className: "title",
      });

      tasksWrapper.appendChild(title);

      // check how many kids there are in all the tasks
      // this object holds 'kids name : [{ task1 }, { task2 }, ...]'
      const kidsTasksObj = {};
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
        }
      });

      // Loop over the "kids : [tasks]" object
      Object.keys(kidsTasksObj).forEach((kidName) => {
        // this container is to wrap task elements later
        const tasksListContainer = createAnElement("div", {
          className: "container",
        });

        // to show each kid's name above tasks container
        const nameArea = createAnElement("p", {
          className: "kids-name-for-tasklist",
          textContent: kidName,
        });
        tasksWrapper.appendChild(nameArea);

        // create tasks elements for all the kids
        kidsTasksObj[kidName].forEach((task) => {
          const taskElement = createTaskElement(task);
          tasksListContainer.appendChild(taskElement);
        });

        // append everything in the wrapper and return
        tasksWrapper.appendChild(tasksListContainer);
      });

      resolve(tasksWrapper);
    });
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
