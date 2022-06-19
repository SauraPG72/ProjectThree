import { createAnElement } from "../../../utils/elementCreator.js";
import { store } from "../../../utils/store.js";

export function approvePendingTasks() {
  console.log("ok");
  // take user id out of Store and send it to the server
  const user_id = store.userId;

  // response : tasks data of all the kids related to that user id (array)
  return axios.get(`/api/parents/pendingTasks/${user_id}`).then((res) => {
    console.log(res.data);
    return res.data;
  });
}
