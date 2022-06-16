import { createAnElement } from "../../../utils/elementCreator.js";

export function addKidPage() {
  app.innerHTML = "";
  console.log("add kid page");

  /**
   * 
	name VARCHAR(255),
	parent_id INT REFERENCES parents(id),
	login_name VARCHAR(255),
	password_hash VARCHAR(255),
	total_points INT,
	total_cents INT
   */
  const user_id = store.userId;
}
