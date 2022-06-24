import { createAnElement } from "../../utils/elementCreator.js";
import { completeDeleteTask } from "./completeOrDeleteTask.js";
import { renderPage } from "../../index.js";

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
        className: "formWrapper",
        innerHTML: `
        <h1 class="formTitle"> Request a task: </h1>
        <form id="addTaskForm">
          <div>
            <input type="text" name="description" placeholder="Description:">
          </div>
          <div class="rewardInputArea">
            <input type="number" name="amount" placeholder="Amount" class="half-width-input">
            <select name="type" class="half-width-input">
              <option value="cents">Dollars</option>
              <option value="points">Points</option>
            </select>
          </div>
          <div class="expiryDateInput">
            <label for="expiry-date" class="half-width-input">Expiry Date:</label>
            <input type="date" name="expiry-date" class="half-width-input">
          </div>
          <div class="categoryInputArea">
            <label for="category" class="half-width-input">Choose a category:</label>
            <select name="category" id="category" class="half-width-input">
              <option value="Reccuring">Reccuring</option>
              <option value="House Chores">House Chores</option>
              <option value="Academic">Academic</option>
              <option value="Art">Art</option>
            </select>
          </div>
          <div class="buttonsWrapper">
            <button type="submit" class="formBtn confirmBtn">Submit</button>
            <button class="formBtn">Cancel</button>
        </div>
        </form>
        `,
      });
      const addTaskForm = taskForm.querySelector("#addTaskForm");
      addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        app.innerHTML = "";
        loaderWrapper.style.display = "flex";

        const formData = new FormData(addTaskForm);
        console.log(formData.get("expiry-date"));
        const data = {
          description: formData.get("description"),
          points:
            formData.get("type") === "points" ? formData.get("amount") : null,
          cents:
            formData.get("type") === "cents"
              ? formData.get("amount") * 100
              : null,
          expiry: formData.get("expiry-date"),
          category: formData.get("category"),
        };

        axios.post("/api/kids/task", data).then((response) => {
          console.log(response);
          // location.reload();
          renderPage();
        });
      });

      app.innerHTML = "";
      app.appendChild(taskForm);
    });

    const tasksListContainer = createAnElement("div", {
      className: "container",
    });

    // tasksBox.appendChild(taskHeader);
    for (const task of kidTasks) {
      if (task.status == "pending" && task.cents) {
        const newTask = createAnElement("div", {
          className: "pending task item",
          innerHTML: `
          <p>${task.description}<p>
          <p>$${task.cents * 0.01}</p>
          `,
        });
        tasksListContainer.appendChild(newTask);
      } else if (task.status == "pending" && task.points) {
        const newTask = createAnElement("div", {
          className: "pending task item",
          innerHTML: `
        <p>${task.description}<p>
        <p>$${task.cents * 0.01}</p>
        `,
        });
        tasksListContainer.appendChild(newTask);
      } else if (task.status == "approved" && task.cents) {
        const newTask = createAnElement("div", {
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

        const completeButton = newTask.querySelector(".complete-task");
        const deleteButton = newTask.querySelector(".delete-task");
        completeButton.addEventListener("click", () =>
          completeDeleteTask("complete", task)
        );
        deleteButton.addEventListener("click", () =>
          completeDeleteTask("delete", task)
        );

        tasksListContainer.appendChild(newTask);
      } else if (task.status == "approved" && task.points) {
        const newTask = createAnElement("div", {
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

        const completeButton = newTask.querySelector(".complete-task");
        const deleteButton = newTask.querySelector(".delete-task");
        completeButton.addEventListener("click", () =>
          completeDeleteTask("complete", task)
        );
        deleteButton.addEventListener("click", () =>
          completeDeleteTask("delete", task)
        );

        tasksListContainer.appendChild(newTask);
      }
    }
    tasksBoxFinal.append(tasksListContainer);

    return tasksBoxFinal;
  });
}
