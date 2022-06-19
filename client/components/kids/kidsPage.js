import { createAnElement } from "../../utils/elementCreator.js";
import { kidGoals } from "./kidGoals.js";
import { kidData } from "./kidStatus.js";
import { kidTasks } from "./kidTasks.js";

export async function renderKidsPage() {
  const [kidDataSection, kidTasksSection, kidGoalsSection] = await Promise.all([
    kidData(),
    kidTasks(),
    kidGoals(),
  ]);

  const kidsPageWrapper = createAnElement(
    "div",
    {
      id: "kidsPageWrapper",
    },
    [kidDataSection, kidTasksSection, kidGoalsSection]
  );

  const mainContainer = createAnElement("main", { className: "main-container" }, [kidsPageWrapper]);

  app.appendChild(mainContainer);
}
