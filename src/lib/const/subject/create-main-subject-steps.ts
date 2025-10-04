export const createMainSubjectSteps = [
  {
    step: 1,
    key: "main",
    title: "Create Main Subject",
    description: "Set subject details",
  },
  {
    step: 2,
    key: "configs",
    title: "Configs",
    description: "Configure subject progress",
  },
  {
    step: 3,
    key: "outcomes",
    title: "Learning Outcomes",
    description: "Define what students will learn",
  },
  {
    step: 4,
    key: "grading",
    title: "Grading Config",
    description: "Set grading rules",
  },
] as const;

export type CreateMainSubjectStepKey =
  (typeof createMainSubjectSteps)[number]["key"];
