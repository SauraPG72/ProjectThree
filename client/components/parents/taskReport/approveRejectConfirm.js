export function approverejectConfirm(status, task_id) {
  if (status === "approve") {
    console.log("approve", task_id);
  } else {
    console.log("reject", task_id);
  }
}
