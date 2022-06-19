import { createAnElement } from "../../utils/elementCreator.js";

export function kidTasks() {
  return axios.get("/api/kids/tasks").then((response) => {
    const kidTasks = response.data;

    const tasksBoxFinal = createAnElement("div", {
      id: "tasksList",
      className: "wrapper",
      innerHTML: `
      <div id="tasksHeader" class="title-container">
      <h1>Tasks List: </h1>
      <h1 id='addTasks'> + </h1>
      </div>
      `,
    });

    // ADDTASKS BUTTON.
    let taskAddbutt = tasksBoxFinal.querySelector("#addTasks");
    console.log(taskAddbutt);
    taskAddbutt.addEventListener("click", (e) => {
      let kidPage = document.getElementById("kidsPageWrapper");
      let taskForm = createAnElement("div", {
        id: "taskForm",
        innerHTML: `
        <h1> Request a task: </h1>
    
        <form id="addTaskForm">
        <input type="text" name="description" placeholder="Description:">
        <input type="number" name="points" placeholder="Requested points:">
        <input type="number" name="cents" placeholder="Requested dollars:">
        <label for="expiry-date">Expiry Date:</label>
        <input type="date" name="expiry-date">
        <label for="category">Choose a category:</label>
        <select name="category" id="category">
        <option value="Reccuring">Reccuring</option>
        <option value="House Chores">House Chores</option>
        <option value="Academic">Academic</option>
        <option value="Art">Art</option>
        </select>
    
        <input type="submit">
    
    
        </form>
        `,
      });
      const addTaskForm = taskForm.querySelector("#addTaskForm");
      addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(addTaskForm);
        console.log(formData.get("expiry-date"));
        const data = {
          description: formData.get("description"),
          points: formData.get("points"),
          cents: formData.get("cents"),
          expiry: formData.get("expiry-date"),
          category: formData.get("category"),
        };

        axios.post("/api/kids/task", data).then((response) => {
          console.log(response);
          location.reload();
        });
      });

      kidPage.innerHTML = "";
      kidPage.appendChild(taskForm);
    });

    const tasksListContainer = createAnElement("div", {
      className: "container",
    });

    // tasksBox.appendChild(taskHeader);
    for (const task of kidTasks) {
      if ((task.status = "approved" && task.cents)) {
        const newTask = createAnElement("div", {
          className: "task item",
          innerHTML: `
          <p>${task.description}<p>
          <p>$${task.cents * 0.01}</p>
          `,
        });

        tasksListContainer.appendChild(newTask);
      } else if ((task.status = "approved" && task.points)) {
        const newTask = createAnElement("div", {
          className: "task item",
          textContent: `${task.description}  ${task.points} pts`,
          innerHTML: `
          <p>${task.description}<p>
          <p>${task.points} pts</p>
          `,
        });

        tasksListContainer.appendChild(newTask);
      }
    }
    tasksBoxFinal.append(tasksListContainer);

    return tasksBoxFinal;
  });
}
