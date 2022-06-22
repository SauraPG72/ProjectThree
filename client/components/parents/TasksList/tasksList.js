import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";
import { isKidExists } from "./isKidExists.js";
import { createTitle } from "../Components/title.js";
import { createKidTasksList } from "./createTasksList.js";

export function tasksList() {
  // take user id out of Store and send it to the server
  const user_id = store.userId;
  // this kidsArr contains all registered kids of the parent

  // response : tasks data of all the kids related to that user id (array)
  return axios
    .get(`/api/parents/taskslist/${user_id}`)
    .then((res) => {
      const tasksList = res.data.tasksList;

      // task list area wrapper ( return this later )
      const tasksWrapper = createAnElement("div", {
        id: "tasks-wrapper",
        className: "wrapper",
      });
      const titleContainer = createTitle("Tasks This Week");

      tasksWrapper.appendChild(titleContainer);

      // check how many kids there are in all the tasks
      // this object holds kids IDs using for creating tasks
      const kidsIdObj = {}; // {Laura: 1, Bob: 2}
      // this object holds 'kids name : [{ task1 }, { task2 }, ...]'
      const kidsTasksObj = {};

      // add all the kids to kidsIdObj ({kidName: kidId})
      // for button event listener (pass {kidName: kidId} to add task form)
      store.kids.forEach((kid) => {
        isKidExists(kid.kidId, kid.kidName, kidsIdObj, kidsTasksObj);
      });

      // loop over all tasks list array and create task elements one by one
      // put them into kidsTasksObj {kidName : [{ task1 }, { task2 }, ...] }
      // each element contains "description" + "points/cents"
      tasksList.forEach((task) => {
        const newTask = {
          description: task.description,
          cents: task.cents,
          points: task.points,
        };
        kidsTasksObj[task.name].push(newTask);
      });

      createKidTasksList(kidsTasksObj, kidsIdObj, tasksWrapper);

      // tasksWrapper.appendChild(tasksListContainer);
      //======================================================

      return tasksWrapper;
    })
    .catch((err) => {
      console.log(err);
      return "Couldn't load the data";
    });
}
