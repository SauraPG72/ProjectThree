import { createAnElement } from "../../utils/elementCreator.js";

export function kidTasks() {
  return axios.get("/api/kids/tasks").then((response) => {
    const kidTasks = response.data;


    const tasksBoxFinal = createAnElement("div", {
      id: "tasksList", 
      innerHTML: `
      <div id="tasksHeader">
      <h1>Tasks List: </h1>
      <h1 id='addTasks'> + </h1>
      </div>
      `
    })

    // ADDTASKS BUTTON.  
    let taskAddbutt = document.getElementById('addTasks')
    console.log(taskAddButt)
    taskAddbutt.addEventListener('click', (e) => {
      let kidPage = document.getElementById('kidssPageWrapper')
      let taskForm = createAnElement("div", {
        id: "taskForm",
        innerHTML: `
        <h1> Request a task: </h1>
    
        <form>
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
        `
      
      })

      kidPage.innerHTML = ''
      kidPage.appendChild(taskForm)
    })

    // tasksBox.appendChild(taskHeader);
    for (const task of kidTasks) {
      if ((task.status = "approved" && task.cents)) {
        const newTask = createAnElement("div", {
          id: "eachTask",
          
          innerHTML: `
          <p>${task.description}<p>
          <p>$${task.cents * 0.1}</p>
          `
        
        });

        tasksBoxFinal.appendChild(newTask);
      } else if ((task.status = "approved" && task.points)) {
        const newTask = createAnElement("div", {
          id: "eachTask",
          textContent: `${task.description}  ${task.points} pts`,
          innerHTML: `
          <p>${task.description}<p>
          <p>${task.points} pts</p>
          `
        });

        tasksBoxFinal.appendChild(newTask);
      }
    }
    return tasksBoxFinal;
  });
}

