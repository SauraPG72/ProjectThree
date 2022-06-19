import { store } from "../../../utils/store.js";

export function setKidsInStore(kidsArray) {
  kidsArray.forEach((kid) => {
    const kidsInfo = {
      kidId: kid.id,
      kidName: kid.name,
    };

    store.kids.push(kidsInfo);
  });
}
