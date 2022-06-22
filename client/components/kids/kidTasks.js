import { createAnElement } from "../../utils/elementCreator.js";
import { completeDeleteTask } from "./completeOrDeleteTask.js";

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
    taskAddbutt.addEventListener("click", (e) => {
      let kidPage = document.getElementById("kidsPageWrapper");
      let taskForm = createAnElement("div", {
        id: "taskForm",
        innerHTML: `
        <h1> Request a task: </h1>
    
        <form id="addTaskForm">
			<div>
        <input type="text" name="description" placeholder="Description:">
			</div>
			<div>
        <input type="number" name="amount" placeholder="Amount">
      <select name="type">
				<option value="cents">Dollars</option>
				<option value="points">Points</option>
			</select>
		</div>
		<div>
			<label for="expiry-date">Expiry Date:</label>
			<input type="date" name="expiry-date">
		</div>
		<div>
			<label for="category">Choose a category:</label>
			<select name="category" id="category">
			<option value="Reccuring">Reccuring</option>
			<option value="House Chores">House Chores</option>
			<option value="Academic">Academic</option>
			<option value="Art">Art</option>
        </select>
		</div>
    
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
          points: formData.get("type") === "points" ? formData.get("amount") : null,
          cents: formData.get("type") === "cents" ? formData.get("amount") * 100 : null,
          expiry: formData.get("expiry-date"),
          category: formData.get("category"),
        };

        axios.post("/api/kids/task", data).then((response) => {
          console.log(response);
          location.reload();
        });
      });

      app.innerHTML = "";
      app.appendChild(taskForm);
    });

    const tasksListContainer = createAnElement("div", {
      className: "container",
    });

    // tasksBox.appendChild(taskHeader);
    let newTask;
    for (const task of kidTasks) {
      if (task.status == "pending" && task.cents) {
        newTask = createAnElement("div", {
          className: "pending task item",
          innerHTML: `
          <p>${task.description}<p>
          <p>$${task.cents * 0.01}</p>
          `,
        });
        tasksListContainer.appendChild(newTask);
      } else if (task.status == "pending" && task.points) {
        newTask = createAnElement("div", {
          className: "pending task item",
          innerHTML: `
        <p>${task.description}<p>
        <p>$${task.cents * 0.01}</p>
        `,
        });
        tasksListContainer.appendChild(newTask);
      } else if (task.status == "approved" && task.cents) {
        newTask = createAnElement("div", {
          className: "task item",
          innerHTML: `
          <p>${task.description}<p>
		  <div class="amount-and-buttons">
			<p>$${task.cents * 0.01}</p>
				<i class="fa-solid fa-circle-check green complete-task"></i>
				<i class="fa-solid fa-circle-xmark red delete-task"></i>
		  </div>
          `,
        });

        tasksListContainer.appendChild(newTask);
      } else if (task.status == "approved" && task.points) {
        newTask = createAnElement("div", {
          className: "task item",
          textContent: `${task.description}  ${task.points} pts`,
          innerHTML: `
          <p>${task.description}<p>
		  <div class="amount-and-buttons">
          <p>${task.points} pts</p>
			<i class="fa-solid fa-circle-check green complete-task"></i>
			<i class="fa-solid fa-circle-xmark red delete-task"></i>
		  </div>
          `,
        });

        tasksListContainer.appendChild(newTask);
      }

      //  Adding Event Listener to the buttons
      const completeButton = newTask.querySelector(".complete-task");
      const deleteButton = newTask.querySelector(".delete-task");
      if (completeButton || deleteButton) {
        completeButton.addEventListener("click", () => completeDeleteTask("complete", task));
        deleteButton.addEventListener("click", () => completeDeleteTask("delete", task));
      }
    }
    tasksBoxFinal.append(tasksListContainer);

    return tasksBoxFinal;
  });
}
