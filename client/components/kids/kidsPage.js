import { createAnElement } from "../../utils/elementCreator.js";
import { kidGoals } from "./kidGoals.js";
import { kidData } from "./kidStatus.js";
import { kidTasks } from "./kidTasks.js";
import { kidsBalance } from "./kidsBalance.js"

export async function renderKidsPage() {
  app.classList.add("fadeout");
  const [kidDataSection, kidBalanceSection, kidTasksSection, kidGoalsSection] = await Promise.all([
    kidData(),
    kidsBalance(),
    kidTasks(),
    kidGoals(),
  ]);

  const kidsPageWrapper = createAnElement(
    "div",
    {
      id: "kidsPageWrapper",
    },
    [kidDataSection, kidBalanceSection, kidTasksSection, kidGoalsSection]
  );

  const mainContainer = createAnElement(
    "main",
    { className: "main-container" },
    [kidsPageWrapper]
  );

  app.appendChild(mainContainer);
  app.classList.add("fadein");
}
