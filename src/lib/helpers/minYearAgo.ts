export const minYearsAgo = (years: number) => {
  const now = new Date();
  const minDate = new Date();
  minDate.setFullYear(now.getFullYear() - years);
  return minDate;
};
