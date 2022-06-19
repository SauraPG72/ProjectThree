import { createAnElement } from "../../../utils/elementCreator.js";
import { createTaskPage } from "../createTask/createTask.js";

// return a task container for a kid

export function createKidTasksList(kidsTasksObj, kidsIdObj, tasksWrapper) {
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
    tasksWrapper.appendChild(nameArea);

    // create tasks list part ===========================

    if (kidsTasksObj[kidName].length === 0) {
      const taskElement = createAnElement("p", {
        textContent: "No Task",
      });
      tasksListContainer.appendChild(taskElement);
    } else {
      // create tasks elements for all the kids
      kidsTasksObj[kidName].forEach((task) => {
        const taskElement = createTaskElement(task);
        tasksListContainer.appendChild(taskElement);
      });
    }

    // append everything in the wrapper and return
    tasksWrapper.appendChild(tasksListContainer);
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
