// function to add all the kids to kidsIdObj ({kidName: kidId})
export function isKidExists(kidId, kidName, kidsIdObj, kidsTasksObj) {
  if (kidsIdObj[kidName] == undefined) {
    kidsIdObj[kidName] = kidId;
    kidsTasksObj[kidName] = [];
  }
}
